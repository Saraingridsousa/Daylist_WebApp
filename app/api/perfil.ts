import api from './api';

export interface ResumoSaude {
    imc: string;
    ofensivaAtual: number;
    maiorOfensiva: number;
    pesoAtual: number;
    alturaAtual: number;
}

export const perfilApi = {
    obterPerfil: (usuarioId: number) => 
        api.get<ResumoSaude>(`/perfil/${usuarioId}`),
    atualizarBiometria: (dados: { usuarioId: number; peso: number; altura: number }) => 
        api.put<{ message: string }>('/perfil/biometria', dados),
    checarOfensiva: (usuarioId: number) => 
        api.post<{ message: string }>('/perfil/verificar-ofensiva', { usuarioId })
};