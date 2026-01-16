import api from './api';
import { RegistroHabito } from './types';

export const registroHabitoApi = {
    registrarProgresso: (dados: { 
        habitoId: number; 
        usuarioId: number; 
        qtdRealizada: number; 
        data?: string 
    }) => api.post<{ message: string }>('/registros', dados),
    listarPorData: (perfilId: number, data: string) => 
        api.get<RegistroHabito[]>(`/registros/perfil/${perfilId}/data/${data}`)
};