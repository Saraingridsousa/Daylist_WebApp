"use client";

import { useState } from "react";
import { relatorioIAApi } from "@/app/api/relatorioIA";
import { RelatorioIA } from "@/app/api/types";
import Markdown from 'react-markdown'

export default function TestApiRelatorioIA() {
  const [usuarioId, setUsuarioId] = useState("1");
  const [datas, setDatas] = useState({ inicio: "", fim: "" });
  const [relatorio, setRelatorio] = useState<RelatorioIA | null>(null);
  const [historico, setHistorico] = useState<RelatorioIA[]>([]);
  const [loading, setLoading] = useState(false);

  const solicitarAnalise = async () => {
    if (!datas.inicio || !datas.fim) return alert("Selecione o período!");
    setLoading(true);
    try {
      const res = await relatorioIAApi.gerarRelatorio(parseInt(usuarioId), datas.inicio, datas.fim);
      setRelatorio(res.data);
    } catch (err: any) {
      alert("Erro na IA: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const buscarHistorico = async () => {
    try {
      const res = await relatorioIAApi.listarPorUsuario(parseInt(usuarioId));
      setHistorico(res.data);
    } catch (err) {
      alert("Erro ao buscar histórico");
    }
  };

  return (
    <div className="p-6 border border-purple-500/30 rounded-lg bg-gray-800 mt-10 w-full max-w-3xl text-white font-sans shadow-2xl">
      <h2 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
        🧠 Inteligência Artificial (Gemini)
      </h2>

      {/* Configuração do Período */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-gray-900 p-4 rounded-lg border border-purple-900/50">
        <div>
          <label className="text-[10px] text-gray-500 uppercase">Data Início</label>
          <input type="date" className="w-full bg-gray-700 p-2 rounded text-xs" onChange={(e) => setDatas({...datas, inicio: e.target.value})} />
        </div>
        <div>
          <label className="text-[10px] text-gray-500 uppercase">Data Fim</label>
          <input type="date" className="w-full bg-gray-700 p-2 rounded text-xs" onChange={(e) => setDatas({...datas, fim: e.target.value})} />
        </div>
        <button 
          onClick={solicitarAnalise}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-500 rounded font-bold self-end py-2 transition-all disabled:opacity-50"
        >
          {loading ? "Processando..." : "Gerar Relatório"}
        </button>
      </div>

      {/* Resultado da IA */}
      {relatorio && (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-sm font-bold text-purple-300 mb-2">Última Análise Gerada:</h3>
          <div className="bg-black/40 p-6 rounded-xl border border-purple-500/20 leading-relaxed text-gray-200">
            <div className="prose prose-invert prose-sm">
                <Markdown>{relatorio.textoAnalise}</Markdown>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-500/10 text-[10px] text-gray-500 flex justify-between">
                <span>Período: {relatorio.dataInicio} até {relatorio.dataFim}</span>
                <span>ID Relatório: {relatorio.id}</span>
            </div>
          </div>
        </div>
      )}

      {/* Histórico Simples */}
      <button onClick={buscarHistorico} className="text-[10px] text-purple-400 hover:underline mb-4">
        Ver histórico de análises anteriores
      </button>
      
      <div className="space-y-2">
        {historico.map(h => (
          <div key={h.id} className="text-[10px] bg-gray-700/30 p-2 rounded flex justify-between">
            <span>Relatório de {h.dataGeracao}</span>
            <button className="text-blue-400">Ver</button>
          </div>
        ))}
      </div>
    </div>
  );
}