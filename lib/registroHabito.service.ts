import { supabase, RegistroHabito, StatusHabitoEnum } from './supabase';

export const registroHabitoService = {
  /**
   * Registrar progresso de um hábito
   */
  async registrarProgresso(dados: {
    habitoId: string;
    usuarioId: string;
    qtdRealizada: number;
    data?: string;
  }): Promise<{ message: string }> {
    const dataReferencia = dados.data || new Date().toISOString().split('T')[0];

    // Buscar a meta do hábito para calcular o status
    const { data: habito, error: habitoError } = await supabase
      .from('habitos')
      .select('meta_alvo')
      .eq('id', dados.habitoId)
      .single();

    if (habitoError || !habito) {
      throw new Error('Hábito não encontrado');
    }

    // Calcular status baseado no progresso
    let status: StatusHabitoEnum = 'PENDENTE';
    if (dados.qtdRealizada >= habito.meta_alvo) {
      status = 'CONCLUIDO';
    } else if (dados.qtdRealizada > 0) {
      status = 'PARCIAL';
    }

    // Verificar se já existe um registro para este hábito nesta data
    const { data: registroExistente } = await supabase
      .from('registros_habito')
      .select('id, qtd_realizada')
      .eq('habito_id', dados.habitoId)
      .eq('data_referencia', dataReferencia)
      .maybeSingle();

    if (registroExistente) {
      // Atualizar registro existente
      const novaQtd = dados.qtdRealizada;
      
      let novoStatus: StatusHabitoEnum = 'PENDENTE';
      if (novaQtd >= habito.meta_alvo) {
        novoStatus = 'CONCLUIDO';
      } else if (novaQtd > 0) {
        novoStatus = 'PARCIAL';
      }

      const { error: updateError } = await supabase
        .from('registros_habito')
        .update({
          qtd_realizada: novaQtd,
          status: novoStatus,
        })
        .eq('id', registroExistente.id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      return { message: 'Progresso atualizado com sucesso' };
    }

    // Criar novo registro
    const { error } = await supabase
      .from('registros_habito')
      .insert({
        habito_id: dados.habitoId,
        data_referencia: dataReferencia,
        qtd_realizada: dados.qtdRealizada,
        status,
      });

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Progresso registrado com sucesso' };
  },

  /**
   * Listar registros por data e perfil
   */
  async listarPorData(perfilId: string, data: string): Promise<RegistroHabito[]> {
    const { data: registros, error } = await supabase
      .from('registros_habito')
      .select(`
        *,
        habitos!inner(perfil_id)
      `)
      .eq('data_referencia', data)
      .eq('habitos.perfil_id', perfilId);

    if (error) {
      throw new Error(error.message);
    }

    return (registros || []).map(r => ({
      id: r.id,
      habito_id: r.habito_id,
      data_referencia: r.data_referencia,
      qtd_realizada: r.qtd_realizada,
      status: r.status,
      created_at: r.created_at,
    }));
  },

  /**
   * Incrementar progresso
   */
  async incrementarProgresso(dados: {
    habitoId: string;
    incremento: number;
    data?: string;
  }): Promise<{ message: string; novaQtd: number; status: StatusHabitoEnum }> {
    const dataReferencia = dados.data || new Date().toISOString().split('T')[0];

    // Buscar a meta do hábito
    const { data: habito, error: habitoError } = await supabase
      .from('habitos')
      .select('meta_alvo')
      .eq('id', dados.habitoId)
      .single();

    if (habitoError || !habito) {
      throw new Error('Hábito não encontrado');
    }

    // Buscar registro existente
    const { data: registroExistente } = await supabase
      .from('registros_habito')
      .select('id, qtd_realizada')
      .eq('habito_id', dados.habitoId)
      .eq('data_referencia', dataReferencia)
      .maybeSingle();

    const qtdAtual = registroExistente?.qtd_realizada || 0;
    const novaQtd = Math.max(0, qtdAtual + dados.incremento);

    let status: StatusHabitoEnum = 'PENDENTE';
    if (novaQtd >= habito.meta_alvo) {
      status = 'CONCLUIDO';
    } else if (novaQtd > 0) {
      status = 'PARCIAL';
    }

    if (registroExistente) {
      const { error: updateError } = await supabase
        .from('registros_habito')
        .update({
          qtd_realizada: novaQtd,
          status,
        })
        .eq('id', registroExistente.id);

      if (updateError) {
        throw new Error(updateError.message);
      }
    } else {
      const { error: insertError } = await supabase
        .from('registros_habito')
        .insert({
          habito_id: dados.habitoId,
          data_referencia: dataReferencia,
          qtd_realizada: novaQtd,
          status,
        });

      if (insertError) {
        throw new Error(insertError.message);
      }
    }

    return { message: 'Progresso atualizado', novaQtd, status };
  },

  /**
   * Obter histórico de registros de um hábito
   */
  async obterHistorico(habitoId: string, limite: number = 30): Promise<RegistroHabito[]> {
    const { data, error } = await supabase
      .from('registros_habito')
      .select('*')
      .eq('habito_id', habitoId)
      .order('data_referencia', { ascending: false })
      .limit(limite);

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },
};
