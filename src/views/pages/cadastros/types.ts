

export enum ETipos {
  categorias = 'categoria',
  fornecedores = 'fornecedor',
  unidades = 'unidade',
  tags = 'tag',
}

export interface ICadastroItem {
  id: number | string;
  nome?: string;
  despesaId?: string
}

export  interface IListaDeCadastros {
  categorias: Array<ICadastroItem>;
  fornecedores: Array<ICadastroItem>;
  unidades: Array<ICadastroItem>;
  tags: Array<ICadastroItem>;
}

export interface ICadastrosList {
  categorias: [],
  fornecedores: [],
  unidades: [],
  tags: [],
}

export enum EListaCadastro {
  categorias = 1,
  fornecedores = 2,
  unidades = 3,
  tags = 4,
}


export interface IForm {
  nome: string,
  cadastro: string
}
