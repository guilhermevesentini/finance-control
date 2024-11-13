import { container } from "@/inversify.config";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ObterDespesaPorUsuarioDi, type IObterDespesaPorUsuario } from "./ObterDespesaPorUsuario";
import { mockDespesas } from "./ObterDespesaPorUsuarioMock";
import { despesasContainer } from "@/views/despesas/container/despesasContainer";
import { flushPromises } from "@vue/test-utils";
import { httpClientDI, type HttpClient } from "@/api/types/httpClient";
import { DespesasGatewayDi, type IDespesasGateway } from "@/views/despesas/services/ports/DespesasGateway";


describe("ObterDespesaPorUsuario", () => {
  
  beforeEach(() => {
    container.load(despesasContainer)

    container.snapshot()
  })
  
  afterEach(() => {
    container.restore()
  })

  const rebindGateway = (gateway: Partial<IDespesasGateway>) => container.rebind<Partial<IDespesasGateway>>(DespesasGatewayDi).toConstantValue(gateway);
  
  it("Deve ObterDespesas", async () => {
    const mockHttpClient: Partial<HttpClient> = {
      get: vi.fn().mockResolvedValue({
        body: mockDespesas,
        status: 200
      })
    };

    container.rebind<HttpClient>(httpClientDI).toConstantValue(mockHttpClient as HttpClient);

    const obterController = container.get<IObterDespesaPorUsuario>(ObterDespesaPorUsuarioDi);

    rebindGateway({
      async obterDespesas() {
        return mockDespesas
      }
    }) 
    
    const response = await obterController.obter();
  
    await flushPromises()
    
    expect(response).not.toBeUndefined();
    expect(response).toHaveLength(2);

    const findDespesaId = response?.some((despesa) => mockDespesas[0].id)

    expect(findDespesaId).toBe(true);
  })
})