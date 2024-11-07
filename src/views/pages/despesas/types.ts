export interface IDespesasModel {
  status: string
  valor: number
  nome: string
  descricao: string  
  vencimento: string
  previsao: string
  recorrente: string | null
  frequencia: string
  observacao: string
  ano: number
  costumerId: {
      id: string
  }
  despesaId?: string
  id: string
}

export interface IDespesaMeses {
  ano: number
  valor: number
  status: string
  descricao: string  
  despesaId: string
  vencimento: string;
  observacao: string
}

export interface IDespesas {
  id: string;
  nome: string;    
  previsao: string
  recorrente: string | null
  frequencia: string
  meses: IDespesaMeses[] | [];
  costumerId: {
      id: string
  }
}

export const DespesaInitialState = {
  id: '',
    costumerId: {
        id: ''
    },
    status: '',
    previsao: '',
    ano: 0,
    nome: '',
    descricao: '',
    valor: 0,
    recorrente: null,
    vencimento: '',
    frequencia: '',
    observacao: '',
    meses: []
}