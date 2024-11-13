import type { IDespesas } from "@/views/despesas/types";

export interface IObterDespesasPorMes {
  obter(): Promise<IDespesas[]>
}


export default class ObterDespesasPorMes {

}