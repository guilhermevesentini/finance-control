import { AxiosHttpClientAdapter } from "@/services/AxiosHttpClientAdapter"
import { httpClientDI, type HttpClient } from "@/services/httpClient"
import { ContainerModule } from "inversify"


export const axiosContainer = new ContainerModule((bind) => {
    bind<HttpClient>(httpClientDI).to(AxiosHttpClientAdapter)
})