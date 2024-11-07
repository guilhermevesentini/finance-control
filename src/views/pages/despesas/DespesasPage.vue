<template>
  <el-row>
    <el-col :span="20">
      <el-row class="container_page" v-loading="loading">
        <el-col :span="24" style="margin: 0.5rem 0;">
          <el-row class="row-bg" justify="space-between">
            <el-col :span="8">
              <BreadCrumb name="Despesas" />
            </el-col>
            <el-col span="auto" style="margin: 0; padding: 0; display: flex; align-items: center;">
              <DatePeriodoPicker v-on:update:month-change="handlePeriodo" />
            </el-col>
            <el-col :span="8" style="display: flex;flex-wrap: wrap; justify-content: flex-end;">
              <MenuSuperiorAcoes :btnCriarNovaDespesa="true" @clickCriarNovaDespesa="adicionarDespesa" />
            </el-col>
          </el-row>
        </el-col>
        <el-divider></el-divider>
        <el-col :span="24">
          <TableFilterableFrame v-on:handle-editar="editarDespesa" v-on:handle-deletar="deletarDespesa"
            :produtos="perPeriodlistaDeDespesas">
            <template #tableCollumn>
              <el-table-column label="" prop="status" width="50" sortable>
                <template v-slot="scope">
                  <IconInsideTable :name="financeHandler.defineStatus(scope.row.status).name"
                    :color="financeHandler.defineStatus(scope.row.status).color"
                    :title="financeHandler.defineStatus(scope.row.status).title" />
                </template>
              </el-table-column>
              <el-table-column label="Valor" prop="valor" width="150">
                <template v-slot="scope">
                  {{ formatCollumnNumber(scope.row) }}
                </template>
              </el-table-column>
              <el-table-column label="Nome" prop="nome" />
              <el-table-column label="Descrição" prop="descricao" />
              <el-table-column label="Vencimento" prop="vencimento" sortable>
                <template v-slot="scope">
                  {{ formatDate(scope.row.vencimento) }}
                </template>
              </el-table-column>
            </template>
          </TableFilterableFrame>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="4" v-loading="loading">
      <SideCardTotal label="Total despesas" :total="totalDeDespesas" />
      <SideCardTotal label="Total pago" :total="totalPago" />
      <SideCardTotal label="Total pendente" :total="totalPendente" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, onUnmounted } from "vue";
import type { IDespesas, IDespesasModel } from "./types";
import useFinanceHandler from "./composables/useFinanceHandler";
import DespesasGatewayAdapters from "./services/adapters/DespesasGateway";
import type { ICadastroItem } from "../cadastros/types";
import DespesaController from "./composables/DespesaController";
import { formatCurrency, formatDate } from "@/utils/utils";
import router from "@/router";
import BreadCrumb from "@/components/shared/BreadCrumb.vue";
import DatePeriodoPicker from "@/components/shared/DatePeriodoPicker.vue";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import TableFilterableFrame from "@/components/shared/TableFilterableFrame.vue";
import IconInsideTable from "./components/IconInsideTable.vue";
import SideCardTotal from "@/components/shared/SideCardTotal.vue";
import { container } from "@/inversify.config";
import { despesasContainer } from "./container/despesasContainer";
import { DespesasGatewayDi, type IDespesasGateway } from "./services/ports/DespesasGateway";

container.load(despesasContainer)

const loading = ref(false);
const despesaController = new DespesaController();

const listaDeDespesas = ref<IDespesas[]>([]);

const perPeriodlistaDeDespesas = ref<IDespesasModel[]>([]);

const financeHandler = useFinanceHandler();
const despesasGateway = container.get<IDespesasGateway>(DespesasGatewayDi);

const formatCollumnNumber = (row: IDespesasModel) => {
  const valor = row.valor;

  return formatCurrency(valor)
}
const totalDeDespesas = computed(() => {
  return financeHandler.obterTotal(perPeriodlistaDeDespesas?.value)
})

const totalPago = computed(() => {
  const findDespesasPagas = perPeriodlistaDeDespesas.value.filter(despesa => {
    if (despesa.status == 'Sim') {
      return despesa
    }
  })

  return financeHandler.obterTotal(findDespesasPagas)
})

const totalPendente = computed(() => {
  const despesas = perPeriodlistaDeDespesas.value;

  const findDespesasPagas = despesas.filter(despesa => {
    if (despesa.status == 'Não') {
      return despesa
    }
  })

  return financeHandler.obterTotal(findDespesasPagas)
})

const adicionarDespesa = () => {
  router.push('/Despesas/Adicionar_Despesa')
}

const editarDespesa = ((produto: ICadastroItem) => {
  router.push({ path: `/Despesas/Editar_Despesa/${produto.id}/${produto.despesaId}` });
})

const deletarDespesa = async (productId: string) => {
  try {
    loading.value = true

    const response = await despesasGateway.excluirDespesa(productId);

    if (!response) return

    obterDespesas();

  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false
  }
}

const obterDespesas = async () => {
  try {
    loading.value = true

    const response = await despesasGateway.obterDespesas();

    if (!response) return

    listaDeDespesas.value = response;

  } catch (err) {
    console.log(err);
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
}

const handlePeriodo = (month: number) => {
  return perPeriodlistaDeDespesas.value = despesaController.buildDespesasByMonth(listaDeDespesas.value, month)
}

onMounted(() => {
  obterDespesas();
})

onUnmounted(() => {
  container.unload(despesasContainer)
})
</script>

<style lang="scss" scoped>
.container_page {
  background-color: #fff;
  padding: 10px;
  height: auto;
  overflow: hidden;
  border-radius: 5px;
  max-height: calc(100vh - 40px);
}

.table-icon-status {
  font-size: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 4px;
}
</style>