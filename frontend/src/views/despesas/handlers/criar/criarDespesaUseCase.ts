import { inject, injectable } from "inversify";
import type { IDespesaMeses, IDespesas, IDespesasModel } from "../../types";
import { criarDespesaHandlerDi, type ICriarDespesaHandler } from "./criarDespesaHandler";
import { criarMesDespesaHandlerDi, type ICriarMesDespesaHandler } from "./criarMesDespesaHandler";
import { criarMesesDespesaHandlerDi, type ICriarMesesDespesaHandler } from "./criarMesesDespesaHandler";

export const criarDespesaUseCaseDi = Symbol("criarDespesaUseCaseDi")

export interface ICriarDespesaUseCase {
  handleDespesa(despesa: IDespesasModel): IDespesas
  handleMes(despesa: IDespesasModel): IDespesaMeses[]
  handleMeses(despesa: IDespesasModel): IDespesaMeses[]
}

@injectable()
export default class criarDespesaUseCase implements ICriarDespesaUseCase {
  constructor(
    @inject(criarDespesaHandlerDi) private readonly criarDespesaUseCase: ICriarDespesaHandler,
    @inject(criarMesDespesaHandlerDi) private readonly criarMesUseCase: ICriarMesDespesaHandler,
    @inject(criarMesesDespesaHandlerDi) private readonly criarMesesUseCase: ICriarMesesDespesaHandler
  ) {}

  handleDespesa(despesa: IDespesasModel): IDespesas {
    return this.criarDespesaUseCase.criar(despesa);
  }

  handleMes(despesa: IDespesasModel): IDespesaMeses[] {
    return this.criarMesUseCase.criar(despesa);
  }

  handleMeses(despesa: IDespesasModel): IDespesaMeses[] {
    return this.criarMesesUseCase.criar(despesa);
  }
}