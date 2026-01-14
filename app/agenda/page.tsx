'use client';
import React, { useState } from 'react';

export default function Calendar() {
const [visao, setVisao] = useState<'Semana' | 'Mês' | 'Ano'>('Mês');
    const [menuAberto, setMenuAberto] = useState(false);
    const [dataReferencia, setDataReferencia] = useState(new Date());

    const mesesAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const daysOfWeek = ['DOM.', 'SEG.', 'TER.', 'QUA.', 'QUI.', 'SEX.', 'SÁB.'];

    const ano = dataReferencia.getFullYear();
    const mesIndex = dataReferencia.getMonth();

    const diasNoMes = new Date(ano, mesIndex + 1, 0).getDate();
    const primeiroDiaSemana = new Date(ano, mesIndex, 1).getDay();
    const diasMesAnterior = new Date(ano, mesIndex, 0).getDate();

    const construirGradeMes = () => {
        const grade = [];
        for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
            grade.push({ dia: diasMesAnterior - i, atual: false });
        }
        for (let i = 1; i <= diasNoMes; i++) {
            grade.push({ dia: i, atual: true });
        }
        const restante = 42 - grade.length;
        for (let i = 1; i <= restante; i++) {
            grade.push({ dia: i, atual: false });
        }
        return grade;
    };

    // --- FUNÇÕES DE NAVEGAÇÃO ---
    const proximo = () => {
        if (visao === 'Ano') {
            setDataReferencia(new Date(ano + 1, 0, 1));
        } else {
            setDataReferencia(new Date(ano, mesIndex + 1, 1));
        }
    };

    const anterior = () => {
        if (visao === 'Ano') {
            setDataReferencia(new Date(ano - 1, 0, 1));
        } else {
            setDataReferencia(new Date(ano, mesIndex - 1, 1));
        }
    };

    const entrarNoMes = (index: number) => {
        setDataReferencia(new Date(ano, index, 1));
        setVisao('Mês');
    };

    return (
        <main className="bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] items-center justify-center p-12 min-h-screen text-black">
            
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl mx-auto relative">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 text-xl font-bold">
                            <button onClick={anterior} className="hover:text-pink-500 transition p-2">{"<"}</button>
                        </div>
                        <h2 className="text-3xl font-[family-name:var(--font-sriracha)] italic font-bold">
                            {visao === 'Ano' ? ano : `${mesesAno[mesIndex]} ${ano}`}
                        </h2>
                        <div className="flex gap-2 text-xl font-bold">
                            <button onClick={proximo} className="hover:text-pink-500 transition p-2">{">"}</button>
                        </div>
                    </div>

                    <div className="flex gap-3 relative">
                        <button 
                            onClick={() => setMenuAberto(!menuAberto)}
                            className="flex items-center font-[family-name:var(--font-sriracha)] gap-2 px-4 py-2 border border-black rounded-full font-medium hover:bg-gray-50 transition min-w-[120px] justify-between"
                        >
                            {visao} <span className="text-[10px]">▼</span>
                        </button>

                        {menuAberto && (
                            <div className="absolute top-12 left-0 w-48 bg-[#f9f0f6] rounded-2xl shadow-xl z-50 p-2 border border-pink-100">
                                {['Semana', 'Mês', 'Ano'].map((opcao) => (
                                    <button
                                        key={opcao}
                                        onClick={() => { setVisao(opcao as any); setMenuAberto(false); }}
                                        className="w-full text-left px-5 py-3 rounded-xl hover:bg-white transition flex justify-between items-center text-xl font-[family-name:var(--font-sriracha)]"
                                    >
                                        {opcao} {visao === opcao && <span className="text-pink-400 text-sm">✓</span>}
                                    </button>
                                ))}
                            </div>
                        )}
                        <button className="bg-[#ff8da1] font-[family-name:var(--font-sriracha)] text-white px-6 py-2 rounded-full font-bold hover:bg-pink-400 transition shadow-sm">
                            Criar +
                        </button>
                    </div>
                </div>

                {/* Dias da semana */}
                {visao !== 'Ano' && (
                    <div className="grid grid-cols-7 text-center border-b border-gray-100 bg-gray-50/30 py-3">
                        {daysOfWeek.map(dia => (
                            <div key={dia} className="text-[10px] font-bold tracking-widest">{dia}</div>
                        ))}
                    </div>
                )}

                <div className={`grid ${visao === 'Ano' ? 'grid-cols-3 md:grid-cols-4' : 'grid-cols-7'} min-h-[450px]`}>
                    
                    {/* Mês */}
                    {visao === 'Mês' && construirGradeMes().map((item, index) => (
                        <div key={index} className="h-24 md:h-32 border-r border-b border-gray-100 p-4 hover:bg-pink-50 transition cursor-pointer">
                            <span className={`text-sm font-medium ${item.atual ? 'text-gray-600' : 'text-gray-300'}`}>
                                {item.dia}
                            </span>
                        </div>
                    ))}

                    {/* Ano */}
                    {visao === 'Ano' && mesesAno.map((mes, index) => (
                        <div 
                            key={index} 
                            onClick={() => entrarNoMes(index)}
                            className="h-40 border-r border-b border-gray-100 p-6 flex flex-col items-center justify-center hover:bg-pink-50 transition cursor-pointer group"
                        >
                            <span className="text-pink-400 font-bold text-lg">{index + 1}</span>
                            <span className="font-[family-name:var(--font-sriracha)] text-xl">{mes}</span>
                        </div>
                    ))}

                    {/* Semana (falta arrumar ainda) */}
                    {visao === 'Semana' && [0,1,2,3,4,5,6].map((i) => (
                        <div key={i} className="h-[450px] border-r border-gray-100 p-4 text-center">
                            <span className="text-2xl font-bold opacity-20">{i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}