import type { IDespesas, IDespesasModel } from "../../types"

export interface IDespesasGateway {
    salvarDespesa(despesa: IDespesasModel, despesaId: string): Promise<boolean | undefined>
    salvarDespesas(despesa: IDespesas): Promise<boolean | undefined>
    obterDespesaById(id: string):  Promise<IDespesas | undefined>
    obterDespesas(): Promise<IDespesas[] | undefined>
    excluirDespesa(id: string): Promise<boolean>
    criarDespesa(despesa: IDespesas): Promise<boolean>
}

export const DespesasGatewayDi = Symbol("DespesasGatewayDi")