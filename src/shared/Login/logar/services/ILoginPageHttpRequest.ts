import type { IResponseLoginValidation, IRuleLoginForm } from "../../types";

export interface ILoginPageGateway {
  validarUsuario(params: IRuleLoginForm): Promise<IResponseLoginValidation[] | undefined>;
  cadastrarNovoUsuario(params: IRuleLoginForm): Promise<boolean | null>;
  obterUsuario(usuario: string): Promise<IResponseLoginValidation | undefined>
}

export const LoginPageGatewayDi = Symbol("LoginPageGatewayDi")