import { AxiosHttpClientAdapter } from "@/api/axios/AxiosHttpClientAdapter"
import { httpClientDI, type HttpClient } from "@/api/types/httpClient"
import { ContainerModule } from "inversify"


export const axiosContainer = new ContainerModule((bind) => {
    bind<HttpClient>(httpClientDI).to(AxiosHttpClientAdapter)
})