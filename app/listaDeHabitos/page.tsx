"use client";

import { useState, useEffect } from "react";
import CardHabito from "@/components/cards/habito";
import CarrosselDeHabitos from "@/components/carrosselDeHabitos";
import ModalAddHabito from "@/components/modais/addHabito";
import ModalEditarHabito from "@/components/modais/editarHabito";
import ModalExcluirHabito from "@/components/modais/excluirHabito";
import { Check, Clock, Plus, X } from "lucide-react";
import { habitoService, HabitoComProgresso } from "@/lib/habito.service";
import { perfilService } from "@/lib/perfil.service";
import { registroHabitoService } from "@/lib/registroHabito.service";
import { getLocalDateString } from "@/lib/date";

export default function ListaDeHabitos() {
    const [isAddHabitoOpen, setIsAddHabitoOpen] = useState(false);
    const [isEditarHabitoOpen, setIsEditarHabitoOpen] = useState(false);
    const [isExcluirHabitoOpen, setIsExcluirHabitoOpen] = useState(false);
    const [habitos, setHabitos] = useState<HabitoComProgresso[]>([]);
    const [habitoSelecionado, setHabitoSelecionado] = useState<HabitoComProgresso | null>(null);
    const [loading, setLoading] = useState(true);
    const [perfilId, setPerfilId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const dataHoje = getLocalDateString();

    const carregarHabitos = async () => {
        try {
            const userJson = localStorage.getItem("user");
            const user = userJson ? JSON.parse(userJson) : null;
            if (!user?.id) return;

            setUserId(user.id);
            const pId = await perfilService.obterPerfilId(user.id);
            setPerfilId(pId);
            const habitosData = await habitoService.listarComProgresso(pId, dataHoje);
            setHabitos(habitosData);
        } catch (error) {
            console.error("Erro ao carregar hábitos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarHabitos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditarClick = (habito: HabitoComProgresso) => {
        setHabitoSelecionado(habito);
        setIsEditarHabitoOpen(true);
    };

    const handleExcluirClick = (habito: HabitoComProgresso) => {
        setHabitoSelecionado(habito);
        setIsExcluirHabitoOpen(true);
    };

    const handleHabitoAdicionado = () => {
        setIsAddHabitoOpen(false);
        carregarHabitos();
    };

    const handleHabitoAtualizado = () => {
        setIsEditarHabitoOpen(false);
        setHabitoSelecionado(null);
        carregarHabitos();
    };

    const handleHabitoExcluido = async () => {
        if (habitoSelecionado) {
            try {
                await habitoService.arquivar(habitoSelecionado.id);
                setIsExcluirHabitoOpen(false);
                setHabitoSelecionado(null);
                carregarHabitos();
            } catch (error) {
                console.error("Erro ao excluir hábito:", error);
            }
        }
    };

    const handleAdicionarProgresso = async (habito: HabitoComProgresso) => {
        if (!userId) return;
        
        try {
            // Incrementar progresso em 1 unidade
            const novaQtd = (habito.qtd_realizada || 0) + 1;
            await registroHabitoService.registrarProgresso({
                habitoId: habito.id,
                usuarioId: userId,
                qtdRealizada: novaQtd,
                data: dataHoje,
            });
            carregarHabitos();
        } catch (error) {
            console.error("Erro ao adicionar progresso:", error);
        }
    };

    const habitosRecentes = habitos.filter(h => (h.progresso || 0) < 100);
    const habitosConcluidos = habitos.filter(h => (h.progresso || 0) >= 100);

    return (
        <main className="w-full bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] flex min-h-screen flex-col items-center justify-center sm:px-16 sm:py-10 relative">
            <div className="bg-white rounded-lg w-full sm:max-w-6xl p-4 sm:p-8 pb-20 flex flex-col gap-3 items-center shadow-lg text-gray-900">
                <h1 className="text-3xl">Lista de Hábitos</h1>
                
                <button
                    className="bg-[#FC809F]/20 rounded-full border-2 border-dashed border-pink-400 px-3 py-1 hover:bg-[#FC809F]/30 transition-colors cursor-pointer"
                    onClick={() => setIsAddHabitoOpen(true)}
                >
                    <Plus className="inline-block mr-2 w-5" />
                    Adicionar Hábito
                </button>

                {loading ? (
                    <div className="text-gray-600 py-10">Carregando hábitos...</div>
                ) : (
                    <>
                        {/* Tarefas Recentes */}
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-row gap-2">
                                <Clock className="inline-block mr-2 w-5" />
                                <span>Tarefas Recentes:</span>
                            </div>
                            {habitosRecentes.length > 0 ? (
                                <CarrosselDeHabitos>
                                    {habitosRecentes.map(habito => (
                                        <CardHabito
                                            key={habito.id}
                                            title={habito.nome}
                                            progress={habito.progresso || 0}
                                            meta={habito.meta_alvo}
                                            qtdRealizada={habito.qtd_realizada}
                                            unidade={habito.unidade_medida}
                                            color="bg-[#FC809F]/10"
                                            onEdit={() => handleEditarClick(habito)}
                                            onDelete={() => handleExcluirClick(habito)}
                                            onAddProgress={() => handleAdicionarProgresso(habito)}
                                        />
                                    ))}
                                </CarrosselDeHabitos>
                            ) : (
                                <div className="text-gray-500 text-center py-4">Nenhuma tarefa pendente</div>
                            )}
                        </div>

                        {/* Tarefas Concluidas */}
                        <div className="w-full flex flex-col gap-4 mt-12">
                            <div className="flex flex-row gap-2">
                                <Check className="inline-block mr-2 w-5" />
                                <span>Tarefas Concluidas:</span>
                            </div>
                            {habitosConcluidos.length > 0 ? (
                                <CarrosselDeHabitos>
                                    {habitosConcluidos.map(habito => (
                                        <CardHabito
                                            key={habito.id}
                                            title={habito.nome}
                                            progress={100}
                                            meta={habito.meta_alvo}
                                            qtdRealizada={habito.qtd_realizada}
                                            unidade={habito.unidade_medida}
                                            color="bg-[#FC809F]/30"
                                            onEdit={() => handleEditarClick(habito)}
                                            onDelete={() => handleExcluirClick(habito)}
                                        />
                                    ))}
                                </CarrosselDeHabitos>
                            ) : (
                                <div className="text-gray-500 text-center py-4">Nenhuma tarefa concluída hoje</div>
                            )}
                        </div>
                    </>
                )}
                
            </div>

            {isAddHabitoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="relative">
                        <button
                            type="button"
                            aria-label="Fechar modal"
                            className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsAddHabitoOpen(false)}
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <ModalAddHabito perfilId={perfilId} onSuccess={handleHabitoAdicionado} />
                    </div>
                </div>
            )}

            {isEditarHabitoOpen && habitoSelecionado && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="relative">
                        <button
                            type="button"
                            aria-label="Fechar modal de edição"
                            className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md text-gray-700 hover:bg-gray-100"
                            onClick={() => { setIsEditarHabitoOpen(false); setHabitoSelecionado(null); }}
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <ModalEditarHabito habito={habitoSelecionado} onSuccess={handleHabitoAtualizado} />
                    </div>
                </div>
            )}

            {isExcluirHabitoOpen && habitoSelecionado && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="relative">
                        <button
                            type="button"
                            aria-label="Fechar modal de exclusão"
                            className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md text-gray-700 hover:bg-gray-100"
                            onClick={() => { setIsExcluirHabitoOpen(false); setHabitoSelecionado(null); }}
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <ModalExcluirHabito 
                            habitoNome={habitoSelecionado.nome} 
                            onConfirm={handleHabitoExcluido}
                            onCancel={() => { setIsExcluirHabitoOpen(false); setHabitoSelecionado(null); }}
                        />
                    </div>
                </div>
            )}
        </main>
    );
}