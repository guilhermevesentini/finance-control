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
  mes: number
  customerId: string
  despesaId: string
  id: string
}

export interface IDespesaMeses {
  mes: number;
  ano: number
  valor: string
  status: string
  descricao: string  
  despesaId: string | null
  vencimento: Date | string | undefined;
  observacao: string
}

export interface IDespesas {
  id: string | null;
  nome: string;
  recorrente: string | null
  vencimento: Date | string | undefined
  frequencia: string
  replicar: boolean
  meses: IDespesaMeses[] | [];
  customerId: string
}

export const DespesaInitialState: IDespesasModel = {
  id: '',
  customerId: '',
  status: '',
  ano: 0,
  nome: '',
  mes: 0,
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