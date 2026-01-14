'use client';
import React, { useState } from 'react';

export default function Calendar() {
    const [visao, setVisao] = useState<'Semana' | 'Mês' | 'Ano'>('Mês');
    const [menuAberto, setMenuAberto] = useState(false);
    const [dataReferencia, setDataReferencia] = useState(new Date());

    const mesesAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const daysOfWeek = ['DOM.', 'SEG.', 'TER.', 'QUA.', 'QUI.', 'SEX.', 'SÁB.'];

    // --- LÓGICA DE NAVEGAÇÃO ---
    const moverData = (direcao: number) => {
        const novaData = new Date(dataReferencia);
        if (visao === 'Ano') {
            novaData.setFullYear(novaData.getFullYear() + direcao);
        } else if (visao === 'Mês') {
            novaData.setMonth(novaData.getMonth() + direcao);
        } else if (visao === 'Semana') {
            novaData.setDate(novaData.getDate() + (direcao * 7));
        }
        setDataReferencia(novaData);
    };

    const getDiasDaSemana = () => {
        const d = new Date(dataReferencia);
        const diaDaSemana = d.getDay(); 
        const primeiroDia = new Date(d.setDate(d.getDate() - diaDaSemana));
        return Array.from({ length: 7 }, (_, i) => {
            const dia = new Date(primeiroDia);
            dia.setDate(primeiroDia.getDate() + i);
            return dia;
        });
    };

    return (
        <main className="bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] flex items-center justify-center p-12 min-h-screen text-black font-[family-name:var(--font-sriracha)]">
            
            {/* Seta Esquerda */}
            <button 
                onClick={() => moverData(-1)}
                className="hidden md:block bg-white/30 hover:bg-white/50 p-6 rounded-full mr-6 text-4xl transition-all shadow-lg active:scale-95"
            >
                {"<"}
            </button>

            <div className="bg-white rounded-[40px] shadow-2xl border border-white/20 overflow-hidden w-full max-w-5xl relative">
                
                {/* Header com Menu de Visualização */}
                <div className="flex justify-between items-center p-8 border-b border-pink-50">
                    <h2 className="text-4xl italic font-bold">
                        {visao === 'Ano' ? dataReferencia.getFullYear() : `${mesesAno[dataReferencia.getMonth()]} ${dataReferencia.getFullYear()}`}
                    </h2>

                    <div className="flex gap-4 relative">
                        <button 
                            onClick={() => setMenuAberto(!menuAberto)}
                            className="flex items-center gap-3 px-8 py-2 border-2 border-black rounded-full font-bold text-xl hover:bg-gray-50 transition"
                        >
                            {visao} <span>▼</span>
                        </button>

                        {menuAberto && (
                            <div className="absolute top-14 left-0 w-56 bg-[#f9f0f6] rounded-[30px] shadow-2xl z-50 p-2 border border-pink-100">
                                {['Semana', 'Mês', 'Ano'].map((op) => (
                                    <button
                                        key={op}
                                        onClick={() => { setVisao(op as any); setMenuAberto(false); }}
                                        className="w-full text-left px-6 py-4 rounded-2xl hover:bg-white transition text-2xl"
                                    >
                                        {op} {visao === op && "✓"}
                                    </button>
                                ))}
                            </div>
                        )}
                        <button className="bg-[#ff8da1] text-white px-10 py-2 rounded-full font-bold text-xl shadow-lg hover:bg-[#ff7a91] transition">
                            Criar +
                        </button>
                    </div>
                </div>

                {/* Grade Dinâmica */}
                <div className="grid grid-cols-7 min-h-[500px]">
                    {visao === 'Semana' ? (
                        getDiasDaSemana().map((dia, i) => (
                            <div key={i} className="border-r border-gray-100 last:border-r-0 p-6 flex flex-col items-center hover:bg-pink-50/30 transition">
                                <span className="text-gray-400 font-bold text-xs mb-6">{daysOfWeek[i]}</span>
                                <span className={`text-5xl font-bold ${dia.toDateString() === new Date().toDateString() ? 'text-pink-400' : 'text-gray-800'}`}>
                                    {dia.getDate()}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="p-20 text-center w-full col-span-7 italic text-gray-300 text-2xl">
                            Visão {visao} selecionada.
                        </div>
                    )}
                </div>
            </div>

            {/* Seta Direita */}
            <button 
                onClick={() => moverData(1)}
                className="hidden md:block bg-white/30 hover:bg-white/50 p-6 rounded-full ml-6 text-4xl transition-all shadow-lg active:scale-95"
            >
                {">"}
            </button>
        </main>
    );
}