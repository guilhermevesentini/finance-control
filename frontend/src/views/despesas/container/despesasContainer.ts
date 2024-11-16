
import { ContainerModule } from "inversify";
import DespesasGatewayAdapters from "../services/adapters/DespesasGateway";
import { DespesasGatewayDi, type IDespesasGateway } from "../services/ports/DespesasGateway";
import DespesaHandler, { DespesaDi, type IDespesaHandler } from "../handlers/DespesaHandler";
import type { ICriarDespesaHandler } from "../handlers/criar/criarDespesaHandler";
import criarDespesaHandler, { criarDespesaHandlerDi } from "../handlers/criar/criarDespesaHandler";
import criarMesDespesaHandler, { criarMesDespesaHandlerDi, type ICriarMesDespesaHandler } from "../handlers/criar/criarMesDespesaHandler";
import criarMesesDespesaHandler, { criarMesesDespesaHandlerDi, type ICriarMesesDespesaHandler } from "../handlers/criar/criarMesesDespesaHandler";
import criarDespesaUseCase, { criarDespesaUseCaseDi, type ICriarDespesaUseCase } from "../handlers/criar/criarDespesaUseCase";
import obterDespesasPorMes, { obterDespesasPorMesDi, type IObterDespesasPorMes } from "../handlers/obter/obterDespesasPorMes";
import editarDespesaHandler, { editarDespesaHandlerDi, type IEditarDespesaHandler } from "../handlers/editar/editarDespesaHandler";
import DespesaFactory, { DespesaFactoryDi, type IDespesaFactory } from "../views/lista/DespesaFactory";


export const despesasContainer = new ContainerModule((bind) => {
    bind<IDespesasGateway>(DespesasGatewayDi).to(DespesasGatewayAdapters)
    bind<IDespesaHandler>(DespesaDi).to(DespesaHandler)
    //bind<IAdicionarDespesaHandler>(AdicionarDespesaHandlerDi).to(AdicionarDespesaHandler)

    bind<IObterDespesasPorMes>(obterDespesasPorMesDi).to(obterDespesasPorMes)

    bind<ICriarDespesaHandler>(criarDespesaHandlerDi).to(criarDespesaHandler)
    bind<ICriarMesDespesaHandler>(criarMesDespesaHandlerDi).to(criarMesDespesaHandler)
    bind<ICriarMesesDespesaHandler>(criarMesesDespesaHandlerDi).to(criarMesesDespesaHandler)
    
    bind<ICriarDespesaUseCase>(criarDespesaUseCaseDi).to(criarDespesaUseCase)

    bind<IEditarDespesaHandler>(editarDespesaHandlerDi).to(editarDespesaHandler)

    bind<IDespesaFactory>(DespesaFactoryDi).to(DespesaFactory)
})