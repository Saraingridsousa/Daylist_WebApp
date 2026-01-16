import api from './api';
import { RelatorioIA } from './types';

export const relatorioIAApi = {
    gerarRelatorio: (usuarioId: number, dataInicio: string, dataFim: string) => 
        api.post<RelatorioIA>('/relatorios-ia', { 
            usuarioId, 
            dataInicio, 
            dataFim 
        }),
    listarPorUsuario: (usuarioId: number) => 
        api.get<RelatorioIA[]>(`/relatorios-ia/usuario/${usuarioId}`)
};