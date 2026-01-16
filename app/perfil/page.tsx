'use client';

import PerfilCard from "@/components/cards/perfil";
import Image from "next/image";
import React from "react";
import { perfilApi } from "../api/perfil";

export default function Perfil() {
    const userJson = typeof window !== 'undefined' ? localStorage.getItem("user"): null;
    const user = userJson ? JSON.parse(userJson) : null;

    const [perfil, setPerfil] = React.useState<any>(null);
    React.useEffect(() => {
        async function fetchPerfil() {
            if (user && user.id) {
                try {
                    const res = await perfilApi.obterPerfil(user.id);
                    setPerfil(res.data);
                } catch (error) {
                    console.error("Erro ao obter perfil:", error);
                }
            }
        }
        fetchPerfil();
    }, [user]);

    function getAge() {
        if (!perfil || !perfil.dataNascimento) return null;
        const birthDate = new Date(perfil.dataNascimento);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return perfil ? (
        <main className="gap-5 w-full bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] flex min-h-screen flex-col items-center justify-center p-16">
            <div className="bg-white rounded-lg w-full max-w-4xl p-8 pb-20 flex flex-col gap-6 items-center shadow-lg text-gray-900">
                <div className="flex flex-row gap-6 justify-start items-center w-full">
                    <Image
                        alt="Daylist Logo"
                        src="/assets/capPerfil.png"
                        width={70}
                        height={70}
                        className={``}
                    />
                    <h1 className="text-2xl">Bem vindo de volta, {user.name}!</h1>
                </div>
                <div className="flex justify-start w-full">
                    <h2>Dados Pessoais:</h2>
                </div>
                {/* Cards */}
                <PerfilCard
                    idade={getAge()!}
                    genero={perfil.sexo === "M" ? "Masculino" : "Feminino"}
                    peso={perfil.pesoAtual}
                    altura={perfil.alturaAtual}
                    dias={perfil.ofensivaAtual}
                    progress={75}
                />
            </div>
        </main>
    ) : (
        "carregando..."
    );
}
