import { inject, injectable } from "inversify";
import type { IDespesas, IDespesasModel } from "../types";
import { currencyToInt } from "@/utils/utils";
import { AdicionarDespesaControllerDi, type IAdicionarDespesaController } from "./AdiconarDespesaController";

export const DespesaControllerDi = Symbol("DespesaControllerDi")

export interface IDespesaController {
    buildDespesasByMonth(despesasList: IDespesas[], periodo: number): IDespesasModel[]
    buildDespesa(despesasList: IDespesas, despesaId: string): IDespesasModel
    buildDespesaToSave(despesasList: IDespesasModel | IDespesas, id: string): IDespesasModel | IDespesas
    obterDespesasDoUsuario(despesasList: IDespesas[]): IDespesas | IDespesas[]
}

@injectable()
export default class DespesaController implements IDespesaController {
    @inject(AdicionarDespesaControllerDi) private readonly criarDespesa!: IAdicionarDespesaController

    constructor() { }

    obterDespesasDoUsuario(despesasList: IDespesas[]): IDespesas[] | [] {
        const storage = localStorage.getItem('user')

        if (!storage) return []

        const usuarioId = JSON.parse(storage);

        const findDespesasUsuario = despesasList.filter((despesa) => despesa.costumerId.id == usuarioId._id);

        return findDespesasUsuario
    }

    buildDespesasByMonth(despesasList: IDespesas[], periodo: number): IDespesasModel[] {
        if (!despesasList) return []

        const anoAtual = new Date().getFullYear();
        
        const despesasDoMes: IDespesasModel[] = []

        const despesas = this.obterDespesasDoUsuario(despesasList);

        if (despesas.length >= 1) {
            despesas.map((despesa) => {
                if (despesa.meses) {
                    despesa.meses.forEach((mes) => {
                        const date = new Date(mes.vencimento as Date);
                        const month = date.getMonth();
        
                        if (mes.ano === anoAtual && month === periodo) {
                            despesasDoMes.push({
                                status: mes.status || '2',
                                valor: mes.valor || '0.00',
                                nome: despesa.nome || '',
                                descricao: mes.descricao || '',
                                vencimento: mes.vencimento,
                                recorrente: despesa.recorrente || '1',
                                frequencia: despesa.frequencia,
                                ano: mes.ano || 0,
                                replicar: despesa.replicar || false,                                
                                despesaId: mes.despesaId || '',
                                observacao: mes.observacao || '',
                                costumerId: {
                                    id: despesa?.costumerId?.id || ''
                                },
                                id: despesa.id || '',
                            });
                        }
                    });
                }
            });
        }

        if (!despesasDoMes.length) return []

        return despesasDoMes;
    }

    buildDespesa(despesasList: IDespesas, despesaId: string): IDespesasModel {
        const findMes = despesasList.meses.find((mes) => mes.despesaId == despesaId);

        const despesa = {
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
            costumerId: {
                id: despesasList?.costumerId?.id || ''
            },
            id: despesasList.id || '',
        }

        return despesa
    }

    buildSingleDespesa(despesa: IDespesasModel, id: string): IDespesas {
        const despesaEditada: IDespesas = {
            id: despesa.id || '',
            nome: despesa.nome || '',
            recorrente: despesa.recorrente || '1',
            frequencia: despesa.frequencia,
            vencimento: despesa.vencimento,
            replicar: despesa.replicar || false,
            meses: [{
                ano: despesa.ano || 0,
                descricao: despesa.descricao || '',
                despesaId: despesa.despesaId || '',
                observacao: despesa.observacao || '',
                status: despesa.status || '2',
                valor: despesa.valor || '0.00',
                vencimento: despesa.vencimento || new Date(),
            }],
            costumerId: {
                id: despesa?.costumerId?.id || ''
            },
            
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
            meses: despesasList.recorrente == '1' ? this.criarDespesa.criarMeses(despesasList) : this.criarDespesa.criarMes(despesasList),
            costumerId: {
                id: despesasList?.costumerId?.id || ''
            },
            
        }

        return despesa
    }

    buildDespesaToSave(despesasList: IDespesasModel | IDespesas, id: string): IDespesasModel | IDespesas {        
        if (despesasList.replicar) {
            const despesa = this.buildSingleDespesa(despesasList as IDespesasModel, id)

            return despesa
        } 
        
        const despesas = this.buildMultiDespesas(despesasList as IDespesasModel)

        return despesas
    }
}