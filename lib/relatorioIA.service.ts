import { supabase, RelatorioIA } from './supabase';

export const relatorioIAService = {
  /**
   * Gerar relatório de IA
   */
  async gerarRelatorio(
    usuarioId: string,
    dataInicio: string,
    dataFim: string
  ): Promise<RelatorioIA> {
    // Buscar dados do usuário
    const { data: usuario, error: usuarioError } = await supabase
      .from('usuarios')
      .select('nome')
      .eq('id', usuarioId)
      .single();

    if (usuarioError) {
      throw new Error('Usuário não encontrado');
    }

    // Buscar perfil
    const { data: perfil, error: perfilError } = await supabase
      .from('perfis')
      .select('id')
      .eq('usuario_id', usuarioId)
      .single();

    if (perfilError || !perfil) {
      throw new Error('Perfil não encontrado');
    }

    // Buscar hábitos e registros do período
    const { data: habitos, error: habitosError } = await supabase
      .from('habitos')
      .select(`
        id,
        nome,
        meta_alvo,
        registros_habito(
          qtd_realizada,
          status,
          data_referencia
        )
      `)
      .eq('perfil_id', perfil.id)
      .eq('ativo', true)
      .gte('registros_habito.data_referencia', dataInicio)
      .lte('registros_habito.data_referencia', dataFim);

    if (habitosError) {
      throw new Error(habitosError.message);
    }

    // Gerar análise baseada nos dados
    const textoAnalise = gerarTextoAnalise(usuario.nome, habitos || [], dataInicio, dataFim);

    // Salvar relatório no banco
    const { data: relatorio, error: relatorioError } = await supabase
      .from('relatorios_ia')
      .insert({
        usuario_id: usuarioId,
        texto_analise: textoAnalise,
        data_inicio: dataInicio,
        data_fim: dataFim,
      })
      .select()
      .single();

    if (relatorioError) {
      throw new Error(relatorioError.message);
    }

    return relatorio;
  },

  /**
   * Listar relatórios por usuário
   */
  async listarPorUsuario(usuarioId: string): Promise<RelatorioIA[]> {
    const { data, error } = await supabase
      .from('relatorios_ia')
      .select('*')
      .eq('usuario_id', usuarioId)
      .order('data_geracao', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },

  /**
   * Obter relatório por ID
   */
  async obterPorId(id: string): Promise<RelatorioIA> {
    const { data, error } = await supabase
      .from('relatorios_ia')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};

/**
 * Função auxiliar para gerar texto de análise
 */
function gerarTextoAnalise(
  nomeUsuario: string,
  habitos: Array<{
    id: string;
    nome: string;
    meta_alvo: number;
    registros_habito: Array<{
      qtd_realizada: number;
      status: string;
      data_referencia: string;
    }>;
  }>,
  dataInicio: string,
  dataFim: string
): string {
  if (!habitos || habitos.length === 0) {
    return `Olá, ${nomeUsuario}! 🌿\n\nParece que você ainda não tem hábitos cadastrados ou não há registros no período selecionado. Que tal começar a acompanhar seus hábitos hoje?\n\nLembre-se: pequenos passos levam a grandes mudanças!`;
  }

  // Calcular estatísticas
  let totalRegistros = 0;
  let totalConcluidos = 0;
  const habitoStats: Array<{ nome: string; taxa: number; total: number }> = [];

  habitos.forEach(habito => {
    const registros = habito.registros_habito || [];
    const concluidos = registros.filter(r => r.status === 'CONCLUIDO').length;
    totalRegistros += registros.length;
    totalConcluidos += concluidos;

    if (registros.length > 0) {
      habitoStats.push({
        nome: habito.nome,
        taxa: Math.round((concluidos / registros.length) * 100),
        total: registros.length,
      });
    }
  });

  const taxaGeral = totalRegistros > 0 ? Math.round((totalConcluidos / totalRegistros) * 100) : 0;

  // Encontrar melhor e pior hábito
  const melhorHabito = habitoStats.sort((a, b) => b.taxa - a.taxa)[0];
  const piorHabito = habitoStats.sort((a, b) => a.taxa - b.taxa)[0];

  let texto = `Olá, ${nomeUsuario}! 🌿\n\n`;

  if (taxaGeral >= 80) {
    texto += `Incrível! Você teve uma semana excepcional com ${taxaGeral}% de conclusão dos seus hábitos! 🎉\n\n`;
  } else if (taxaGeral >= 60) {
    texto += `Bom trabalho! Você completou ${taxaGeral}% dos seus hábitos esta semana. Continue assim! 💪\n\n`;
  } else if (taxaGeral >= 40) {
    texto += `Você completou ${taxaGeral}% dos seus hábitos. Há espaço para melhorar, mas cada dia é uma nova oportunidade! 🌱\n\n`;
  } else {
    texto += `Esta semana foi desafiadora com ${taxaGeral}% de conclusão. Não desanime! Amanhã é um novo dia para recomeçar. 🌅\n\n`;
  }

  if (melhorHabito && melhorHabito.taxa > 0) {
    texto += `Destaque positivo: "${melhorHabito.nome}" com ${melhorHabito.taxa}% de conclusão! 📚\n\n`;
  }

  if (piorHabito && piorHabito.taxa < 100 && piorHabito.nome !== melhorHabito?.nome) {
    texto += `Ponto de atenção: "${piorHabito.nome}" ficou em ${piorHabito.taxa}%. Que tal definir um lembrete? 💧\n\n`;
  }

  texto += `Lembre-se: não precisa ser perfeito, só precisa ser constante. Vamos com tudo para a próxima semana! Um dia de cada vez. ✨`;

  return texto;
}
