import dayjs from 'dayjs';
import type { Ref } from 'vue';

dayjs.locale('pt-br');

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

const formatCurrency = (value: number) => {
    const val = (typeof value == 'number') ? Number(value) : 0;
    
    const valorFormatado = val.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    
    return valorFormatado
}

export {
  removerAcentos,
  formatDate,
  formatCurrency,
  filtrarItems
}

