import useGerarId from "@/composables/useCriarRandomId";
import { configDespesaId, type IDespesas, type IDespesasModel } from "../../types"
import { criarMesDespesaHandlerDi, type ICriarMesDespesaHandler } from "./criarMesDespesaHandler";
import { inject, injectable } from "inversify";
import { criarMesesDespesaHandlerDi, type ICriarMesesDespesaHandler } from "./criarMesesDespesaHandler";
import { obterIdUsuario } from "@/common/utils/utils";

export const criarDespesaHandlerDi = Symbol("criarDespesaHandlerDi")

export interface ICriarDespesaHandler {
  criar(despesa: IDespesasModel): IDespesas
}

@injectable()
export default class criarDespesaHandler implements ICriarDespesaHandler {  
  constructor(
    @inject(criarMesDespesaHandlerDi) private readonly criarMes: ICriarMesDespesaHandler,
    @inject(criarMesesDespesaHandlerDi) private readonly criarMeses: ICriarMesesDespesaHandler
  ) {}
  
  criar(despesa: IDespesasModel): IDespesas {
    const novaDespesa: IDespesas = {
      id: null,
      nome: despesa.nome,
      vencimento: despesa.vencimento,
      recorrente: despesa.recorrente,
      frequencia: despesa.frequencia,
      replicar: despesa.replicar,
      meses: despesa.recorrente == '1' ? this.criarMeses.criar(despesa) : this.criarMes.criar(despesa),            
      customerId: despesa.customerId || obterIdUsuario() || ''
    }

    return novaDespesa;
  }
}