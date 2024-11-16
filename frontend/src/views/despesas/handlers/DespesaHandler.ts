import { inject, injectable } from "inversify";
import type { IDespesas, IDespesasModel } from "../types";
import { criarDespesaUseCaseDi, type ICriarDespesaUseCase } from "./criar/criarDespesaUseCase";

export const DespesaDi = Symbol("DespesaDi")

export interface IDespesaHandler {
    buildDespesa(despesasList: IDespesas, despesaId: string): IDespesasModel
    //buildDespesaToSave(despesas: IDespesasModel, id: string): IDespesas
}

@injectable()
export default class DespesaHandler implements IDespesaHandler {
    constructor(
        @inject(criarDespesaUseCaseDi) private readonly despesaUseCase: ICriarDespesaUseCase
      ) {}

    buildDespesa(despesasList: IDespesas, despesaId: string): IDespesasModel {
        const findMes = despesasList.meses.find((mes) => mes.despesaId == despesaId);

        const despesa = {   
            mes: findMes?.mes || 0,
            status: findMes?.status || '2',
            valor: findMes?.valor || '0.00',
            nome: despesasList.nome || '',
            descricao: findMes?.descricao || '',  
            vencimento: findMes?.vencimento || undefined,
            recorrente: despesasList.recorrente || '1',
            frequencia: despesasList.frequencia,
            replicar: despesasList.replicar || false,
            ano: findMes?.ano || 0,
            despesaId: findMes?.despesaId || '',
            observacao: findMes?.observacao || '',
            customerId: despesasList.customerId,
            id: despesasList.id || '',
        }

        return despesa
    }

    buildSingleDespesa(despesa: IDespesasModel, id: string): IDespesas {
        const despesaEditada: IDespesas = {
            id: despesa.id || '',
            nome: despesa.nome || '',
            recorrente: despesa. recorrente|| '1',
            frequencia: despesa.frequencia,
            vencimento: despesa.vencimento,
            replicar: despesa.replicar || false,
            meses: [{
                mes: despesa.mes || 0,
                ano: despesa.ano || 0,
                descricao: despesa.descricao || '',
                despesaId: despesa.despesaId || '',
                observacao: despesa.observacao || '',
                status: despesa.status || '2',
                valor: despesa.valor || '0.00',
                vencimento: despesa.vencimento || new Date(),
            }],
            customerId: despesa?.customerId            
        }

        return despesaEditada
    }

    buildMultiDespesas(despesasList: IDespesasModel): IDespesasModel {        
        const despesa = {
            id: despesasList.id || '',
            nome: despesasList.nome || '',
            recorrente: despesasList.recorrente || '1',
            frequencia: despesasList.frequencia,
            vencimento: despesasList.vencimento,       
            ano: despesasList.ano || 0,
            replicar: despesasList.replicar || false,
            valor: despesasList.frequencia || '0.00',
            status: despesasList.status || '2',
            descricao: despesasList.descricao || '',
            observacao: despesasList.observacao || '',
            despesaId: despesasList.despesaId || '',
            mes: despesasList.mes || 0,
            meses: despesasList.recorrente == '1' ? this.despesaUseCase.handleMes(despesasList) : this.despesaUseCase.handleMeses(despesasList),
            customerId: despesasList?.customerId            
        }

        return despesa
    }
}