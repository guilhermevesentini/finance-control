import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import type { DeleteHttpClientParams, GetHttpClientParams, HttpClient, IHttpResponse, PatchHttpClientParams, PostHttpClientParams, PutHttpClientParams } from "../types/httpClient";

// Função para obter o token de autenticação
function getAuthToken(): string | null {
    return localStorage.getItem("token");
}

// Configuração do interceptor para adicionar o token de autorização em todas as requisições
axios.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    // Tratar erros de requisição
    return Promise.reject(error);
});

@injectable()
export class AxiosHttpClientAdapter implements HttpClient {

    async get<T>(params: GetHttpClientParams): Promise<IHttpResponse<T>> {
        const response = await axios.get<T>(params.url, {
            params: params.queryParams,
        });

        return {
            status: response.status,
            body: response.data,
        };
    }

    async post<T>(params: PostHttpClientParams): Promise<IHttpResponse<T>> {
        const response = await axios.post<T>(params.url, params.body);

        return {
            status: response.status,
            body: response.data,
        };
    }

    async put<T>(params: PutHttpClientParams): Promise<IHttpResponse<T>> {
        const response = await axios.put<T>(params.url, params.data);

        return {
            status: response.status,
            body: response.data,
        };
    }

    async patch<T>(params: PatchHttpClientParams): Promise<IHttpResponse<T>> {
        const response = await axios.patch<T>(params.url, params.data);

        return {
            status: response.status,
            body: response.data,
        };
    }

    async delete<T>(params: DeleteHttpClientParams): Promise<IHttpResponse<T>> {
        const response = await axios.delete<T>(params.url, {
            params: params.queryParams,
        });

        return {
            status: response.status,
            body: response.data,
        };
    }
}
