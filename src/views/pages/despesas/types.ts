export interface IDespesasModel {
  status: string
  valor: string
  nome: string
  descricao: string  
  vencimento: Date | undefined
  recorrente: string | null
  frequencia: string
  replicar: boolean
  observacao: string
  ano: number
  costumerId: {
    id: string
  }
  despesaId: string
  id: string
}

export interface IDespesaMeses {
  ano: number
  valor: string
  status: string
  descricao: string  
  despesaId: string
  vencimento: Date | undefined;
  observacao: string
}

export interface IDespesas {
  id: string;
  nome: string;
  recorrente: string | null
  vencimento: Date | undefined
  frequencia: string
  replicar: boolean
  meses: IDespesaMeses[] | [];
  costumerId: {
    id: string
  }
}

export const DespesaInitialState: IDespesasModel = {
  id: '',
  costumerId: {
      id: ''
  },
  status: '',
  ano: 0,
  nome: '',
  descricao: '',
  replicar: false,
  valor: '0.00',
  recorrente: null,
  vencimento: new Date(),
  frequencia: '',
  observacao: '',
  despesaId: ''
}