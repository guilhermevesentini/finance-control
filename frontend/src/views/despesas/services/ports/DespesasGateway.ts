import type { IDefaultHttpResponse } from "@/api/types/httpClient"
import type { IDespesas, IDespesasModel } from "../../types"

export interface IDespesasGateway {
    salvarDespesas(despesas: IDespesas, despesaId: string): Promise<boolean>
    obterDespesaById(id: string):  Promise<IDespesas | undefined>
    obterDespesas(): Promise<IDefaultHttpResponse<IDespesas[]> | undefined>
    excluirDespesa(params: IDespesasModel): Promise<boolean>
    criarDespesa(despesa: IDespesas): Promise<boolean>
}

export const DespesasGatewayDi = Symbol("DespesasGatewayDi")