import type { IResponseLoginValidation, IRuleLoginForm } from "../types";

export interface ILoginPageGateway {
  validarUsuario(params: IRuleLoginForm): Promise<IResponseLoginValidation[] | undefined>;
  cadastrarNovoUsuario(params: IRuleLoginForm): Promise<boolean | null>;
  obterSenha(usuario: string): Promise<string | undefined>
}

export const LoginPageGatewayDi = Symbol("LoginPageGatewayDi")