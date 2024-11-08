import type { IGerarId } from "@/composables/useCriarRandomId";
import type { IDespesaMeses, IDespesas, IDespesasModel } from "../types";
import useGerarId from "@/composables/useCriarRandomId";
import { injectable } from "inversify";

export const AdicionarDespesaControllerDi = Symbol("AdicionarDespesaControllerDi")

const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

export interface IAdicionarDespesaController {
    criarMeses(despesa: IDespesasModel): IDespesaMeses[]
    criarMes(despesa: IDespesasModel): void
    criarDespesa(despesa: IDespesasModel): IDespesas
}

@injectable()
export default class AdicionarDespesaController implements IAdicionarDespesaController{
    private generateId: string;

    constructor() { this.generateId = ''}

    obterIdUsuario(): string | undefined {
        const storage = localStorage.getItem('user')

        if (!storage) return

        const usuarioId = JSON.parse(storage);

        return usuarioId._id
    }
    criarMeses(despesa: IDespesasModel): IDespesaMeses[] {
        const mesDespesa = new Date(despesa.vencimento as Date).getMonth();
        const max = 12;

        const ano = new Date(despesa.vencimento as Date).getFullYear();
        const dia = new Date(despesa.vencimento as Date).getDate()

        const meses: IDespesaMeses[] = [];

        for (let index = mesDespesa; index < max; index++) {
            meses.push({
                valor: despesa.valor || '0.00',
                ano: new Date(despesa.vencimento as Date).getFullYear(),
                status: despesa.status || '2',
                descricao:despesa.descricao || '',
                despesaId: useGerarId(config),
                vencimento: new Date(ano, index, dia),
                observacao: despesa.observacao
            });
            
        }

        return meses
    }

    criarMes(despesa: IDespesasModel) {
        return [{
            valor: despesa.valor || '0.00',
            ano: new Date(despesa.vencimento as Date).getFullYear(),
            status: despesa.status || '2',
            descricao:despesa.descricao || '',
            despesaId: useGerarId(config),
            vencimento: despesa.vencimento,
            observacao: despesa.observacao
        }]
    }

    criarDespesa(despesa: IDespesasModel): IDespesas {

        console.log('criarDespesa');
        
        const novaDespesa: IDespesas = {
            id: useGerarId(config),
            nome: despesa.nome,
            vencimento: despesa.vencimento,
            recorrente: despesa.recorrente,
            frequencia: despesa.frequencia,
            meses: despesa.recorrente == '1' ? this.criarMeses(despesa) : this.criarMes(despesa),            
            costumerId: {
                id: despesa.costumerId.id || this.obterIdUsuario() || ''
            }
        }

        return novaDespesa;
    }
}