import { supabase, Usuario } from './supabase';

export const adminService = {
  /**
   * Cadastrar novo usuário (apenas admin)
   */
  async cadastrarUsuario(dados: {
    email: string;
    nome: string;
    adminId: string;
  }): Promise<{ message: string; data: { senhaTemporaria: string } }> {
    // Verificar se o usuário é admin
    const { data: admin, error: adminError } = await supabase
      .from('usuarios')
      .select('tipo')
      .eq('id', dados.adminId)
      .single();

    if (adminError || admin?.tipo !== 'ADMIN') {
      throw new Error('Acesso não autorizado');
    }

    // Gerar senha temporária
    const senhaTemporaria = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase();

    // Criar usuário via Supabase Admin (isso requer service role key no backend)
    // Para esta implementação, vamos usar o signup normal
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: dados.email,
      password: senhaTemporaria,
      options: {
        data: {
          nome: dados.nome,
        },
      },
    });

    if (authError) {
      throw new Error(authError.message);
    }

    return {
      message: 'Usuário cadastrado com sucesso',
      data: { senhaTemporaria },
    };
  },

  /**
   * Obter estatísticas do sistema
   */
  async obterEstatisticas(): Promise<{
    usuariosCadastrados: number;
    habitosMonitorados: number;
  }> {
    const { count: usuariosCount, error: usuariosError } = await supabase
      .from('usuarios')
      .select('*', { count: 'exact', head: true });

    if (usuariosError) {
      throw new Error(usuariosError.message);
    }

    const { count: habitosCount, error: habitosError } = await supabase
      .from('habitos')
      .select('*', { count: 'exact', head: true })
      .eq('ativo', true);

    if (habitosError) {
      throw new Error(habitosError.message);
    }

    return {
      usuariosCadastrados: usuariosCount || 0,
      habitosMonitorados: habitosCount || 0,
    };
  },

  /**
   * Visualizar usuário
   */
  async visualizarUsuario(id: string): Promise<Partial<Usuario>> {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, email, tipo, created_at')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
