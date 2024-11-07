
import { ContainerModule } from "inversify"
import { LoginPageGatewayDi, type ILoginPageGateway } from "../logar/services/ILoginPageHttpRequest"
import LoginPageHttpRequest from "../logar/services/LoginPageHttpRequest"


export const loginContainer = new ContainerModule((bind) => {
    bind<ILoginPageGateway>(LoginPageGatewayDi).to(LoginPageHttpRequest)
})