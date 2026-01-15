'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Calendar() {
    const [visao, setVisao] = useState<'Semana' | 'Mês' | 'Ano'>('Mês');
    const [menuVisaoAberto, setMenuVisaoAberto] = useState(false);
    const [menuMesesAberto, setMenuMesesAberto] = useState(false);
    const [dataReferencia, setDataReferencia] = useState(new Date());

    const mesesAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const daysOfWeek = ['DOM.', 'SEG.', 'TER.', 'QUA.', 'QUI.', 'SEX.', 'SÁB.'];

    const hoje = new Date();
    const ano = dataReferencia.getFullYear();
    const mesIndex = dataReferencia.getMonth();
    
    const diasNoMes = new Date(ano, mesIndex + 1, 0).getDate();
    const primeiroDiaSemana = new Date(ano, mesIndex, 1).getDay();
    const diasMesAnterior = new Date(ano, mesIndex, 0).getDate();

    const refMenuVisao = useRef<HTMLDivElement>(null);
    const refMenuMeses = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [editandoAno, setEditandoAno] = useState(false);
    const [anoInput, setAnoInput] = useState('');

    useEffect(() => {
        function handleClickFora(event: MouseEvent) {
            if (refMenuVisao.current && !refMenuVisao.current.contains(event.target as Node)) setMenuVisaoAberto(false);
            if (refMenuMeses.current && !refMenuMeses.current.contains(event.target as Node)) setMenuMesesAberto(false);
        }
        document.addEventListener('mousedown', handleClickFora);
        return () => document.removeEventListener('mousedown', handleClickFora);
    }, []);

    useEffect(() => {
        if (menuMesesAberto && scrollRef.current) {
            const selectedElement = scrollRef.current.children[dataReferencia.getMonth()] as HTMLElement;
            if (selectedElement) {
                scrollRef.current.scrollTo({
                    top: selectedElement.offsetTop - scrollRef.current.offsetHeight / 2 + selectedElement.offsetHeight / 2,
                    behavior: 'smooth'
                });
            }
        }
    }, [menuMesesAberto, dataReferencia]);

    const iniciarEdicaoAno = () => {
        setAnoInput(ano.toString());
        setEditandoAno(true);
    };

    const salvarAno = () => {
        const novoAno = parseInt(anoInput);
        if (!isNaN(novoAno) && novoAno > 1900 && novoAno < 2100) {
            const d = new Date(dataReferencia);
            d.setFullYear(novoAno);
            setDataReferencia(d);
        }
        setEditandoAno(false);
    };

    const handleKeyDownAno = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') salvarAno();
        if (e.key === 'Escape') setEditandoAno(false);
    };

    const construirGradeMes = () => {
        const grade = [];
        for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
            grade.push({ dia: diasMesAnterior - i, atual: false, dataFull: new Date(ano, mesIndex - 1, diasMesAnterior - i) });
        }
        for (let i = 1; i <= diasNoMes; i++) {
            grade.push({ dia: i, atual: true, dataFull: new Date(ano, mesIndex, i) });
        }
        const restante = 42 - grade.length;
        for (let i = 1; i <= restante; i++) {
            grade.push({ dia: i, atual: false, dataFull: new Date(ano, mesIndex + 1, i) });
        }
        return grade;
    };
    
    const construirGradeSemana = () => {
        const d = new Date(dataReferencia);
        const diaDaSemana = d.getDay(); 
        const domingo = new Date(d.setDate(d.getDate() - diaDaSemana));
        
        return Array.from({ length: 7 }, (_, i) => {
            const dia = new Date(domingo);
            dia.setDate(domingo.getDate() + i);
            return dia;
        });
    };

    // --- FUNÇÕES DE NAVEGAÇÃO ---
    const navegar = (direcao: number) => {
        const novaData = new Date(dataReferencia);
        if (visao === 'Semana') {
            novaData.setDate(dataReferencia.getDate() + (direcao * 7));
        } else if (visao === 'Mês') {
            novaData.setMonth(mesIndex + direcao);
        } else {
            novaData.setFullYear(ano + direcao);
        }
        setDataReferencia(novaData);
    };

    const entrarNoMes = (index: number) => {
        setDataReferencia(new Date(ano, index, 1));
        setVisao('Mês');
        setMenuMesesAberto(false);
    };

    const irParaHoje = () => {
        setDataReferencia(new Date());
    };

    return (
        <main className="bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] flex items-center justify-center p-12 min-h-screen text-black">
            
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl w-full relative">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 text-2xl font-bold">
                            <button onClick={() => navegar(-1)} className="hover:text-pink-500 transition">{"<"}</button>
                            <button onClick={() => navegar(1)} className="hover:text-pink-500 transition">{">"}</button>
                        </div>

                        <div className="flex items-baseline gap-2">
                            {visao !== 'Ano' && (
                                <div className="relative" ref={refMenuMeses}>
                                    <h2 
                                        onClick={() => setMenuMesesAberto(!menuMesesAberto)}
                                        className="text-3xl font-[family-name:var(--font-sriracha)] italic font-bold cursor-pointer hover:text-pink-500 transition"
                                    >
                                        {mesesAno[dataReferencia.getMonth()]}
                                    </h2>

                                    {/* Menu de Meses */}
                                    {menuMesesAberto && (
                                        <div 
                                            ref={scrollRef}
                                            className="absolute top-12 -left-4 w-48 max-h-60 bg-white rounded-2xl shadow-2xl z-[60] overflow-y-auto border border-pink-50 scrollbar-hide py-2"
                                        >
                                            {mesesAno.map((m, i) => (
                                                <button 
                                                    key={m}
                                                    onClick={() => {
                                                        const d = new Date(dataReferencia);
                                                        d.setMonth(i);
                                                        setDataReferencia(d);
                                                        setMenuMesesAberto(false);
                                                    }}
                                                    className={`w-full text-left px-6 py-3 text-lg transition font-[family-name:var(--font-sriracha)]
                                                        ${dataReferencia.getMonth() === i ? 'bg-pink-100 text-pink-600 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                                                >
                                                    {m}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Ano Editavel */}
                            {editandoAno ? (
                                <input
                                    type="text"
                                    value={anoInput}
                                    onChange={(e) => setAnoInput(e.target.value)}
                                    onBlur={salvarAno}
                                    onKeyDown={handleKeyDownAno}
                                    autoFocus
                                    className="text-3xl font-[family-name:var(--font-sriracha)] italic font-bold text-black w-20 bg-pink-50 border-b-2 border-pink-400 outline-none"
                                />
                            ) : (
                                <h2 
                                    onClick={iniciarEdicaoAno}
                                    className="text-3xl font-[family-name:var(--font-sriracha)] italic font-bold text-black cursor-text hover:text-pink-500 transition"
                                >
                                    {dataReferencia.getFullYear()}
                                </h2>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={irParaHoje}
                            title="Hoje"
                            className="hover:scale-110 transition-transform duration-200 focus:outline-none"
                        >
                            <Image 
                                src="/assets/capivara_calendario.png"
                                alt="Hoje"
                                width={55}
                                height={55}
                                className="drop-shadow-sm"
                            />
                        </button>

                        {/* Menu de Visão */}
                        <div className="flex gap-3 relative" ref={refMenuVisao}>
                            <button 
                                onClick={() => setMenuVisaoAberto(!menuVisaoAberto)}
                                className="flex items-center font-[family-name:var(--font-sriracha)] gap-3 px-4 py-2 border-2 border-black rounded-full font-medium text-xl hover:bg-gray-50 transition min-w-[100px] justify-between"
                            >
                                {visao} <span className="text-xs">▼</span>
                            </button>

                            {menuVisaoAberto && (
                                <div className="absolute top-14 left-0 w-48 bg-[#fff3f6] rounded-2xl shadow-xl z-50 p-2 border border-pink-100">
                                    {['Semana', 'Mês', 'Ano'].map((opcao) => (
                                        <button
                                            key={opcao}
                                            onClick={() => { setVisao(opcao as any); setMenuVisaoAberto(false); }}
                                            className="w-full text-left px-5 py-3 rounded-xl hover:bg-[#ffe6ec] transition flex justify-between items-center text-xl font-[family-name:var(--font-sriracha)]"
                                        >
                                            {opcao} {visao === opcao && <span className="text-[#fc809f] text-sm">✓</span>}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <button className="bg-[#ff9cb5] font-[family-name:var(--font-sriracha)] text-white px-6 py-2 rounded-full font-medium text-xl hover:bg-[#fc809f] transition shadow-sm">
                                Criar +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dias da semana */}
                {visao !== 'Ano' && (
                    <div className="grid grid-cols-7 text-center border-b border-gray-100 bg-gray-50/30 py-3">
                        {daysOfWeek.map(dia => (
                            <div key={dia} className="text-xl font-medium tracking-widest">{dia}</div>
                        ))}
                    </div>
                )}

                <div className={`grid ${visao === 'Ano' ? 'grid-cols-3 md:grid-cols-4' : 'grid-cols-7'} min-h-[450px]`}>
                    
                    {/* Mês */}
                    {visao === 'Mês' && construirGradeMes().map((item, index) => {
                        const ehHoje = item.dataFull.toDateString() === hoje.toDateString();
                        return (
                            <div key={index} className={`h-24 md:h-32 border-r border-b border-gray-100 p-4 transition cursor-pointer ${ehHoje ? 'bg-pink-50/50' : 'hover:bg-pink-50'}`}>
                                <span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium 
                                    ${!item.atual ? 'text-gray-300' : ehHoje ? 'bg-pink-400 text-white' : 'text-gray-600'}`}>
                                    {item.dia}
                                </span>
                            </div>
                        );
                    })}

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

                    {/* Semana */}
                    {visao === 'Semana' && construirGradeSemana().map((dia, i) => (
                        <div key={i} className="border-r border-gray-100 last:border-r-0 p-6 flex flex-col items-center group hover:bg-pink-50/20 transition">
                            <span className={`text-3xl font-bold ${dia.toDateString() === new Date().toDateString() ? 'text-pink-400' : 'text-gray-800'}`}>
                                {dia.getDate()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}