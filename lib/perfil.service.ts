import { supabase, Perfil, ResumoSaude } from './supabase';

export const perfilService = {
  /**
   * Obter perfil do usuário
   */
  async obterPerfil(usuarioId: string): Promise<ResumoSaude> {
    const { data, error } = await supabase
      .from('perfis')
      .select('*')
      .eq('usuario_id', usuarioId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // Calcular IMC
    let imc: string | null = null;
    if (data.peso_atual && data.altura_atual) {
      const alturaMetros = data.altura_atual / 100;
      const imcValue = data.peso_atual / (alturaMetros * alturaMetros);
      imc = imcValue.toFixed(2);
    }

    return {
      imc,
      ofensiva_atual: data.ofensiva_atual || 0,
      maior_ofensiva: data.maior_ofensiva || 0,
      data_nascimento: data.data_nascimento,
      sexo: data.sexo,
      peso_atual: data.peso_atual,
      altura_atual: data.altura_atual,
    };
  },

  /**
   * Obter perfil completo
   */
  async obterPerfilCompleto(usuarioId: string): Promise<Perfil> {
    const { data, error } = await supabase
      .from('perfis')
      .select('*')
      .eq('usuario_id', usuarioId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Atualizar dados biométricos
   */
  async atualizarBiometria(dados: {
    usuarioId: string;
    peso: number;
    altura: number;
    dataNascimento: string;
    sexo: string;
  }): Promise<{ message: string }> {
    const { error } = await supabase
      .from('perfis')
      .update({
        peso_atual: dados.peso,
        altura_atual: dados.altura,
        data_nascimento: dados.dataNascimento,
        sexo: dados.sexo,
        updated_at: new Date().toISOString(),
      })
      .eq('usuario_id', dados.usuarioId);

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Biometria atualizada com sucesso' };
  },

  /**
   * Verificar e atualizar ofensiva
   */
  async verificarOfensiva(usuarioId: string): Promise<{ message: string; ofensiva: number }> {
    // Buscar perfil atual
    const { data: perfil, error: perfilError } = await supabase
      .from('perfis')
      .select('id, ofensiva_atual, maior_ofensiva')
      .eq('usuario_id', usuarioId)
      .single();

    if (perfilError || !perfil) {
      throw new Error('Perfil não encontrado');
    }

    // Verificar se há registros completos hoje
    const hoje = new Date().toISOString().split('T')[0];
    
    const { data: registros, error: registrosError } = await supabase
      .from('registros_habito')
      .select(`
        id,
        status,
        habitos!inner(perfil_id, ativo)
      `)
      .eq('data_referencia', hoje)
      .eq('habitos.perfil_id', perfil.id)
      .eq('habitos.ativo', true);

    if (registrosError) {
      throw new Error(registrosError.message);
    }

    // Verificar se todos os hábitos ativos foram concluídos
    const todosCompletos = registros && registros.length > 0 && 
      registros.every(r => r.status === 'CONCLUIDO');

    let novaOfensiva = perfil.ofensiva_atual;
    
    if (todosCompletos) {
      novaOfensiva = perfil.ofensiva_atual + 1;
      
      const maiorOfensiva = Math.max(novaOfensiva, perfil.maior_ofensiva);
      
      await supabase
        .from('perfis')
        .update({
          ofensiva_atual: novaOfensiva,
          maior_ofensiva: maiorOfensiva,
          updated_at: new Date().toISOString(),
        })
        .eq('id', perfil.id);
    }

    return { 
      message: todosCompletos ? 'Ofensiva atualizada!' : 'Continue completando seus hábitos',
      ofensiva: novaOfensiva 
    };
  },

  /**
   * Obter ID do perfil pelo ID do usuário
   */
  async obterPerfilId(usuarioId: string): Promise<string> {
    const { data, error } = await supabase
      .from('perfis')
      .select('id')
      .eq('usuario_id', usuarioId)
      .single();

    if (error || !data) {
      throw new Error('Perfil não encontrado');
    }

    return data.id;
  },
};
