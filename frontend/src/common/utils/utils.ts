import dayjs from 'dayjs';
import type { Ref } from 'vue';

dayjs.locale('pt-br');

const obterIdUsuario = (): string | undefined => {
  const storage = localStorage.getItem('user')

  if (!storage) return

  const usuarioId = JSON.parse(storage);

  return usuarioId._id
}

const removerAcentos = (texto: string) => {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filtrarItems = (lista: any[], filtroAtual: Ref<string>, currentPage: Ref<number>, itemsPerPage: Ref<number>) => {
  try {
      const termoBusca = removerAcentos(filtroAtual.value.trim().toLowerCase());
      let filteredItems = lista;
      
      if(!filteredItems || filteredItems.length <= 0) return

      if (termoBusca) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filteredItems = filteredItems.filter((produto: any) => {
              return (
                  removerAcentos(produto.nome).includes(termoBusca)
              );
          });
      }
             
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      return filteredItems.length >= 1 ? filteredItems.slice(startIndex, startIndex + itemsPerPage.value) : filteredItems;
  } catch (err) {
      throw new Error(
          'Erro ao carregar os produtos'
      );
  }
};

const formatDate = (date: string) => {
    return dayjs(date).format('DD/MM/YYYY');
}

const formatCurrency = (value: string | number): string => {
    // Converte o valor para número, lidando com possíveis strings de entrada
    const val = typeof value === 'string' ? Number(value) : value;

    // Caso a conversão não resulte em um número válido, retorna "R$ 0,00"
    if (isNaN(val)) {
        return 'R$ 0,00';
    }

    // Formata o valor como moeda brasileira
    const valorFormatado = val.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return valorFormatado;
};

const currencyToInt = (value: string | number): number => {
  if (typeof value === "string") {
    // Remove os pontos e as vírgulas
    const cleanValue = value.replace(/[^\d,.-]/g, '').replace(',', '.');

    // Converte para número
    const formattedValue = parseFloat(cleanValue) || 0;

    // Força a formatação para 2 casas decimais
    return parseFloat(formattedValue.toFixed(2));
  }

  // Se for um número inteiro, transforma para 2 casas decimais
  return parseFloat(value.toFixed(2));
};

const formatToCurrency = (value: string | number): string => {
  const numberValue = typeof value === 'string' ? parseFloat(value) / 100 : value / 100;
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
  
const parseToInt = (value: string): number => {
  // Se o valor estiver vazio, retornar 0
  if (!value) {
    return 0;
  }

  // Garantir que o valor esteja no formato correto, substituindo vírgulas por pontos
  const normalizedValue = value.replace(',', '.');

  // Verifica se o valor começa com ponto (exemplo: ".500") e trata isso
  if (normalizedValue.startsWith('.')) {
    return 0;
  }

  // Remover tudo que não for número ou ponto decimal
  const cleanedValue = normalizedValue.replace(/[^0-9.]/g, "");

  // Garantir que o valor não está vazio e é um número válido
  const parsedValue = parseFloat(cleanedValue);
  if (isNaN(parsedValue)) {
    return 0;
  }

  // Retornar o valor convertido para inteiro (em centavos)
  return Math.round(parsedValue * 100);
};

export {
  obterIdUsuario,
  removerAcentos,
  formatDate,
  formatCurrency,
  filtrarItems,
  currencyToInt,
  parseToInt,
  formatToCurrency
}

