import api from './api';
import { Usuario } from './types';

export const administradorApi = {
    cadastrarUsuario: (dados: { email: string; nome: string; adminId: number }) => 
        api.post<{ message: string; data: { senhaTemporaria: string } }>('/admin/usuarios', dados),
    resetarSenha: (adminId: number, usuarioId: number) => 
        api.patch<{ message: string; novaSenha: string }>('/admin/usuarios/resetar-senha', { 
            adminId, 
            usuarioId 
        }),
    obterEstatisticas: () => 
        api.get<{ usuariosCadastrados: number; habitosMonitorados: number }>('/admin/estatisticas'),
    visualizarUsuario: (id: number) => 
        api.get<Partial<Usuario>>(`/admin/usuarios/${id}`)
};