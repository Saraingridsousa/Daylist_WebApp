"use client";

import { useState } from "react";
import { ChartColumnStacked, ListChecks, LucideChartNoAxesCombined, Pencil, Repeat, Calendar } from "lucide-react";
import { habitoService } from "@/lib/habito.service";
import { FrequenciaEnum } from "@/lib/supabase";
import { getLocalDateString } from "@/lib/date";

interface ModalAddHabitoProps {
    perfilId: string | null;
    onSuccess?: () => void;
}

export default function ModalAddHabito({ perfilId, onSuccess }: ModalAddHabitoProps) {
    const [nome, setNome] = useState("");
    const [frequencia, setFrequencia] = useState<FrequenciaEnum | "">("");
    const [categoria, setCategoria] = useState("");
    const [unidadeMedida, setUnidadeMedida] = useState("");
    const [metaAlvo, setMetaAlvo] = useState("");
    const [motivacao, setMotivacao] = useState("");
    const [dataInicio, setDataInicio] = useState(getLocalDateString());
    const [dataLimite, setDataLimite] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!perfilId) {
            setError("Perfil não encontrado");
            return;
        }

        if (!nome || !frequencia || !categoria || !metaAlvo) {
            setError("Preencha todos os campos obrigatórios");
            return;
        }

        setLoading(true);

        try {
            await habitoService.criar({
                perfilId,
                nome,
                categoria,
                frequencia: frequencia as FrequenciaEnum,
                unidadeMedida,
                metaAlvo: parseInt(metaAlvo),
                motivacao,
                dataInicio,
                dataLimite: dataLimite || undefined,
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Erro ao adicionar hábito";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#FEF7BC] p-6 rounded-lg shadow-lg overflow-visible text-[#FC809F]">
            {/* Título */}
            <div>
                <h2 className="text-2xl">Adicionar Hábito</h2>   
                <div className="border-b border-gray-400"></div>
            </div>

            {error && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}

            {/* Nome do Hábito */}
            <div className="flex flex-row mt-7 justify-center items-center gap-2">
                <ListChecks className="w-10 mb-1"/>
                <input
                    type="text"
                    placeholder="Nome do Hábito *"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900"
                    disabled={loading}
                />  
            </div>

            {/* Frequência */}  
            <div className="flex flex-row justify-around gap-6">
                <div className="flex flex-row mt-7 justify-center items-center gap-2">
                    <Repeat className="w-10 mb-1"/>
                    <select
                        value={frequencia}
                        onChange={(e) => setFrequencia(e.target.value as FrequenciaEnum | "")}
                        className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900"
                        disabled={loading}
                    >
                        <option value="">Frequência *</option>    
                        <option value="DIARIO">Diário</option>
                        <option value="SEMANAL">Semanal</option>
                    </select>
                </div>
                <div className="flex flex-row mt-7 justify-center items-center gap-2">
                    <ChartColumnStacked className="w-10 mb-1"/>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900"
                        disabled={loading}
                    >
                        <option value="">Categoria *</option>    
                        <option value="Saúde">Saúde</option>
                        <option value="Social">Social</option>
                        <option value="Pessoal">Pessoal</option>
                        <option value="Exercício">Exercício</option>
                        <option value="Estudo">Estudo</option>
                    </select>
                </div>
            </div>
            {/* Unidade de Medida */}
            <div className="flex flex-row mt-7 justify-center items-center gap-2">
                <ChartColumnStacked className="w-10 mb-1"/>
                <input
                    type="text"
                    placeholder="Unidade de Medida (ex: litros, horas)"
                    value={unidadeMedida}
                    onChange={(e) => setUnidadeMedida(e.target.value)}
                    className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900"
                    disabled={loading}
                /> 
            </div>

            {/* Meta */}
            <div className="flex flex-row mt-7 justify-center items-center gap-2">
                <LucideChartNoAxesCombined className="w-10 mb-1"/>
                <input
                    type="number"
                    placeholder="Meta *"
                    value={metaAlvo}
                    onChange={(e) => setMetaAlvo(e.target.value)}
                    className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900"
                    disabled={loading}
                    min="1"
                /> 
            </div>
            <div className="w-full flex flex-row justify-between">
                {/* Data de Início */}
            <div className="flex flex-row mt-7 justify-center items-center gap-2">
                <Calendar className="w-10 mb-1"/>
                <input
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900"
                    disabled={loading}
                    title="Data de início do hábito"
                /> 
            </div>

            {/* Data Limite para Meta */}
            <div className="flex flex-row mt-7 justify-center items-center gap-2">
                <input
                    type="date"
                    value={dataLimite}
                    onChange={(e) => setDataLimite(e.target.value)}
                    className="w-full bg-white opacity-60 px-4 py-2 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900"
                    disabled={loading}
                    min={new Date().toISOString().split('T')[0]}
                    title="Prazo para completar a meta"
                /> 
            </div>

            </div>


            {/* Motivação */}
            <div className="flex flex-row mt-7 justify-center items-start gap-2 pb-10">
                <Pencil className="w-10 mb-1"/>
                <textarea
                    value={motivacao}
                    onChange={(e) => setMotivacao(e.target.value)}
                    className="w-full bg-white opacity-60 px-4 py-2 pb-10 border border-[#7966b2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5438a6] focus:border-transparent transition text-gray-900"
                    placeholder="O que te motiva a manter esse hábito?"
                    disabled={loading}
                />
            </div>
            {/* Botão */}
            <div className=" justify-end flex">
                <button type="submit" disabled={loading}>
                    <span className="bg-[#FC809F] text-white px-4 py-2 rounded-lg hover:bg-[#ede7b7] hover:text-[#FC809F] transition disabled:opacity-50">
                        {loading ? "Adicionando..." : "Adicionar Hábito"}
                    </span>
                </button>
            </div>
        </form>
    );
}
