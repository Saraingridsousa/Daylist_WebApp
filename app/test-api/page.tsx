"use client";

import { useState } from "react";
import { usuarioApi } from "@/app/api/usuario";

export default function TestApiUsuario() {
  const [formData, setFormData] = useState({ name: "", email: "", senha: "" });
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const executarTeste = async (tipo: "registrar" | "login" | "verificar") => {
    setLoading(true);
    setStatus(null);
    try {
      let res;
      if (tipo === "registrar") res = await usuarioApi.registrar(formData);
      if (tipo === "login") res = await usuarioApi.login({ email: formData.email, senha: formData.senha });
      if (tipo === "verificar") res = await usuarioApi.verificarEmail(formData.email);

      setStatus({ type: "success", data: res!.data });
    } catch (err: any) {
      setStatus({ type: "error", data: err.response?.data || err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <div className="z-10 max-w-2xl w-full font-mono text-sm border border-gray-700 p-8 rounded-xl bg-gray-800 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">
          Teste da API de Usuário
        </h1>

        {/* Formulário */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-400 mb-1">Nome (apenas para registro):</label>
            <input
              name="name"
              type="text"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Email:</label>
            <input
              name="email"
              type="email"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Senha:</label>
            <input
              name="senha"
              type="password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => executarTeste("registrar")}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 p-2 rounded font-bold transition disabled:opacity-50"
          >
            Registrar
          </button>
          <button
            onClick={() => executarTeste("login")}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold transition disabled:opacity-50"
          >
            Login
          </button>
          <button
            onClick={() => executarTeste("verificar")}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 p-2 rounded font-bold transition disabled:opacity-50"
          >
            Verificar Email
          </button>
        </div>

        {/* Painel de Resposta (Console na tela) */}
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2 text-gray-300">Resposta do Servidor:</h2>
          <pre className={`p-4 rounded overflow-auto max-h-60 text-xs ${
            status?.type === "error" ? "bg-red-900/30 border border-red-500 text-red-200" : "bg-black border border-green-500 text-green-400"
          }`}>
            {loading ? "Carregando..." : status ? JSON.stringify(status.data, null, 2) : "Aguardando ação..."}
          </pre>
        </div>
      </div>
    </main>
  );
}