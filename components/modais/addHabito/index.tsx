import { ChartColumnStacked, ListChecks, LucideChartNoAxesCombined, Pencil, Repeat } from "lucide-react";

export default function ModalAddHabito() {
    return (
        <div className="w-full max-w-md bg-[#FEF7BC] p-6 rounded-lg shadow-lg overflow-visible text-[#FC809F]">
            {/* Título */}
            <div>
                <h2 className="text-2xl">Adicionar Hábito</h2>   
                <div className="border-b border-gray-400"></div>
            </div>
            {/* Nome do Hábito */}
            <div className="flex flex-row mt-7 justify-center items-center gap-2">
                <ListChecks className="w-10 mb-1"/>
                <input
                    type="text"
                    placeholder="Nome do Hábito"
                    className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900 cursor-pointer"
                />  
            </div>

            {/* Frequência */}  
            <div className="flex flex-row justify-around gap-6">
                <div className="flex flex-row mt-7 justify-center items-center gap-2">
                    <Repeat className="w-10 mb-1"/>
                    <select
                        className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900 cursor-pointer"
                    >
                        <option value="">Frequência</option>    
                        <option value="diario">Diário</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensal">Mensal</option>
                    </select>
                </div>
                <div className="flex flex-row mt-7 justify-center items-center gap-2">
                    <ChartColumnStacked className="w-10 mb-1"/>
                    <select
                        className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900 cursor-pointer"
                    >
                        <option value="">Categoria</option>    
                        <option value="diario">Saúde</option>
                        <option value="semanal">Social</option>
                        <option value="mensal">Pessoal</option>
                    </select>
                </div>
            </div>
            {/* Unidade de Medida */}
            <div className="flex flex-row mt-7 justify-center items-center gap-2">
                <ChartColumnStacked className="w-10 mb-1"/>
                <input
                    type="text"
                    placeholder="Unidade de Medida"
                    className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900 cursor-pointer"
                /> 
            </div>

            {/* Meta */}
            <div className="flex flex-row mt-7 justify-center items-center gap-2">
                <LucideChartNoAxesCombined className="w-10 mb-1"/>
                <input
                    type="text"
                    placeholder="Meta"
                    className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900 cursor-pointer"
                /> 
            </div>

            {/* Motivação */}
            <div className="flex flex-row mt-7 justify-center items-start gap-2 pb-10">
                <Pencil className="w-10 mb-1"/>
                <textarea
                    className="w-full bg-white opacity-60 px-4 py-2 pb-10 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900 cursor-pointer"
                    placeholder="O que te motiva a manter esse hábito?"    
                />
            </div>
            {/* Botão */}
            <div className="pt-7 justify-end flex">
                <button>
                    <span className="bg-[#FC809F] text-white px-4 py-2 rounded-lg hover:bg-[#ede7b7] hover:text-[#FC809F] transition">Adicionar Hábito</span>
                </button>
            </div>
        </div>
    );
}