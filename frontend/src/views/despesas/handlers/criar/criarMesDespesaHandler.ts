import useGerarId from "@/composables/useCriarRandomId";
import { configDespesaId, type IDespesaMeses, type IDespesas, type IDespesasModel } from "../../types"
import { injectable } from "inversify";

export const criarMesDespesaHandlerDi = Symbol("criarMesDespesaHandlerDi")

export interface ICriarMesDespesaHandler {
  criar(despesa: IDespesasModel): IDespesaMeses[]
}

@injectable()
export default class criarMesDespesaHandler implements ICriarMesDespesaHandler {  
  criar(despesa: IDespesasModel): IDespesaMeses[] {
    console.log('despesa', despesa);
    
    const mesDespesa = new Date(despesa.vencimento as Date).getMonth() + 1;
    const ano = new Date(despesa.vencimento as Date).getFullYear();

    return [{
      mes: mesDespesa,
      valor: despesa.valor || '0.00',
      ano: ano,
      status: despesa.status || '2',
      descricao: despesa.descricao || '',
      despesaId: despesa.id || null,
      vencimento: despesa.vencimento || new Date(),
      observacao: despesa.observacao || ''
    }]
  }
}