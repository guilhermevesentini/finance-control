
import { ContainerModule } from "inversify";
import DespesaController, { DespesaControllerDi, type IDespesaController } from "../DespesaController";
import AdicionarDespesaController, { AdicionarDespesaControllerDi, type IAdicionarDespesaController } from "../AdiconarDespesaController";

export const despesasControllerContainer = new ContainerModule((bind) => {
    bind<IDespesaController>(DespesaControllerDi).to(DespesaController)
    bind<IAdicionarDespesaController>(AdicionarDespesaControllerDi).to(AdicionarDespesaController)
})