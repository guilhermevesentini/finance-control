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
    return [{
      valor: despesa.valor || '0.00',
      ano: new Date(despesa.vencimento as Date).getFullYear() || 0,
      status: despesa.status || '2',
      descricao: despesa.descricao || '',
      despesaId: despesa.despesaId || useGerarId(configDespesaId),
      vencimento: despesa.vencimento || new Date(),
      observacao: despesa.observacao || ''
    }]
  }
}