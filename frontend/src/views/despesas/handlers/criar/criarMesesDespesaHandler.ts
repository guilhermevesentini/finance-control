import useGerarId from "@/composables/useCriarRandomId";
import { configDespesaId, type IDespesaMeses, type IDespesas, type IDespesasModel } from "../../types"
import { injectable } from "inversify";

export const criarMesesDespesaHandlerDi = Symbol("criarMesesDespesaHandlerDi")

export interface ICriarMesesDespesaHandler {
  criar(despesa: IDespesasModel): IDespesaMeses[]
}

@injectable()
export default class criarMesesDespesaHandler implements ICriarMesesDespesaHandler {  
  criar(despesa: IDespesasModel): IDespesaMeses[] {
    const mesDespesa = new Date(despesa.vencimento as Date).getMonth();
    const max = 12;

    const ano = new Date(despesa.vencimento as Date).getFullYear();
    const dia = new Date(despesa.vencimento as Date).getDate();

    const meses: IDespesaMeses[] = [];

    for (let index = mesDespesa; index <= max; index++) {
      meses.push({
        mes: index,
        valor: despesa.valor || '0.00',
        ano: ano,
        status: despesa.status || '2',
        descricao: despesa.descricao || '',
        despesaId: useGerarId(configDespesaId),
        vencimento: new Date(ano, index, dia),
        observacao: despesa.observacao
      });        
    }

    return meses
  }
}