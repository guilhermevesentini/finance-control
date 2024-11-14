import { httpClientDI, HttpStatusCode, type HttpClient, type IDefaultHttpResponse, type IHttpResponse } from "@/api/types/httpClient";
import type { ILoginPageGateway } from "./ILoginPageHttpRequest";
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import type { IResponseLoginValidation, IRuleLoginForm } from "../../types";

@injectable()
export default class LoginPageHttpRequest implements ILoginPageGateway {
    @inject(httpClientDI) private readonly httpClient!: HttpClient

    async cadastrarNovoUsuario(params: IRuleLoginForm): Promise<boolean | null> {
        const response = await this.httpClient.post<boolean>({
            url: "http://localhost:3001/users",
            body: params,
            headers: { "Content-Type": "application/json" }
        });

        if (!response.status) return false
        
        return true
    }

    async validarUsuario(params: IRuleLoginForm): Promise<IDefaultHttpResponse<string | undefined> | undefined> {

        const response = await this.httpClient.post<IDefaultHttpResponse<string | undefined> | undefined>({
            url: `http://localhost:3001/user/login`,
            body: params
        });

        if (response.status != HttpStatusCode.success) return 
        
        return response.body
    }

    async obterUsuario(usuario: string): Promise<IDefaultHttpResponse<IResponseLoginValidation> | undefined> {
        const response = await this.httpClient.get<IDefaultHttpResponse<IResponseLoginValidation>>({
            url: `http://localhost:3001/user/${usuario}`
        });
        
        if (response.status != HttpStatusCode.success) return 

        return response.body
    }
}