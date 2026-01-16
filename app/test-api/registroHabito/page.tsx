"use client";

import { useState } from "react";
import { registroHabitoApi } from "@/api/registroHabito";
import { StatusHabitoEnum } from "@/api/types";

export default function TestApiRegistro() {
  const [ids, setIds] = useState({ habitoId: "", usuarioId: "1", perfilId: "1" });
  const [qtd, setQtd] = useState(0);
  const [logs, setLogs] = useState<any[]>([]);

  const enviarProgresso = async () => {
    try {
      const res = await registroHabitoApi.registrarProgresso({
        habitoId: parseInt(ids.habitoId),
        usuarioId: parseInt(ids.usuarioId),
        qtdRealizada: qtd
      });
      
      const novoLog = {
        horario: new Date().toLocaleTimeString(),
        status: "Sucesso",
        mensagem: res.data.message
      };
      setLogs([novoLog, ...logs]);
    } catch (err: any) {
      alert("Erro ao registrar: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6 border border-orange-500/30 rounded-lg bg-gray-800 mt-10 w-full max-w-2xl text-white">
      <h2 className="text-xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        🔥 Teste de Registro e Ofensiva
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-900 p-4 rounded-lg">
        <div>
          <label className="text-xs text-gray-400">ID do Hábito</label>
          <input
            type="number"
            className="w-full bg-gray-700 p-2 rounded border border-gray-600 outline-none"
            onChange={(e) => setIds({ ...ids, habitoId: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">Sua Quantidade (Progresso)</label>
          <input
            type="number"
            className="w-full bg-gray-700 p-2 rounded border border-gray-600 outline-none"
            onChange={(e) => setQtd(parseFloat(e.target.value))}
          />
        </div>
        <button 
          onClick={enviarProgresso}
          className="col-span-2 bg-orange-600 hover:bg-orange-700 p-3 rounded font-bold transition-all"
        >
          Enviar Progresso
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-400">Histórico de Ações (Sessão Atual):</h3>
        <div className="max-h-40 overflow-y-auto space-y-2 bg-black/50 p-2 rounded">
          {logs.length === 0 && <p className="text-xs text-gray-600 italic">Nenhum registro enviado ainda...</p>}
          {logs.map((log, i) => (
            <div key={i} className="text-[11px] border-l-2 border-orange-500 pl-2 py-1">
              <span className="text-gray-500">[{log.horario}]</span> <span className="text-green-400">{log.mensagem}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}