import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import { Sriracha } from "next/font/google";
interface CardHabitoProps{
    title: string;
    progress: number; // valor entre 0 e 100
}
const sriracha = Sriracha({ 
  weight: '400',
  subsets: ["latin"] 
});
export default function CardHabito({ title, progress }: CardHabitoProps) {
    return (
        <div className={`w-72 bg-white bg-opacity-60 rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition cursor-pointer ${sriracha.className}`}>
            {/* Título do Hábito */}
            <div className="flex flex-row justify-between items-center gap-10">
                <h3 className={`text-lg text-gray-900`}>{title}</h3>
                <div className="flex flex-row gap-1">
                    <Pencil className="w-4 text-gray-600 cursor-pointer hover:text-gray-800" />
                    <Trash2 className="w-4 text-gray-600 cursor-pointer hover:text-gray-800" />
                </div>
            </div>
            {/* Progresso do Hábito */}
            <div>
                <h3 className={`text-gray-900 mt-2`}>Progresso</h3>
                <div>
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                        <div className="bg-[#FC809F] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex justify-end">
                        <p className="text-xs text-gray-700 mt-1">{progress}% concluído</p>
                    </div>
                </div>
            </div>
            {/* Botões */}
            <div className="flex justify-center gap-2 mt-4">
                {progress === 100 ? (
                    <button className="flex items-center gap-2 bg-[#b3d185] hover:bg-[#89a65c] text-white px- py-1 rounded-lg transition">
                        <Check className="w-4" />
                        Completo
                    </button>
                ) : (
                    <button className="flex items-center gap-2 bg-[#FC809F] hover:bg-[#be5972] text-white px-2 py-1 rounded-lg transition">
                        <Plus className="w-4" />
                        Adicionar Progresso
                    </button>
                )}
            </div>

        </div>
    );
}