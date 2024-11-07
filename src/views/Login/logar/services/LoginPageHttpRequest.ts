import { httpClientDI, HttpStatusCode, type HttpClient, type IHttpResponse } from "@/services/httpClient";
import type { IResponseLoginValidation, IRuleLoginForm } from "../types";
import type { ILoginPageGateway } from "./ILoginPageHttpRequest";
import { inject, injectable } from "inversify";
import 'reflect-metadata';

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

    async validarUsuario(params: IRuleLoginForm): Promise<IResponseLoginValidation[] | undefined> {

        const response = await this.httpClient.get<IResponseLoginValidation[]>({
            url: `http://localhost:3001/users?username=${params.username}&password=${params.password}` 
        });

        if (response.status != HttpStatusCode.success || !response.data) return
        
        return response.data;
    }

    async obterSenha(usuario: string): Promise<string | undefined> {
        const response = await this.httpClient.get<string | undefined>({
            url: `http://localhost:3001/users?username=${usuario}`
        });
        
        if (!response.status || !response?.data) return

        return response?.data;
    }
}