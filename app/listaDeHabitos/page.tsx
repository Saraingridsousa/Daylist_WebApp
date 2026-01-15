"use client";

import { useState } from "react";
import CardHabito from "@/components/cards/habito";
import CarrosselDeHabitos from "@/components/carrosselDeHabitos";
import ModalAddHabito from "@/components/modais/addHabito";
import ModalEditarHabito from "@/components/modais/editarHabito";
import ModalExcluirHabito from "@/components/modais/excluirHabito";
import { Check, Clock, Plus, X } from "lucide-react";

interface ListaDeHabitosProps {
    progress?: number;
}

export default function ListaDeHabitos({ progress }: ListaDeHabitosProps) {
    const [isAddHabitoOpen, setIsAddHabitoOpen] = useState(false);
    const [isEditarHabitoOpen, setIsEditarHabitoOpen] = useState(false);
    const [isExcluirHabitoOpen, setIsExcluirHabitoOpen] = useState(false);

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

                {/* Tarefas Recentes */}
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <Clock className="inline-block mr-2 w-5" />
                        <span>Tarefas Recentes:</span>
                    </div>
                    <CarrosselDeHabitos>
                        <CardHabito
                            title="Meditar"
                            progress={40}
                            color="bg-[#FC809F]/10"
                            onEdit={() => setIsEditarHabitoOpen(true)}
                            onDelete={() => setIsExcluirHabitoOpen(true)}
                        />
                        <CardHabito
                            title="Beber Água"
                            progress={60}
                            color="bg-[#FC809F]/10"
                            onEdit={() => setIsEditarHabitoOpen(true)}
                            onDelete={() => setIsExcluirHabitoOpen(true)}
                        />
                        <CardHabito
                            title="Exercitar"
                            progress={80}
                            color="bg-[#FC809F]/10"
                            onEdit={() => setIsEditarHabitoOpen(true)}
                            onDelete={() => setIsExcluirHabitoOpen(true)}
                        />
                    </CarrosselDeHabitos>
                </div>

                {/* Tarefas Concluidas */}
                <div className="w-full flex flex-col gap-4 mt-12">
                    <div className="flex flex-row gap-2">
                        <Check className="inline-block mr-2 w-5" />
                        <span>Tarefas Concluidas:</span>
                    </div>
                    <CarrosselDeHabitos>
                        <CardHabito
                            title="Meditar"
                            progress={100}
                            color="bg-[#FC809F]/30"
                            onEdit={() => setIsEditarHabitoOpen(true)}
                            onDelete={() => setIsExcluirHabitoOpen(true)}
                        />
                        <CardHabito
                            title="Beber Água"
                            progress={100}
                            color="bg-[#FC809F]/30"
                            onEdit={() => setIsEditarHabitoOpen(true)}
                            onDelete={() => setIsExcluirHabitoOpen(true)}
                        />
                        <CardHabito
                            title="Exercitar"
                            progress={100}
                            color="bg-[#FC809F]/30"
                            onEdit={() => setIsEditarHabitoOpen(true)}
                            onDelete={() => setIsExcluirHabitoOpen(true)}
                        />
                        <CardHabito
                            title="Exercitar"
                            progress={100}
                            color="bg-[#FC809F]/30"
                            onEdit={() => setIsEditarHabitoOpen(true)}
                            onDelete={() => setIsExcluirHabitoOpen(true)}
                        />
                        <CardHabito
                            title="Exercitar"
                            progress={100}
                            color="bg-[#FC809F]/30"
                            onEdit={() => setIsEditarHabitoOpen(true)}
                            onDelete={() => setIsExcluirHabitoOpen(true)}
                        />
                        <CardHabito
                            title="Exercitar"
                            progress={100}
                            color="bg-[#FC809F]/30"
                            onEdit={() => setIsEditarHabitoOpen(true)}
                            onDelete={() => setIsExcluirHabitoOpen(true)}
                        />
                    </CarrosselDeHabitos>
                </div>
                
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
                        <ModalAddHabito />
                    </div>
                </div>
            )}

            {isEditarHabitoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="relative">
                        <button
                            type="button"
                            aria-label="Fechar modal de edição"
                            className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsEditarHabitoOpen(false)}
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <ModalEditarHabito />
                    </div>
                </div>
            )}

            {isExcluirHabitoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="relative">
                        <button
                            type="button"
                            aria-label="Fechar modal de exclusão"
                            className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsExcluirHabitoOpen(false)}
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <ModalExcluirHabito />
                    </div>
                </div>
            )}
        </main>
    );
}