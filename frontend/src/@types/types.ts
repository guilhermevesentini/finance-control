export interface IProduto {
    id: number,
    _id: string,
    _id_Produto: string,
    nome: string,
    descricao: string,
    codigo: string,
    marca: string,
    modelo: string,
    categoria: string,
    quantidade: number,
    preco: number,
    fornecedor: string,
    dataAquisicao: string,
    localizacao: string,
    tag: string,
    observacao: string,
    total: number,
}

export interface ICategorias {
    _id: string;
    nome: string;
}

export enum ETipoProduto {
    Mercado = 'Mercado',
    Moda = 'Moda',
    Moveis = 'Móveis',
    MusicaShows = 'Música e Shows',
    Natal = 'Natal',
    Papelaria = 'Papelaria',
    PetShop = 'Pet Shop',
    ReligiaoEspiritualidade = 'Religião e Espiritualidade',
    Relogios = 'Relógios',
    SaudeCuidadosPessoais = 'Saúde e Cuidados Pessoais',
    Servicos = 'Serviços',
    SuplementosAlimentares = 'Suplementos Alimentares',
    TabletsIpadEReaders = 'Tablets, iPads e E-Readers',
    TelefoniaFixa = 'Telefonia Fixa',
    TVVideo = 'TV e Vídeo',
    UtilidadesDomesticas = 'Utilidades Domésticas',
}

export interface ICadastro {

    id: number,
    nome: string,
}
  