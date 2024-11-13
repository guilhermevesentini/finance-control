
import { ContainerModule } from "inversify";
import ObterDespesaPorUsuario, { ObterDespesaPorUsuarioDi, type IObterDespesaPorUsuario } from "../handlers/obter/usuarios/ObterDespesaPorUsuario";

export const despesascontrollerContainer = new ContainerModule((bind) => {
    bind<IObterDespesaPorUsuario>(ObterDespesaPorUsuarioDi).to(ObterDespesaPorUsuario)
})