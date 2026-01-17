import { supabase, Habito, FrequenciaEnum } from './supabase';
import { getLocalDateString } from './date';

export type HabitoComProgresso = Habito & {
  progresso?: number;
  qtd_realizada?: number;
};

const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const habitoService = {
  /**
   * Criar novo hábito
   */
  async criar(dados: {
    perfilId: string;
    nome: string;
    categoria: string;
    frequencia: FrequenciaEnum;
    unidadeMedida: string;
    metaAlvo: number;
    motivacao: string;
    dataLimite?: string;
    dataInicio?: string;
  }): Promise<{ id: string }> {
    const dataInicio = dados.dataInicio || getLocalDateString();
    const { data, error } = await supabase
      .from('habitos')
      .insert({
        perfil_id: dados.perfilId,
        nome: dados.nome,
        categoria: dados.categoria,
        frequencia: dados.frequencia,
        unidade_medida: dados.unidadeMedida,
        meta_alvo: dados.metaAlvo,
        motivacao: dados.motivacao,
        data_inicio: dataInicio,
        data_limite: dados.dataLimite || null,
        ativo: true,
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { id: data.id };
  },

  /**
   * Listar hábitos por perfil
   */
  async listarPorPerfil(perfilId: string): Promise<Habito[]> {
    const { data, error } = await supabase
      .from('habitos')
      .select('*')
      .eq('perfil_id', perfilId)
      .eq('ativo', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },

  /**
   * Listar hábitos com progresso do dia
   */
  async listarComProgresso(perfilId: string, data?: string): Promise<HabitoComProgresso[]> {
    const dataReferencia = data || getLocalDateString();

    const { data: habitos, error } = await supabase
      .from('habitos')
      .select(`
        *,
        registros_habito!left(
          qtd_realizada,
          status,
          data_referencia
        )
      `)
      .eq('perfil_id', perfilId)
      .eq('ativo', true)
      .eq('registros_habito.data_referencia', dataReferencia)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    const dataRef = parseLocalDate(dataReferencia);
    const habitosFiltrados = (habitos || []).filter(habito => {
      const dataInicioBase = habito.data_inicio
        ? parseLocalDate(habito.data_inicio)
        : new Date(habito.created_at);
      const dataLimiteHabit = habito.data_limite ? parseLocalDate(habito.data_limite) : null;

      const inicioOk = dataInicioBase <= dataRef;
      const limiteOk = !dataLimiteHabit || dataLimiteHabit >= dataRef;

      if (!inicioOk || !limiteOk) return false;

      if (habito.frequencia === 'SEMANAL') {
        return dataRef.getDay() === dataInicioBase.getDay();
      }

      return true;
    });

    return habitosFiltrados.map(habito => {
      const registro = habito.registros_habito?.[0];
      const qtdRealizada = registro?.qtd_realizada || 0;
      const progresso = habito.meta_alvo > 0 
        ? Math.min(100, Math.round((qtdRealizada / habito.meta_alvo) * 100))
        : 0;

      return {
        ...habito,
        registros_habito: undefined,
        progresso,
        qtd_realizada: qtdRealizada,
      };
    });
  },

  /**
   * Atualizar hábito
   */
  async atualizar(id: string, dados: Partial<Habito>): Promise<{ message: string }> {
    const updateData: Record<string, unknown> = {};

    if (dados.nome !== undefined) updateData.nome = dados.nome;
    if (dados.categoria !== undefined) updateData.categoria = dados.categoria;
    if (dados.frequencia !== undefined) updateData.frequencia = dados.frequencia;
    if (dados.unidade_medida !== undefined) updateData.unidade_medida = dados.unidade_medida;
    if (dados.meta_alvo !== undefined) updateData.meta_alvo = dados.meta_alvo;
    if (dados.motivacao !== undefined) updateData.motivacao = dados.motivacao;
    if (dados.data_limite !== undefined) updateData.data_limite = dados.data_limite;
    if (dados.ativo !== undefined) updateData.ativo = dados.ativo;

    updateData.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('habitos')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Hábito atualizado com sucesso' };
  },

  /**
   * Arquivar hábito (soft delete)
   */
  async arquivar(id: string): Promise<{ message: string }> {
    const { error } = await supabase
      .from('habitos')
      .update({ 
        ativo: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Hábito arquivado com sucesso' };
  },

  /**
   * Obter hábito por ID
   */
  async obterPorId(id: string): Promise<Habito> {
    const { data, error } = await supabase
      .from('habitos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
