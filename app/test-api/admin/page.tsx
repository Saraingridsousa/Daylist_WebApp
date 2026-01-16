"use client";

import { useState } from "react";
import { administradorApi } from "@/api/administrador";

export default function TestApiAdmin() {
  const [adminData, setAdminData] = useState({ email: "", nome: "", usuarioId: "" });
  const [adminId] = useState(3); // Simulando o ID do administrador logado
  const [resultado, setResultado] = useState<any>(null);

  const executarAdminAction = async (acao: string) => {
    setResultado("Processando...");
    try {
      let res;
      if (acao === "cadastrar") {
        res = await administradorApi.cadastrarUsuario({ 
            email: adminData.email, 
            nome: adminData.nome, 
            adminId 
        });
      } else if (acao === "resetar") {
        res = await administradorApi.resetarSenha(adminId, parseInt(adminData.usuarioId));
      } else if (acao === "stats") {
        res = await administradorApi.obterEstatisticas();
      }
      setResultado(res?.data);
    } catch (err: any) {
      setResultado(err.response?.data || "Erro na requisição");
    }
  };

  return (
    <div className="p-6 border border-red-500/30 rounded-lg bg-gray-800 mt-10 w-full max-w-2xl">
      <h2 className="text-xl font-bold text-red-400 mb-4">Painel Administrativo (Debug)</h2>
      
      <div className="grid gap-4 mb-6">
        <input 
          placeholder="E-mail do novo usuário" 
          className="bg-gray-700 p-2 rounded"
          onChange={(e) => setAdminData({...adminData, email: e.target.value})}
        />
        <input 
          placeholder="Nome do novo usuário" 
          className="bg-gray-700 p-2 rounded"
          onChange={(e) => setAdminData({...adminData, nome: e.target.value})}
        />
        <div className="flex gap-2">
            <input 
              placeholder="ID do Usuário para Reset" 
              className="bg-gray-700 p-2 rounded flex-1"
              onChange={(e) => setAdminData({...adminData, usuarioId: e.target.value})}
            />
            <button 
              onClick={() => executarAdminAction("resetar")}
              className="bg-orange-600 px-4 rounded hover:bg-orange-700"
            >
              Resetar Senha
            </button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => executarAdminAction("cadastrar")}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex-1"
        >
          Cadastrar Usuário Manualmente
        </button>
        <button 
          onClick={() => executarAdminAction("stats")}
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 flex-1"
        >
          Ver Estatísticas
        </button>
      </div>

      <pre className="bg-black p-4 rounded text-xs text-green-500 overflow-auto">
        {JSON.stringify(resultado, null, 2)}
      </pre>
    </div>
  );
}