export enum FrequenciaEnum {
    DIARIO = 'DIARIO',
    SEMANAL = 'SEMANAL'
}

export enum StatusHabitoEnum {
    PENDENTE = 'PENDENTE',
    PARCIAL = 'PARCIAL',
    CONCLUIDO = 'CONCLUIDO'
}

export interface Usuario {
    id: number;
    email: string;
    tipo: 'CLIENTE' | 'ADMIN';
}

export interface Habito {
    id: number;
    perfilId: number;
    nome: string;
    categoria: string;
    frequencia: FrequenciaEnum;
    unidadeMedida: string;
    metaAlvo: number;
    motivacao: string;
    ativo: boolean;
}

export interface RegistroHabito {
    id: number;
    habito_id: number;
    dataReferencia: string;
    qtdRealizada: number;
    status: StatusHabitoEnum;
}

export interface RelatorioIA {
    id: number;
    textoAnalise: string;
    dataInicio: string;
    dataFim: string;
    dataGeracao: string;
}