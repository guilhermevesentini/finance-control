import { inject, injectable } from "inversify"
import type { IDespesas, IDespesasModel } from "../../types"
import { ObterDespesaPorUsuarioDi, type IObterDespesaPorUsuario } from "@/controller/Despesas/handlers/obter/usuarios/ObterDespesaPorUsuario"
import { DespesasGatewayDi, type IDespesasGateway } from "../../services/ports/DespesasGateway"

//simulando tratamento do backend

export const editarDespesaHandlerDi = Symbol("editarDespesaHandlerDi")

export interface IEditarDespesaHandler {
  editar(despesa: IDespesasModel): Promise<boolean>
}

@injectable()
export default class editarDespesaHandler implements IEditarDespesaHandler {
  constructor(
    @inject(ObterDespesaPorUsuarioDi) private readonly despesasUsuario: IObterDespesaPorUsuario,
    @inject(DespesasGatewayDi) private readonly despesasGateway: IDespesasGateway    
  ) {}

  protected async editarSingle(despesas: IDespesas[], model: IDespesasModel): Promise<boolean> {
    const despesaSelecionada = despesas?.find((despesaAtual) => despesaAtual.id === model.id);

    if (!despesaSelecionada) return false

    Object.assign(despesaSelecionada, {
      frequencia: model.frequencia,
      nome: model.nome,
      recorrente: model.recorrente,
      replicar: model.replicar,
      vencimento: model.vencimento
  });

    const mesEncontrado = despesaSelecionada.meses.find((mes) => mes.despesaId === model.despesaId);

    // Se o mês não for encontrado, retorna false
    if (!mesEncontrado) return false;

    mesEncontrado.ano = model.ano;
    mesEncontrado.descricao = model.descricao;
    mesEncontrado.observacao = model.observacao;
    mesEncontrado.status = model.status;
    mesEncontrado.valor = model.valor;
    mesEncontrado.vencimento = model.vencimento;
    
    return await this.despesasGateway.salvarDespesas(despesaSelecionada, model.id);
  }

  protected async editarAll(despesas: IDespesas[], model: IDespesasModel): Promise<boolean> {

    const despesaSelecionada = despesas?.find((despesaAtual) => despesaAtual.id === model.id);

    if(!despesaSelecionada) return false

    Object.assign(despesaSelecionada, {
      frequencia: model.frequencia,
      nome: model.nome,
      recorrente: model.recorrente,
      replicar: model.replicar,
      vencimento: model.vencimento
    });

  despesaSelecionada.meses.forEach((mes) => {
      mes.descricao = model.descricao;
      mes.observacao = model.observacao;
      mes.status = model.status;
      mes.valor = model.valor;
  });

    const response = await this.despesasGateway.salvarDespesas(despesaSelecionada, model.id);
    
    if (!response) return false

    return true    
  }

  async editar(despesa: IDespesasModel): Promise<boolean> {
    const despesasList = await this.despesasUsuario.obter();

    if (!despesasList) return false

    if (!despesa.replicar) {
      return this.editarSingle(despesasList, despesa)
    } else {
      return this.editarAll(despesasList, despesa)
    }
  }
}