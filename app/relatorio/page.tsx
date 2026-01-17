'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { relatorioIAService } from '@/lib/relatorioIA.service';
import { habitoService, HabitoComProgresso } from '@/lib/habito.service';
import { perfilService } from '@/lib/perfil.service';
import { RelatorioIA, supabase } from '@/lib/supabase';
import { getLocalDateString } from '@/lib/date';

type HabitoResumo = {
    nome: string;
    progresso: number;
    emoji: string;
};

export default function Relatorio() {
    const [relatorio, setRelatorio] = useState<RelatorioIA | null>(null);
    const [loading, setLoading] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState('Usuário');
    const [habitosHoje, setHabitosHoje] = useState<HabitoResumo[]>([]);
    const [progressoGeral, setProgressoGeral] = useState(0);
    const [progressoSemanal, setProgressoSemanal] = useState<number | null>(null);

    // Função auxiliar para obter emoji baseado na categoria
    function getEmojiByCategoria(categoria: string): string {
        const emojis: Record<string, string> = {
            'Saúde': '💪',
            'Exercício': '🏋️',
            'Água': '💧',
            'Estudo': '📚',
            'Leitura': '📖',
            'Meditação': '🧘',
            'Social': '👥',
            'Pessoal': '🌟',
        };
        return emojis[categoria] || '✨';
    }

    useEffect(() => {
        const userJson = localStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;
        if (user?.nome || user?.name) {
            setNomeUsuario(user.nome || user.name);
        }

        // Carregar último relatório se existir
        async function carregarDados() {
            if (user?.id) {
                try {
                    // Carregar relatório
                    const relatorios = await relatorioIAService.listarPorUsuario(user.id);
                    if (relatorios.length > 0) {
                        setRelatorio(relatorios[0]);
                    }

                    // Carregar hábitos de hoje para mostrar progresso
                    const perfilId = await perfilService.obterPerfilId(user.id);
                    const hoje = getLocalDateString();
                    const habitos = await habitoService.listarComProgresso(perfilId, hoje);
                    
                    console.log('Hábitos de hoje:', habitos);
                    
                    const habitosFormatados = habitos.map((h: HabitoComProgresso) => ({
                        nome: h.nome,
                        progresso: h.progresso || 0,
                        emoji: getEmojiByCategoria(h.categoria),
                    }));
                    setHabitosHoje(habitosFormatados);

                    // Calcular progresso geral
                    if (habitos.length > 0) {
                        const media = habitos.reduce((acc: number, h: HabitoComProgresso) => acc + (h.progresso || 0), 0) / habitos.length;
                        setProgressoGeral(Math.round(media));
                    }

                    // Calcular progresso semanal (para ajustar percentual no texto)
                    const dataFimSemana = getLocalDateString();
                    const dataInicioSemana = new Date();
                    dataInicioSemana.setDate(dataInicioSemana.getDate() - 7);

                    const { data: habitosSemana, error: habitosSemanaError } = await supabase
                        .from('habitos')
                        .select(`
                            id,
                            meta_alvo,
                            registros_habito(
                                qtd_realizada,
                                status,
                                data_referencia
                            )
                        `)
                        .eq('perfil_id', perfilId)
                        .eq('ativo', true)
                        .gte('registros_habito.data_referencia', getLocalDateString(dataInicioSemana))
                        .lte('registros_habito.data_referencia', dataFimSemana);

                    if (!habitosSemanaError && habitosSemana) {
                        let totalProgresso = 0;
                        let totalRegistros = 0;

                        habitosSemana.forEach((habito) => {
                            const registros = habito.registros_habito || [];
                            registros.forEach((r: { qtd_realizada: number; status: string }) => {
                                const progresso = habito.meta_alvo > 0
                                    ? Math.min(100, Math.round((r.qtd_realizada / habito.meta_alvo) * 100))
                                    : (r.status === 'CONCLUIDO' ? 100 : 0);
                                totalProgresso += progresso;
                                totalRegistros++;
                            });
                        });

                        const taxaGeral = totalRegistros > 0 ? Math.round(totalProgresso / totalRegistros) : progressoGeral;
                        setProgressoSemanal(taxaGeral);
                    } else {
                        // Se não houver registros na semana, usar o progresso de hoje
                        setProgressoSemanal(progressoGeral);
                    }
                } catch (error) {
                    console.error('Erro ao carregar dados:', error);
                }
            }
        }
        carregarDados();
    }, []);

    const gerarNovaAnalise = async () => {
        const userJson = localStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;
        if (!user?.id) return;

        setLoading(true);
        try {
            // Gerar relatório da última semana
            const dataFimRelatorio = getLocalDateString();
            const dataInicioRelatorio = new Date();
            dataInicioRelatorio.setDate(dataInicioRelatorio.getDate() - 7);

            const novoRelatorio = await relatorioIAService.gerarRelatorio(
                user.id,
                getLocalDateString(dataInicioRelatorio),
                dataFimRelatorio
            );
            setRelatorio(novoRelatorio);
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
        } finally {
            setLoading(false);
        }
    };

    const textoBase = relatorio?.texto_analise || `Olá, ${nomeUsuario}! 🌿

Clique no botão abaixo para gerar sua primeira análise semanal personalizada.

A análise vai considerar todos os seus hábitos e seu progresso na última semana, trazendo insights e dicas para você continuar evoluindo!

Lembre-se: não precisa ser perfeito, só precisa ser constante. Um dia de cada vez.`;

    const textoExibir = progressoSemanal !== null
        ? textoBase.replace(/\d+%/, `${progressoSemanal}%`)
        : textoBase;

return (
    <main className="min-h-screen bg-[#FFC9D7] flex flex-col items-center pt-6">
        <div className="w-full bg-[#FFC9D7] p-10 flex flex-col items-center relative overflow-visible">            
            <h1 className={`font-[family-name:var(--font-sriracha)] text-white text-5xl md:text-6xl text-center mb-16 drop-shadow-sm`}>
                Seu Resumo Semanal com IA
            </h1>
            <div className="mt-10 bg-[#fff9c4] rounded-[35px] p-8 md:p-12 relative w-full max-w-3xl">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-52 h-52 z-20">
                    <Image 
                        src="/assets/capivara_estudando.png"
                        alt="Capivara Estudando"
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                </div>

                {/* Texto do Relatório */}
                <div className="space-y-6 text-[#5a4a3a] text-lg md:text-xl leading-relaxed font-medium pt-12">
                    {textoExibir.split('\n').map((paragrafo, index) => (
                        <p key={index}>{paragrafo}</p>
                    ))}
                </div>

                {/* Progresso de Hoje */}
                {habitosHoje.length > 0 && (
                    <div className="mt-8 p-4 bg-white/50 rounded-2xl">
                        <h3 className="text-[#5a4a3a] font-bold mb-4 flex items-center gap-2">
                            📊 Seu Progresso Hoje
                            <span className="ml-auto text-sm font-normal bg-[#FC809F] text-white px-2 py-1 rounded-full">
                                {progressoGeral}% geral
                            </span>
                        </h3>
                        <div className="space-y-3">
                            {habitosHoje.map((habito, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <span className="text-xl">{habito.emoji}</span>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-[#5a4a3a]">{habito.nome}</span>
                                            <span className={`font-medium ${
                                                habito.progresso >= 100 
                                                    ? 'text-green-600' 
                                                    : habito.progresso >= 50 
                                                        ? 'text-yellow-600' 
                                                        : 'text-gray-500'
                                            }`}>
                                                {habito.progresso}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all ${
                                                    habito.progresso >= 100 
                                                        ? 'bg-green-500' 
                                                        : habito.progresso >= 50 
                                                            ? 'bg-yellow-500' 
                                                            : 'bg-[#FC809F]'
                                                }`}
                                                style={{ width: `${Math.min(habito.progresso, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-center mt-10">
                    <button 
                        onClick={gerarNovaAnalise}
                        disabled={loading}
                        className="bg-[#8db8e8] hover:bg-[#7aa7d7] text-white px-8 py-3 rounded-full font-bold tracking-wider flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? '⏳ GERANDO...' : '✨ GERAR NOVA ANÁLISE'}
                    </button>
                </div>
            </div>
        </div>
    </main>
  );
}
