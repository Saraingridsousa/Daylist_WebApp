"use client";

import { useState, useEffect } from "react";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { HistoricoFilters } from "@/components/HistoricoFilters";
import { HistoricoProgressCard } from "@/components/HistoricoProgressCard";
import { HistoricoHabitsList } from "@/components/HistoricoHabitsList";
import { habitoService, HabitoComProgresso } from "@/lib/habito.service";
import { perfilService } from "@/lib/perfil.service";
import { getLocalDateString } from "@/lib/date";

const roundedTitle = M_PLUS_Rounded_1c({ subsets: ["latin"], weight: "700" });

type Habito = {
  id: string;
  nome: string;
  emoji: string;
  completado: boolean;
  progresso: number;
};

export default function HistoricoPage() {
  const [habitoSelecionado, setHabitoSelecionado] = useState("Todos");
  const [dataSelecionada, setDataSelecionada] = useState(getLocalDateString());
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHabitos() {
      try {
        const userJson = localStorage.getItem("user");
        const user = userJson ? JSON.parse(userJson) : null;
        if (!user?.id) return;

        const perfilId = await perfilService.obterPerfilId(user.id);
        const habitosData = await habitoService.listarComProgresso(perfilId, dataSelecionada);
        
        // Mapear para o formato esperado pelo componente
        const habitosFormatados: Habito[] = habitosData.map((h: HabitoComProgresso) => ({
          id: h.id,
          nome: h.nome,
          emoji: getEmojiByCategoria(h.categoria),
          completado: h.progresso === 100,
          progresso: h.progresso || 0,
        }));
        
        setHabitos(habitosFormatados);
      } catch (error) {
        console.error("Erro ao carregar hábitos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHabitos();
  }, [dataSelecionada]);

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

  // Calcular porcentagem média de progresso dos hábitos
  const porcentagem = habitos.length > 0
    ? Math.round(habitos.reduce((acc, h) => acc + (h.progresso || 0), 0) / habitos.length)
    : 0;

  // Formatar data para exibição
  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const formatarDataCurta = (data: string) => {
    const [, mes, dia] = data.split("-");
    return `${dia}/${mes}`;
  };

  return (
    <main className="min-h-screen bg-[#FFF9C4] flex justify-center pt-6 pb-10 px-0 md:px-0">
      <div className="w-full">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center mt-6 px-4 md:px-8">
          {/* Título */}
          <h1
            className={`${roundedTitle.className} title-outline text-[24px] md:text-[32px] lg:text-[44px] leading-[1.08] tracking-[0.05em] font-bold mb-8 text-center`}
          >
            Sua Jornada: Dias Anteriores
          </h1>

          <HistoricoFilters
            habitos={habitos}
            habitoSelecionado={habitoSelecionado}
            onHabitoChange={setHabitoSelecionado}
            dataSelecionada={dataSelecionada}
            onDataChange={setDataSelecionada}
          />

          <HistoricoProgressCard
            dataCurta={formatarDataCurta(dataSelecionada)}
            porcentagem={porcentagem}
          />

          {loading ? (
            <div className="text-gray-600">Carregando...</div>
          ) : (
            <HistoricoHabitsList
              habitos={habitos}
              dataFormatada={formatarData(dataSelecionada)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
