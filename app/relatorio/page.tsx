'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Relatorio() {
return (
    <main className="min-h-screen bg-white flex flex-col items-center">
        {/* Header */}
        {/* <div className="w-full flex justify-end py-2 px-40">
            <div className="w-12 h-12 rounded-full border-2 border-blue-200 flex items-center justify-center overflow-hidden bg-gray-50">
                <span className="text-gray-300 text-3xl">👤</span>
            </div>
        </div> */}
        <header className="bg-white px-8 py-3 flex items-center justify-end w-full">
            <div className="w-14 h-14 rounded-full border-4 border-[#b3d4fc] flex items-center justify-center">
                <svg
                    aria-hidden
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#b3d4fc"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5.75 20c.55-3.4 2.83-5.5 6.25-5.5s5.7 2.1 6.25 5.5" />
                </svg>
            </div>
        </header>
        <div className="w-full bg-[#b3d4fc] p-10 flex flex-col items-center relative shadow-inner overflow-visible">            
            <h1 className={`font-[family-name:var(--font-sriracha)] text-white text-5xl md:text-6xl text-center mb-16 drop-shadow-sm`}>
                Seu Resumo Semanal com IA
            </h1>
            <div className="mt-10 bg-[#fff9c4] rounded-[35px] p-8 md:p-12 relative w-full max-w-3xl">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-52 h-52 z-20">
                    <Image 
                        src="/assets/capivara_estudando.png"
                        alt="Capivara Estudando"
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                </div>

                {/* Texto do Relatório */}
                <div className="space-y-6 text-[#5a4a3a] text-lg md:text-xl leading-relaxed font-medium">
                    <p>Olá, [nomeUsuario]! 🌿</p>
                    
                    <p>
                        Dei uma olhada na sua semana e, uau, parabéns pela dedicação nos estudos! 📚 
                        Você bateu sua meta 5 dias seguidos. Isso é consistência de verdade!
                    </p>

                    <p>
                        Notei que a meta de &quot;Beber Água&quot; ficou um pouquinho abaixo do esperado (60%). 
                        Que tal deixar uma garrafinha na mesa essa semana? 💧
                    </p>

                    <p className="pt-4 italic">
                        Lembre-se: não precisa ser perfeito, só precisa ser constante. Vamos com tudo para a próxima semana! Um dia de cada vez.
                    </p>
                </div>

                <div className="flex justify-center mt-10">
                    <button className="bg-[#8db8e8] hover:bg-[#7aa7d7] text-white px-8 py-3 rounded-full font-bold tracking-wider flex items-center gap-2 transition-all active:scale-95">
                        ✨ GERAR NOVA ANÁLISE
                    </button>
                </div>
            </div>
        </div>
    </main>
  );
}
