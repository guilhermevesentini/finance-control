import type { IDefaultHttpResponse, IHttpResponse } from "@/api/types/httpClient";
import type { IResponseLoginValidation, IRuleLoginForm } from "../../types";

export interface ILoginPageGateway {
  validarUsuario(params: IRuleLoginForm): Promise<IDefaultHttpResponse<string | undefined> | undefined>;
  cadastrarNovoUsuario(params: IRuleLoginForm): Promise<boolean | null>;
  obterUsuario(usuario: string): Promise<IDefaultHttpResponse<IResponseLoginValidation> | undefined>
}

export const LoginPageGatewayDi = Symbol("LoginPageGatewayDi")