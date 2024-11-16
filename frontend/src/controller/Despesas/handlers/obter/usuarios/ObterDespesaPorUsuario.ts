import { httpClientDI, type HttpClient, type IHttpResponse } from "@/api/types/httpClient";
import type { IDespesas } from "@/views/despesas/types";
import { inject, injectable } from "inversify";

export const ObterDespesaPorUsuarioDi = Symbol("ObterDespesaPorUsuarioDi")

export type IObterDespesaPorUsuarioParams = {
  idUsuario: string
  idDespesas: string | string[] | undefined
}

export type IObterResponseHttp<T> = {
  data: T,
  status: number
}

export interface IObterDespesaPorUsuario {
  obter(): Promise<IDespesas[] | undefined>
}

@injectable()
export default class ObterDespesaPorUsuario implements IObterDespesaPorUsuario {
  constructor(
    @inject(httpClientDI)
    private readonly httpClient: HttpClient
  ) {}

  private obterUsuario() {
    const storage = localStorage.getItem('user')

    if (!storage) return []

    const usuarioId = JSON.parse(storage);

    return usuarioId
  }

  async obter():  Promise<IDespesas[] | undefined> {

    const idUsuario = await this.obterUsuario()    

    const response = await this.httpClient.get<IDespesas[] | undefined>({
      url: `http://localhost:3001/despesas?${idUsuario._id}`
    });    
      
    if (response.status != 200) return

    return response.body
  }
}