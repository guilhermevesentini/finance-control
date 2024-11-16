export interface IDespesasModel {
  status: string
  valor: string
  nome: string
  descricao: string  
  vencimento: Date | string | undefined
  recorrente: string | null
  frequencia: string
  replicar: boolean
  observacao: string
  ano: number
  costumerId: string
  despesaId: string
  id: string
}

export interface IDespesaMeses {
  ano: number
  valor: string
  status: string
  descricao: string  
  despesaId: string
  vencimento: Date | string | undefined;
  observacao: string
}

export interface IDespesas {
  id: string;
  nome: string;
  recorrente: string | null
  vencimento: Date | string | undefined
  frequencia: string
  replicar: boolean
  meses: IDespesaMeses[] | [];
  costumerId: string
}

export const DespesaInitialState: IDespesasModel = {
  id: '',
  costumerId: '',
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

export const navItemsDespesas = [
  {
    label: "Overview",
    name: '/Despesas/overview'    
  },
  {
    label: "Despesas",
    name: '/Despesas/lista'    
  },
  {
    label: "Config",
    name: '/Despesas/config'    
  }
];


export const configDespesaId = {
  quantidade: 16,
  tipo: 'string'
}