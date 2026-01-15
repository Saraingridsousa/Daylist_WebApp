import api from './api';
import { Usuario } from './types';

export const usuarioApi = {
    registrar: (dados: any) => api.post('/auth/registrar', dados),
    login: (dados: any) => api.post<{user: Usuario}>('/auth/login', dados),
    verificarEmail: (email: string) => api.get(`/auth/verificar-email?email=${email}`)
};