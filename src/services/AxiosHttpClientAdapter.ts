import axios from "axios";
import { injectable } from "inversify";
import type { DeleteHttpClientParams, GetHttpClientParams, HttpClient, IHttpResponse, PostHttpClientParams } from "./httpClient";
import "reflect-metadata"

@injectable()
export class AxiosHttpClientAdapter implements HttpClient {
    async get<T>(params: GetHttpClientParams): Promise<IHttpResponse<T>> {
        const response = await axios.get(params.url, {
            params: params.queryParams
        })

        return response
    }
    async post<T>(params: PostHttpClientParams): Promise<IHttpResponse<T>> {
        const response = await axios.get(params.url, {
            params: params.body
        })

        return response
    }
    put<T>(params: unknown): Promise<IHttpResponse<T>> {
        console.log(params)
        throw new Error("Method not implemented.");
    }
    patch<T>(params: unknown): Promise<IHttpResponse<T>> {
        console.log(params)
        throw new Error("Method not implemented.");
    }
    async delete<T>(params: DeleteHttpClientParams): Promise<IHttpResponse<T>> {
        const response = await axios.delete(params.url, {
            params: params.queryParams
        })

        return response
    }

}