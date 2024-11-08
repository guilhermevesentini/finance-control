import { inject, injectable } from "inversify";
import type { IDespesas, IDespesasModel } from "../types";
import { currencyToInt } from "@/utils/utils";
import { AdicionarDespesaControllerDi, type IAdicionarDespesaController } from "./AdiconarDespesaController";

export const DespesaControllerDi = Symbol("DespesaControllerDi")

export interface IDespesaController {
    buildDespesasByMonth(despesasList: IDespesas[], periodo: number): IDespesasModel[]
    buildDespesa(despesasList: IDespesas, despesaId: string): IDespesasModel
    buildDespesaToSave(despesasList: IDespesasModel): IDespesasModel | IDespesas
    obterDespesasDoUsuario(despesasList: IDespesas[]): IDespesas | IDespesas[]
}

@injectable()
export default class DespesaController implements IDespesaController {
    @inject(AdicionarDespesaControllerDi) private readonly criarDespesa!: IAdicionarDespesaController

    private Despesas: IDespesasModel[];

    constructor() { this.Despesas = []}

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

    buildSingleDespesa(despesasList: IDespesasModel): IDespesas {
        const despesa = {
            id: despesasList.id || '',
            nome: despesasList.nome || '',
            recorrente: despesasList.recorrente || '1',
            frequencia: despesasList.frequencia,
            vencimento: despesasList.vencimento,
            replicar: despesasList.replicar || false,
            meses: [
                {
                    status: despesasList?.status || '2',
                    valor: despesasList?.valor || '0.00',
                    descricao: despesasList?.descricao || '',  
                    vencimento: despesasList?.vencimento || undefined,
                    ano: despesasList?.ano || 0,
                    despesaId: despesasList?.despesaId || '',
                    observacao: despesasList?.observacao || '',
                }
            ],
            costumerId: {
                id: despesasList?.costumerId?.id || ''
            },
            
        }

        return despesa
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
            meses: despesasList.recorrente == '1' ? this.criarDespesa.criarMeses(despesasList) : this.criarDespesa.criarMes(despesasList),
            costumerId: {
                id: despesasList?.costumerId?.id || ''
            },
            
        }

        return despesa
    }

    buildDespesaToSave(despesasList: IDespesasModel): IDespesasModel | IDespesas {        
        if (despesasList.replicar) {
            const despesas = this.buildMultiDespesas(despesasList)

            return despesas
        } else {
            const despesa = this.buildSingleDespesa(despesasList)

            return despesa
        }
    }
}