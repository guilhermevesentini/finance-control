import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata"
import type { DeleteHttpClientParams, GetHttpClientParams, HttpClient, IHttpResponse, PatchHttpClientParams, PostHttpClientParams, PutHttpClientParams } from "../types/httpClient";

@injectable()
export class AxiosHttpClientAdapter implements HttpClient {
    async get<T>(params: GetHttpClientParams): Promise<IHttpResponse<T>> {
        const response = await axios.get(params.url, {
            params: params.queryParams
        })

        return {
            status: response.status,
            body: response.data,
          };
    }
    
    async post<T>(params: PostHttpClientParams): Promise<IHttpResponse<T>> {    
        const request = await axios.post(params.url, params.body);
        
        return {
            status: request.status,
            body: request.data,
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
        const response = await axios.delete(params.url, {
            params: params.queryParams
        })

        return {
            status: response.status,
            body: response.data,
        };
    }

}