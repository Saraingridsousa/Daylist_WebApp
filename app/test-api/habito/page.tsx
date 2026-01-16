"use client";

import { useState, useEffect } from "react";
import { habitoApi } from "@/api/habito";
import { registroHabitoApi } from "@/api/registroHabito";
import { Habito, FrequenciaEnum, RegistroHabito } from "@/api/types";

export default function TestApiHabito() {
  const [perfilId, setPerfilId] = useState("1");
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [registrosHoje, setRegistrosHoje] = useState<RegistroHabito[]>([]);
  const [loading, setLoading] = useState(false);

  const [novoHabito, setNovoHabito] = useState({
    nome: "",
    categoria: "Saúde",
    frequencia: FrequenciaEnum.DIARIO,
    unidadeMedida: "Minutos",
    metaAlvo: 30,
    motivacao: ""
  });

  // Função para buscar hábitos e o progresso de hoje simultaneamente
  const buscarDadosCompletos = async () => {
    setLoading(true);
    try {
      const dataHoje = new Date().toISOString().split('T')[0];
      
      // Executa as duas chamadas em paralelo
      const [resHabitos, resRegistros] = await Promise.all([
        habitoApi.listarPorPerfil(parseInt(perfilId)),
        registroHabitoApi.listarPorData(parseInt(perfilId), dataHoje)
      ]);

      setHabitos(resHabitos.data);
      setRegistrosHoje(resRegistros.data);
    } catch (err) {
      console.error("Erro ao sincronizar dados", err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar ao iniciar
  useEffect(() => {
    buscarDadosCompletos();
  }, []);

  // Helper para encontrar o progresso de um hábito específico na lista de hoje
  const obterProgresso = (habitoId: number) => {
    const registro = registrosHoje.find(r => r.habito_id === habitoId);
    return registro ? registro.qtdRealizada : 0;
  };

  const obterStatus = (habitoId: number) => {
    const registro = registrosHoje.find(r => r.habito_id === habitoId);
    return registro ? registro.status : "PENDENTE";
  };

  return (
    <div className="p-6 border border-green-500/30 rounded-lg bg-gray-800 mt-10 w-full max-w-3xl text-white shadow-xl font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-green-400">Gerenciar Hábitos e Progresso</h2>
        <button 
          onClick={buscarDadosCompletos}
          className="bg-blue-600 hover:bg-blue-500 text-[10px] px-3 py-1 rounded font-bold uppercase"
        >
          {loading ? "Sincronizando..." : "Sincronizar Hoje"}
        </button>
      </div>

      {/* Formulário (Simplificado para o exemplo) */}
      <div className="grid grid-cols-2 gap-3 mb-8 bg-gray-900 p-4 rounded-lg border border-gray-700">
        <input
          placeholder="Novo Hábito..."
          className="col-span-2 bg-gray-700 p-2 rounded text-sm border border-gray-600"
          onChange={(e) => setNovoHabito({...novoHabito, nome: e.target.value})}
        />
        <button 
          onClick={async () => {
             await habitoApi.criar({...novoHabito, perfilId: parseInt(perfilId)});
             buscarDadosCompletos();
          }}
          className="col-span-2 bg-green-600 p-2 rounded font-bold text-sm hover:bg-green-700"
        >
          Salvar Hábito
        </button>
      </div>

      {/* Listagem com Barra de Progresso Real */}
      <div className="space-y-4">
        {habitos.map((h) => {
          const progresso = obterProgresso(h.id);
          const status = obterStatus(h.id);
          const porcentagem = Math.min((progresso / h.metaAlvo) * 100, 100);

          return (
            <div key={h.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700 shadow-inner">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-100">{h.nome} - {h.id}</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{h.categoria} • {h.frequencia}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    status === 'CONCLUIDO' ? 'bg-green-900 text-green-300' : 
                    status === 'PARCIAL' ? 'bg-yellow-900 text-yellow-300' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {status}
                  </span>
                </div>
              </div>

              {/* Barra de Progresso Visual */}
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-green-400">
                      {progresso} / {h.metaAlvo} <span className="text-[10px] text-gray-500">{h.unidadeMedida}</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-400">
                      {Math.round(porcentagem)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-700">
                  <div
                    style={{ width: `${porcentagem}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                        porcentagem === 100 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}