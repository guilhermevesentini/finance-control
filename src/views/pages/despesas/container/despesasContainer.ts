
import { ContainerModule } from "inversify";
import { DespesasGatewayDi, type IDespesasGateway } from "../services/ports/DespesasGateway";
import DespesasGatewayAdapters from "../services/adapters/DespesasGateway";


export const despesasContainer = new ContainerModule((bind) => {
    bind<IDespesasGateway>(DespesasGatewayDi).to(DespesasGatewayAdapters)
})