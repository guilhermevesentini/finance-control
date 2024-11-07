import type { IDespesas, IDespesasModel } from "../types";


export default class DespesaController {
    private Despesas: IDespesasModel[];

    constructor() { this.Despesas = []}

    buildDespesasByMonth(despesasList: IDespesas[], periodo: number): IDespesasModel[] {
        const anoAtual = new Date().getFullYear();
        
        const despesasDoMes: IDespesasModel[] = []

        despesasList.map((despesa) => {
            if (despesa.meses) {
                despesa.meses.forEach((mes) => {
                    const date = new Date(mes.vencimento);
                    const month = date.getMonth();
    
                    if (mes.ano === anoAtual && month === periodo) {
                        despesasDoMes.push({
                            status: mes.status || 'Não',
                            valor: mes.valor || 0,
                            nome: despesa.nome || '',
                            descricao: mes.descricao || '',  
                            vencimento: mes.vencimento || '',
                            previsao: despesa.previsao || '',
                            recorrente: despesa.recorrente || '1',
                            frequencia: despesa.frequencia,
                            ano: mes.ano || 0,
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

        if (!despesasDoMes.length) return []

        return despesasDoMes;
    }

    buildDespesa(despesasList: IDespesas, despesaId: string): IDespesasModel {
        const findMes = despesasList.meses.find((mes) => mes.despesaId == despesaId);

        const despesa = {
            status: findMes?.status || 'Não',
            valor: findMes?.valor || 0,
            nome: despesasList.nome || '',
            descricao: findMes?.descricao || '',  
            vencimento: findMes?.vencimento || '',
            previsao: despesasList.previsao || '',
            recorrente: despesasList.recorrente || '1',
            frequencia: despesasList.frequencia,
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

    buildDespesaToSave(despesasList: IDespesasModel): IDespesas {
        const despesa = {
            id: despesasList.id || '',
            nome: despesasList.nome || '',
            previsao: despesasList.previsao || '',
            recorrente: despesasList.recorrente || '1',
            frequencia: despesasList.frequencia,
            meses: [
                {
                    status: despesasList?.status || 'Não',
                    valor: despesasList?.valor || 0,
                    descricao: despesasList?.descricao || '',  
                    vencimento: despesasList?.vencimento || '',
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
}