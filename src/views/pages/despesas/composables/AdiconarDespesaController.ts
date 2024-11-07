import type { IGerarId } from "@/composables/useCriarRandomId";
import type { IDespesaMeses, IDespesas, IDespesasModel } from "../types";
import useGerarId from "@/composables/useCriarRandomId";


const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

export default class AdicionarDespesaController {
    private generateId: string;

    constructor() { this.generateId = ''}

    criarMeses(despesa: IDespesasModel): IDespesaMeses[] {
        const mesDespesa = new Date(despesa.vencimento).getMonth();
        const max = 12;

        const ano = new Date(despesa.vencimento).getFullYear();
        const dia = new Date(despesa.vencimento).getDate()

        const meses: IDespesaMeses[] = [];

        for (let index = mesDespesa; index < max; index++) {
            meses.push({
                valor: Number(despesa.valor || 0),
                ano: new Date(despesa.vencimento).getFullYear(),
                status: despesa.status || 'Não',
                descricao:despesa.descricao || '',
                despesaId: useGerarId(config),
                vencimento: new Date(ano, index, dia).toISOString(),
                observacao: despesa.observacao
            });
            
        }

        return meses
    }

    criarMes(despesa: IDespesasModel) {
        return [{
            valor: Number(despesa.valor || 0),
            ano: new Date(despesa.vencimento).getFullYear(),
            status: despesa.status || 'Não',
            descricao:despesa.descricao || '',
            despesaId: useGerarId(config),
            vencimento: despesa.vencimento,
            observacao: despesa.observacao
        }]
    }

    criarDespesa(despesa: IDespesasModel): IDespesas {
        const novaDespesa: IDespesas = {
            id: useGerarId(config),
            nome: despesa.nome,
            previsao: despesa.previsao,
            recorrente: despesa.recorrente,
            frequencia: despesa.frequencia,
            meses: despesa.recorrente == '2' ? this.criarMeses(despesa) : this.criarMes(despesa),            
            costumerId: {
                id: despesa.costumerId.id
            }
        }

        return novaDespesa;
    }
}