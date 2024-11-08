import type { IDespesasGateway } from "../ports/DespesasGateway";
import type { IDespesas, IDespesasModel } from "../../types";
import { inject, injectable } from "inversify";
import { httpClientDI, type HttpClient } from "@/services/httpClient";

@injectable()
export default class DespesasGatewayAdapters implements IDespesasGateway {
    @inject(httpClientDI) private readonly httpClient!: HttpClient

    async salvarDespesa(despesa: IDespesasModel, despesaId: string): Promise<boolean> {
        const response = await this.httpClient.put<boolean>({
            url: `http://localhost:3001/despesas/${despesa.id}/${despesaId}`,
            data: despesa 
        });

        if (response.status != 200) return false

        return true  
    } 

    async salvarDespesas(despesa: IDespesas): Promise<boolean> {
        const response = await this.httpClient.put<boolean>({
            url: `http://localhost:3001/despesas/${despesa.id}`,
            data: despesa 
        });

        if (response.status != 200) return false

        return true  
    }   

    async obterDespesaById(id: string): Promise<IDespesas | undefined> {
        const response = await this.httpClient.get<IDespesas>({
            url: `http://localhost:3001/despesas/${id}`
        });
        
        if(response.status != 200) return

        return response.data
    }

    async criarDespesa(despesa: IDespesas): Promise<boolean> {
        console.log('criarDespesa', despesa);
        
        const response = await this.httpClient.post<boolean>({
            url: `http://localhost:3001/despesas`,
            body: despesa
        });

        if (response.status != 200) return false

        return true
    }
    async excluirDespesa(id: string): Promise<boolean> {
        const response = await this.httpClient.delete<boolean>({
            url: `http://localhost:3001/despesas/${id}`
        });

        if (response.status != 200) return false

        return true
    }
    async obterDespesas(): Promise<IDespesas[] | undefined> {
        const response = await this.httpClient.get<IDespesas[]>({
            url: `http://localhost:3001/despesas`
        });

        if (response.status != 200) return

        return response.data
    }

}