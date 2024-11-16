
export enum HttpStatusCode {
noContent = 204,
unathorized = 401,
success = 200,
error = 400,
accepted = 202,
}

type HttpClientParams = {
    url: string
    headers?: Record<string, string>
}

export type IDefaultResponseError = {
    error: string
}

export type IDefaultHttpResponse<T> = {
    result: T | null | undefined
    statusCode: HttpStatusCode
    error?: string;
}

export type IHttpResponse<T> = {
    status: HttpStatusCode;
    body?: T;
    headers?: Record<string, unknown>;    
};

export type PostHttpClientParams = HttpClientParams & {
    body: unknown
}

export type GetHttpClientParams = HttpClientParams & {
    queryParams?: unknown
}

export type PutHttpClientParams = HttpClientParams & {
    data?: unknown
}

export type PatchHttpClientParams = HttpClientParams & {
    data?: unknown
}

export type DeleteHttpClientParams = HttpClientParams & {
    queryParams?: unknown
    pathParams?: unknown
    data?: unknown
}

export interface HttpClient {
    get<T>(params: GetHttpClientParams): Promise<IHttpResponse<T>>
    post<T>(params: PostHttpClientParams): Promise<IHttpResponse<T>>
    put<T>(params: PutHttpClientParams): Promise<IHttpResponse<T>>
    patch<T>(params: PatchHttpClientParams): Promise<IHttpResponse<T>>
    delete<T>(params: DeleteHttpClientParams): Promise<IHttpResponse<T>>
}

export const httpClientDI = "httpClientDI"
