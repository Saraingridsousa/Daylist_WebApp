'use client';

import PerfilCard from "@/components/cards/perfil";
import Image from "next/image";
import React from "react";
import { perfilService } from "@/lib/perfil.service";
import { ResumoSaude } from "@/lib/supabase";

export default function Perfil() {
    const [user, setUser] = React.useState<{ id: string; name?: string; nome?: string } | null>(null);
    const [perfil, setPerfil] = React.useState<ResumoSaude | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const userJson = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
        const userData = userJson ? JSON.parse(userJson) : null;
        setUser(userData);
    }, []);

    React.useEffect(() => {
        async function fetchPerfil() {
            if (user && user.id) {
                try {
                    setLoading(true);
                    const data = await perfilService.obterPerfil(user.id);
                    setPerfil(data);
                } catch (error) {
                    console.error("Erro ao obter perfil:", error);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchPerfil();
    }, [user]);

    function getAge() {
        if (!perfil || !perfil.data_nascimento) return null;
        const birthDate = new Date(perfil.data_nascimento);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    if (loading) {
        return (
            <main className="gap-5 w-full bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] flex min-h-screen flex-col items-center justify-center p-16">
                <div className="text-gray-700">Carregando...</div>
            </main>
        );
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
                    <h1 className="text-2xl">Bem vindo de volta, {user?.name || user?.nome || 'Usuário'}!</h1>
                </div>
                <div className="flex justify-start w-full">
                    <h2>Dados Pessoais:</h2>
                </div>
                {/* Cards */}
                <PerfilCard
                    idade={getAge()!}
                    genero={perfil.sexo === "M" ? "Masculino" : perfil.sexo === "F" ? "Feminino" : "Não informado"}
                    peso={perfil.peso_atual || 0}
                    altura={perfil.altura_atual || 0}
                    dias={perfil.ofensiva_atual}
                    progress={75}
                />
            </div>
        </main>
    ) : (
        <main className="gap-5 w-full bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] flex min-h-screen flex-col items-center justify-center p-16">
            <div className="text-gray-700">Perfil não encontrado</div>
        </main>
    );
}
