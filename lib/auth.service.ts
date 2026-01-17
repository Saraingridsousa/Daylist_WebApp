import { supabase, Usuario } from './supabase';

export type AuthUser = {
  id: string;
  email: string;
  nome: string;
  tipo: 'CLIENTE' | 'ADMIN';
};

export const authService = {
  /**
   * Registrar novo usuário
   */
  async registrar(dados: { name: string; email: string; senha: string }): Promise<{ user: AuthUser; needsEmailConfirmation: boolean }> {
    const { data, error } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.senha,
      options: {
        data: {
          nome: dados.name,
        },
        emailRedirectTo: `${window.location.origin}/dados-pessoais`,
      },
    });

    if (error) {
      // Traduzir erros comuns
      if (error.message.includes('already registered')) {
        throw new Error('Este email já está cadastrado.');
      }
      if (error.message.includes('Invalid email')) {
        throw new Error('Email inválido.');
      }
      if (error.message.includes('Password')) {
        throw new Error('A senha deve ter pelo menos 6 caracteres.');
      }
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Erro ao criar usuário');
    }

    // Verificar se precisa de confirmação de email
    // Se a session é null mas o user existe, significa que precisa confirmar email
    const needsEmailConfirmation = !data.session;

    if (needsEmailConfirmation) {
      // Retornar dados básicos do usuário sem buscar na tabela (ainda não foi criado pelo trigger)
      return {
        user: {
          id: data.user.id,
          email: data.user.email || dados.email,
          nome: dados.name,
          tipo: 'CLIENTE',
        },
        needsEmailConfirmation: true,
      };
    }

    // Buscar dados do usuário na tabela usuarios (quando não precisa de confirmação de email)
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError || !userData) {
      // Se o trigger não criou ainda, aguardar um pouco e tentar novamente
      await new Promise(resolve => setTimeout(resolve, 1500));
      const { data: retryData, error: retryError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (retryError || !retryData) {
        // Retornar dados básicos mesmo se não encontrar na tabela
        return {
          user: {
            id: data.user.id,
            email: data.user.email || dados.email,
            nome: dados.name,
            tipo: 'CLIENTE',
          },
          needsEmailConfirmation: false,
        };
      }

      return {
        user: {
          id: retryData.id,
          email: retryData.email,
          nome: retryData.nome,
          tipo: retryData.tipo,
        },
        needsEmailConfirmation: false,
      };
    }

    return {
      user: {
        id: userData.id,
        email: userData.email,
        nome: userData.nome,
        tipo: userData.tipo,
      },
      needsEmailConfirmation: false,
    };
  },

  /**
   * Login de usuário
   */
  async login(dados: { email: string; senha: string }): Promise<{ user: AuthUser }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: dados.email,
      password: dados.senha,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Credenciais inválidas');
    }

    // Buscar dados completos do usuário
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError || !userData) {
      throw new Error('Erro ao obter dados do usuário');
    }

    return {
      user: {
        id: userData.id,
        email: userData.email,
        nome: userData.nome,
        tipo: userData.tipo,
      },
    };
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Verificar se email existe
   */
  async verificarEmail(email: string): Promise<{ exists: boolean }> {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return { exists: !!data };
  },

  /**
   * Obter usuário atual
   */
  async getUsuarioAtual(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data: userData, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !userData) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      nome: userData.nome,
      tipo: userData.tipo,
    };
  },

  /**
   * Observar mudanças de autenticação
   */
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: userData } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userData) {
          callback({
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
            tipo: userData.tipo,
          });
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  },
};
