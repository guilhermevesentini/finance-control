import { ICriarDespesas, IDespesaMeses, IDespesas } from "../types";

export default class handleSalvarDespesa {
    private despesa: ICriarDespesas | undefined;

    constructor(){this.despesa = undefined}

    buildMeses(despesa: ICriarDespesas): IDespesaMeses {
        return {
            id: despesa.id,
            ano: new Date(despesa.vencimento).getFullYear(),
            descricao: despesa.descricao,
            nome: despesa.nome,
            status: despesa.status,
            valor: despesa.valor,
            vencimento: despesa.vencimento
        }
    }

    buildSingleDespesa(despesa: ICriarDespesas): IDespesas {
        const meses: IDespesaMeses[] = [];
    
        if (despesa.meses && despesa.meses.length > 0) {
            despesa.meses.forEach((mes, index) => {
                meses.push({
                    id: (index + 1).toString(),
                    ano: new Date(mes.vencimento).getFullYear(),
                    descricao: mes.descricao,
                    nome: despesa.nome,
                    status: mes.status,
                    valor: mes.valor,
                    vencimento: mes.vencimento
                });
            });
        } else {
            // Adicione um mês com base na entrada despesa
            meses.push(this.buildMeses(despesa));
        }
    
        return {
            id: despesa.id,
            userId: despesa.userId,
            frequencia: despesa.frequencia,
            recorrente: despesa.recorrente,
            meses: meses
        };
    }
    
    

    buildDespesa(despesa: ICriarDespesas){
        const isRecorrente = despesa.recorrente;

        if (isRecorrente == "Sim") {

            return
        }        
        const buildSingle = this.buildSingleDespesa(despesa);
        return buildSingle
    }
}