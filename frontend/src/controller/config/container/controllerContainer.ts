import ObterDespesaPorUsuario, { ObterDespesaPorUsuarioDi, type IObterDespesaPorUsuario } from "@/controller/Despesas/handlers/obter/usuarios/ObterDespesaPorUsuario";
import { ContainerModule } from "inversify";


export const controllerContainer = new ContainerModule((bind) => {
    bind<IObterDespesaPorUsuario>(ObterDespesaPorUsuarioDi).to(ObterDespesaPorUsuario)
})
