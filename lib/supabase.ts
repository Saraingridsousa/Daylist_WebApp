import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos das tabelas do banco de dados
export type Usuario = {
  id: string;
  nome: string;
  email: string;
  tipo: 'CLIENTE' | 'ADMIN';
  created_at: string;
};

export type Perfil = {
  id: string;
  usuario_id: string;
  data_nascimento: string | null;
  sexo: 'M' | 'F' | 'N' | null;
  peso_atual: number | null;
  altura_atual: number | null;
  ofensiva_atual: number;
  maior_ofensiva: number;
  created_at: string;
  updated_at: string;
};

export type FrequenciaEnum = 'DIARIO' | 'SEMANAL';
export type StatusHabitoEnum = 'PENDENTE' | 'PARCIAL' | 'CONCLUIDO';

export type Habito = {
  id: string;
  perfil_id: string;
  nome: string;
  categoria: string;
  frequencia: FrequenciaEnum;
  unidade_medida: string | null;
  meta_alvo: number;
  motivacao: string | null;
  data_inicio: string | null;
  data_limite: string | null;
  ativo: boolean;
  created_at: string;
  updated_at: string;
};

export type RegistroHabito = {
  id: string;
  habito_id: string;
  data_referencia: string;
  qtd_realizada: number;
  status: StatusHabitoEnum;
  created_at: string;
};

export type RelatorioIA = {
  id: string;
  usuario_id: string;
  texto_analise: string | null;
  data_inicio: string;
  data_fim: string;
  data_geracao: string;
};

export type ResumoSaude = {
  imc: string | null;
  ofensiva_atual: number;
  maior_ofensiva: number;
  data_nascimento: string | null;
  sexo: string | null;
  peso_atual: number | null;
  altura_atual: number | null;
};
