import api from "./api";
import { Habito, FrequenciaEnum } from "./types";

export const habitoApi = {
    criar: (dados: {
        perfilId: number;
        nome: string;
        categoria: string;
        frequencia: FrequenciaEnum;
        unidadeMedida: string;
        metaAlvo: number;
        motivacao: string;
    }) => api.post<{ id: number }>("/habitos", dados),

    listarPorPerfil: (perfilId: number) =>
        api.get<Habito[]>(`/habitos/perfil/${perfilId}`),

    atualizar: (id: number, dados: Partial<Habito>) =>
        api.put<{ message: string }>(`/habitos/${id}`, dados),

    arquivar: (id: number) => api.delete<{ message: string }>(`/habitos/${id}`),
};
