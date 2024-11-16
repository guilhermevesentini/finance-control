import type { IDespesas, IDespesasModel } from "../../types";

export const DespesaFactoryDi = Symbol("DespesaFactoryDi");

export interface IDespesaFactory {
  create(despesas: IDespesas[]): IDespesasModel[] | undefined;
}

export default class DespesaFactory implements IDespesaFactory {
  create(despesas: IDespesas[]): IDespesasModel[] | undefined {
    if (!despesas || despesas.length === 0) return [];

    const despesasDoMes = despesas.flatMap((despesa) => 
      despesa.meses?.map((mes) => ({
        mes: mes.mes ?? 0,
        status: mes.status ?? '2',
        valor: mes.valor ?? '0.00',
        nome: despesa.nome ?? '',
        descricao: mes.descricao ?? '',
        vencimento: mes.vencimento,
        recorrente: despesa.recorrente ?? '1',
        frequencia: despesa.frequencia,
        ano: mes.ano ?? 0,
        replicar: despesa.replicar ?? false,
        despesaId: mes.despesaId ?? '',
        observacao: mes.observacao ?? '',
        customerId: despesa.customerId,
        id: despesa.id ?? '',
      })) || []
    );

    console.log('despesasDoMes', despesasDoMes);

    return despesasDoMes.length ? despesasDoMes : [];
  }
}
