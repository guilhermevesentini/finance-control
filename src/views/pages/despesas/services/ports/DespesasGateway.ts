import type { IDespesas } from "../../types"

export interface IDespesasGateway {
    salvarDespesa(despesa: IDespesas): Promise<boolean | undefined>
    obterDespesaById(id: string):  Promise<IDespesas | undefined>
    obterDespesas(): Promise<IDespesas[] | undefined>
    excluirDespesa(id: string): Promise<boolean>
    criarDespesa(despesa: IDespesas): Promise<boolean>
}

export const DespesasGatewayDi = Symbol("DespesasGatewayDi")