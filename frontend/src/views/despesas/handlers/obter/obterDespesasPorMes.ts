import { inject, injectable } from "inversify";
import type { IDespesas, IDespesasModel } from "../../types";
import { ObterDespesaPorUsuarioDi, type IObterDespesaPorUsuario } from "@/controller/Despesas/handlers/obter/usuarios/ObterDespesaPorUsuario";

export const obterDespesasPorMesDi = Symbol("obterDespesasPorMes")

export interface IObterDespesasPorMes {
  obter(despesasList: IDespesas[], periodo: number): Promise<IDespesasModel[]>
}

@injectable()
export default class obterDespesasPorMes implements IObterDespesasPorMes {
	@inject(ObterDespesaPorUsuarioDi) private readonly obterUsuario!: IObterDespesaPorUsuario

	async obter(despesasList: IDespesas[], periodo: number): Promise<IDespesasModel[]> {
		if (!despesasList) return []

		const anoAtual = new Date().getFullYear();
		
		const despesasDoMes: IDespesasModel[] = []
		

		if (despesasList && despesasList.length >= 1) {
			despesasList.map((despesa) => {
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
}