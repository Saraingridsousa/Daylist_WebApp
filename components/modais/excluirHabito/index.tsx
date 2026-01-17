"use client";

import { useState } from "react";

interface ModalExcluirHabitoProps {
    habitoNome: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ModalExcluirHabito({ habitoNome, onConfirm, onCancel }: ModalExcluirHabitoProps) {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        await onConfirm();
        setLoading(false);
    };

    return (
        <div className="w-full max-w-md bg-[#FEF7BC] gap-4 flex flex-col items-center justify-center p-6 rounded-lg shadow-lg overflow-visible text-[#FC809F]">
            <h2 className="text-2xl">Excluir Hábito</h2> 
            <span className="text-center">
                Tem certeza que deseja excluir o hábito <strong>&quot;{habitoNome}&quot;</strong>?
            </span>
            <div className="flex gap-4 mt-5">
                <button 
                    onClick={onCancel}
                    disabled={loading}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
                >
                    Cancelar
                </button>
                <button 
                    onClick={handleConfirm}
                    disabled={loading}
                    className="bg-[#FC809F] text-white px-4 py-2 rounded-lg hover:bg-[#e06b8a] transition disabled:opacity-50"
                >
                    {loading ? "Excluindo..." : "Excluir Hábito"}
                </button>
            </div>
        </div>
    );
}
