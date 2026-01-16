"use client";

import { useState } from "react";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { HistoricoNavbar } from "@/components/HistoricoNavbar";
import { HistoricoFilters } from "@/components/HistoricoFilters";
import { HistoricoProgressCard } from "@/components/HistoricoProgressCard";
import { HistoricoHabitsList } from "@/components/HistoricoHabitsList";

const roundedTitle = M_PLUS_Rounded_1c({ subsets: ["latin"], weight: "700" });

type Habito = {
  id: number;
  nome: string;
  emoji: string;
  completado: boolean;
};

// Dados mockados para demonstração
const mockHabitos: Habito[] = [
  { id: 1, nome: "Beber 2 litros de água", emoji: "💧", completado: true },
  { id: 2, nome: "Fazer exercício", emoji: "🏋️", completado: false },
  { id: 3, nome: "Estudar", emoji: "📚", completado: true },
];

export default function HistoricoPage() {
  const [habitoSelecionado, setHabitoSelecionado] = useState("Todos");
  const [dataSelecionada, setDataSelecionada] = useState("2025-12-04");

  // Calcular porcentagem de hábitos completados
  const habitosCompletados = mockHabitos.filter((h) => h.completado).length;
  const porcentagem = Math.round((habitosCompletados / mockHabitos.length) * 100);

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
    <main className="min-h-screen bg-[#FFF9C4] flex justify-center pt-0 pb-10 px-0 md:px-0">
      <div className="w-full">
        <HistoricoNavbar />

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center mt-6 px-4 md:px-8">
          {/* Título */}
          <h1
            className={`${roundedTitle.className} title-outline text-[24px] md:text-[32px] lg:text-[44px] leading-[1.08] tracking-[0.05em] font-bold mb-8 text-center`}
          >
            Sua Jornada: Dias Anteriores
          </h1>

          <HistoricoFilters
            habitos={mockHabitos}
            habitoSelecionado={habitoSelecionado}
            onHabitoChange={setHabitoSelecionado}
            dataSelecionada={dataSelecionada}
            onDataChange={setDataSelecionada}
          />

          <HistoricoProgressCard
            dataCurta={formatarDataCurta(dataSelecionada)}
            porcentagem={porcentagem}
          />

          <HistoricoHabitsList
            habitos={mockHabitos}
            dataFormatada={formatarData(dataSelecionada)}
          />
        </div>
      </div>
    </main>
  );
}
