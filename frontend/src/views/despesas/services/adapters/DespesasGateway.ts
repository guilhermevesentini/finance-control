import type { IDespesasGateway } from "../ports/DespesasGateway";
import type { IDespesas, IDespesasModel } from "../../types";
import { inject, injectable } from "inversify";
import { httpClientDI, type HttpClient, type IDefaultHttpResponse } from "@/api/types/httpClient";

@injectable()
export default class DespesasGatewayAdapters implements IDespesasGateway {
    @inject(httpClientDI) private readonly httpClient!: HttpClient

    async salvarDespesas(despesas: IDespesas, despesaId: string): Promise<boolean> {
        const response = await this.httpClient.put<boolean>({
            url: `http://localhost:3001/despesas`,
            data: despesas
        });

        if (response.status != 200) return false

        return true  
    }   

    async obterDespesaById(id: string): Promise<IDespesas | undefined> {
        const response = await this.httpClient.get<IDespesas>({
            url: `http://localhost:3001/despesas/${id}`
        });
        
        if(response.status != 200) return

        return response.body
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
    
    async excluirDespesa(params: IDespesasModel): Promise<boolean> {
        const despesaId = params.id;
        const mesId = params.despesaId;
    
        // Fazendo a requisição POST com o corpo contendo os parâmetros
        const response = await this.httpClient.post<boolean>({
            url: `http://localhost:3001/delete-despesa`,
            body: { despesaId: despesaId, mesId: mesId }
        });
    
        // Verificando se a resposta foi bem-sucedida
        if (response.status !== 200) {
            return false;
        }
    
        return true;
    }
    
    async obterDespesas(): Promise<IDefaultHttpResponse<IDespesas[]> | undefined> {
        const response = await this.httpClient.get<IDefaultHttpResponse<IDespesas[]> | undefined>({
            url: `http://localhost:3001/despesas`
        });

        if (response.status != 200) return

        return response.body
    }

}