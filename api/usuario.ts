import api from './api';
import { Usuario } from './types';

export const usuarioApi = {
    registrar: (dados: {name:string, email:string, senha:string}) => api.post('/auth/registrar', dados),
    login: (dados: {email:string, senha:string}) => api.post<{user: Usuario}>('/auth/login', dados),
    verificarEmail: (email: string) => api.get(`/auth/verificar-email?email=${email}`)
};