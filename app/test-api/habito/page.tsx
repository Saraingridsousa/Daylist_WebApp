"use client";

import { useState } from "react";
import { habitoApi } from "@/api/habito";
import { Habito, FrequenciaEnum } from "@/api/types";

export default function TestApiHabito() {
  const [perfilId, setPerfilId] = useState("1");
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [novoHabito, setNovoHabito] = useState({
    nome: "",
    categoria: "Saúde",
    frequencia: FrequenciaEnum.DIARIO,
    unidadeMedida: "Minutos",
    metaAlvo: 30,
    motivacao: ""
  });

  const buscarHabitos = async () => {
    try {
      const res = await habitoApi.listarPorPerfil(parseInt(perfilId));
      setHabitos(res.data);
    } catch (err) {
      alert("Erro ao buscar hábitos");
    }
  };

  const criarHabito = async () => {
    try {
      await habitoApi.criar({ ...novoHabito, perfilId: parseInt(perfilId) });
      alert("Hábito criado com sucesso!");
      buscarHabitos();
    } catch (err) {
      alert("Erro ao criar hábito");
    }
  };

  return (
    <div className="p-6 border border-green-500/30 rounded-lg bg-gray-800 mt-10 w-full max-w-3xl text-white shadow-xl">
      <h2 className="text-xl font-bold text-green-400 mb-6">Teste da API de Hábitos</h2>

      {/* Formulário de Criação */}
      <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-900 p-6 rounded-lg border border-gray-700">
        <div className="col-span-2">
            <label className="text-xs text-gray-400 mb-1 block">Nome do Hábito</label>
            <input
                placeholder="Ex: Beber Água"
                className="w-full bg-gray-700 p-2 rounded border border-gray-600 outline-none focus:border-green-500"
                onChange={(e) => setNovoHabito({...novoHabito, nome: e.target.value})}
            />
        </div>

        <div>
            <label className="text-xs text-gray-400 mb-1 block">Unidade de Medida</label>
            <input
                placeholder="Ex: Litros, Km, Minutos"
                value={novoHabito.unidadeMedida}
                className="w-full bg-gray-700 p-2 rounded border border-gray-600 outline-none focus:border-green-500"
                onChange={(e) => setNovoHabito({...novoHabito, unidadeMedida: e.target.value})}
            />
        </div>

        <div>
            <label className="text-xs text-gray-400 mb-1 block">Meta Alvo</label>
            <input
                type="number"
                placeholder="Ex: 2"
                className="w-full bg-gray-700 p-2 rounded border border-gray-600 outline-none focus:border-green-500"
                onChange={(e) => setNovoHabito({...novoHabito, metaAlvo: parseInt(e.target.value)})}
            />
        </div>

        <div>
            <label className="text-xs text-gray-400 mb-1 block">Frequência</label>
            <select 
                className="w-full bg-gray-700 p-2 rounded border border-gray-600 outline-none focus:border-green-500"
                onChange={(e) => setNovoHabito({...novoHabito, frequencia: e.target.value as FrequenciaEnum})}
            >
                <option value={FrequenciaEnum.DIARIO}>Diário</option>
                <option value={FrequenciaEnum.SEMANAL}>Semanal</option>
            </select>
        </div>

        <div>
            <label className="text-xs text-gray-400 mb-1 block">Categoria</label>
            <input
                placeholder="Ex: Saúde, Estudos"
                className="w-full bg-gray-700 p-2 rounded border border-gray-600 outline-none focus:border-green-500"
                onChange={(e) => setNovoHabito({...novoHabito, categoria: e.target.value})}
            />
        </div>

        <div className="col-span-2">
            <label className="text-xs text-gray-400 mb-1 block">Motivação</label>
            <textarea
                placeholder="Por que você quer este hábito?"
                className="w-full bg-gray-700 p-2 rounded border border-gray-600 outline-none focus:border-green-500"
                onChange={(e) => setNovoHabito({...novoHabito, motivacao: e.target.value})}
            />
        </div>

        <button onClick={criarHabito} className="bg-green-600 p-3 rounded font-bold col-span-2 hover:bg-green-700 transition-colors">
          Criar Hábito
        </button>
      </div>

      {/* Listagem com visualização da Unidade */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-300 flex items-center gap-2">
            Hábitos Ativos 
            <button onClick={buscarHabitos} className="text-[10px] bg-blue-600 px-2 py-1 rounded hover:bg-blue-500 uppercase">Sincronizar</button>
        </h3>
        
        {habitos.map((h) => (
          <div key={h.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg border-l-4 border-green-500 shadow-md">
            <div>
              <p className="font-bold text-lg">{h.nome}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-green-400 uppercase font-semibold">
                    {h.frequencia}
                </span>
                <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-blue-400 uppercase font-semibold">
                    Meta: {h.metaAlvo} {h.unidadeMedida}
                </span>
              </div>
            </div>
            <div className="text-right italic text-xs text-gray-400 max-w-[200px] truncate">
                {h.motivacao}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}