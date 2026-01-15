import CardHabito from "@/components/cards/habito";
import { Check, Clock, Plus } from "lucide-react";

interface ListaDeHabitosProps {
    progress?: number;
}

export default function ListaDeHabitos( {progress}: ListaDeHabitosProps) {
    return (
        <main className="w-full bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] flex min-h-screen flex-col items-center justify-center px-16 py-10">
            <div className="bg-white rounded-lg w-full max-w-5xl p-8 pb-20 flex flex-col gap-3 items-center shadow-lg text-gray-900">
                <h1 className="text-3xl">Lista de Hábitos</h1>
                
                <button className="bg-[#FC809F]/20 rounded-full border-2 border-dashed border-pink-400 px-3 py-1 hover:bg-[#FC809F]/30 transition-colors cursor-pointer">
                    <Plus className="inline-block mr-2 w-5" />
                    Adicionar Hábito
                </button>

                {/* Tarefas Recentes */}
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <Clock className="inline-block mr-2 w-5" />
                        <span>Tarefas Recentes:</span>
                    </div>
                    <div className="flex flex-row gap-6 justify-around px-10">
                        <CardHabito title="Meditar" progress={40} color="bg-[#FC809F]/10" />
                        <CardHabito title="Beber Água" progress={60} color="bg-[#FC809F]/10" />
                        <CardHabito title="Exercitar" progress={80} color="bg-[#FC809F]/10" />
                    </div>
                </div>

                {/* Tarefas Concluidas */}
                <div className="w-full flex flex-col gap-4 mt-12">
                    <div className="flex flex-row gap-2">
                        <Check className="inline-block mr-2 w-5" />
                        <span>Tarefas Concluidas:</span>
                    </div>
                    <div className="flex flex-row gap-6 justify-around px-10">
                        <CardHabito title="Meditar" progress={100} color="bg-[#FC809F]/30" />
                        <CardHabito title="Beber Água" progress={100} color="bg-[#FC809F]/30" />
                        <CardHabito title="Exercitar" progress={100} color="bg-[#FC809F]/30" />
                    </div>
                </div>
                
            </div>
        </main>
    );
}