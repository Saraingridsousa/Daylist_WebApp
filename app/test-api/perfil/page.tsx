"use client";

import { useState } from "react";
import { perfilApi, ResumoSaude } from "@/app/api/perfil";

export default function TestApiPerfil() {
  const [usuarioId, setUsuarioId] = useState("1");
  const [biometria, setBiometria] = useState({ peso: 0, altura: 0, dataNascimento: '', sexo: 'M' });
  const [resumo, setResumo] = useState<ResumoSaude | null>(null);
  const [loading, setLoading] = useState(false);

  const carregarPerfil = async () => {
    setLoading(true);
    try {
      const res = await perfilApi.obterPerfil(parseInt(usuarioId));
      console.log(res.data);
      setResumo(res.data);
    } catch (err) {
      alert("Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  };

  const atualizarDados = async () => {
    try {
      await perfilApi.atualizarBiometria({
        usuarioId: parseInt(usuarioId),
        peso: biometria.peso,
        altura: biometria.altura,
        dataNascimento: biometria.dataNascimento || new Date().toISOString().split('T')[0],
        sexo: biometria.sexo || 'M',
      });
      alert("Biometria atualizada!");
      carregarPerfil(); // Recarrega para ver o novo IMC
    } catch (err) {
      alert("Erro ao atualizar");
    }
  };

  return (
    <div className="p-6 border border-blue-500/30 rounded-lg bg-gray-800 mt-10 w-full max-w-2xl text-white font-mono">
      <h2 className="text-xl font-bold text-blue-400 mb-6 underline">Teste da API de Perfil</h2>

      <div className="flex gap-4 mb-6">
        <input
          placeholder="ID do Usuário"
          className="bg-gray-700 p-2 rounded w-24 border border-gray-600"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        />
        <button
          onClick={carregarPerfil}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Carregar Dados de Saúde
        </button>
      </div>

      {/* Grid de Resumo */}
      {resumo && (
        <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-900 p-4 rounded-lg border border-blue-900">
          <div>
            <p className="text-xs text-gray-500">IMC ATUAL</p>
            <p className="text-2xl font-bold text-green-400">{resumo.imc}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">OFENSIVA</p>
            <p className="text-2xl text-orange-500">🔥 {resumo.ofensivaAtual} dias</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">RECORDE</p>
            <p className="text-lg">🏆 {resumo.maiorOfensiva}</p>
          </div>
        </div>
      )}

      {/* Formulário de Atualização */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-400">Atualizar Biometria:</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Peso (kg)"
            className="bg-gray-700 p-2 rounded flex-1 border border-gray-600"
            onChange={(e) => setBiometria({ ...biometria, peso: parseFloat(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Altura (cm)"
            className="bg-gray-700 p-2 rounded flex-1 border border-gray-600"
            onChange={(e) => setBiometria({ ...biometria, altura: parseFloat(e.target.value) })}
          />
          <button
            onClick={atualizarDados}
            className="bg-green-600 px-6 rounded hover:bg-green-700 font-bold"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}