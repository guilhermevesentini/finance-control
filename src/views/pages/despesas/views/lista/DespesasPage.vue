<template>
  <el-row>
    <el-col :span="20">
      <el-row class="container_page" v-loading="loading">
        <el-col :span="24" style="margin: 0.5rem 0 1rem;">
          <el-row class="row-bg" justify="space-between">
            <el-col :span="8">
              <BreadCrumb name="Despesas" />
            </el-col>
            <el-col span="auto" style="margin: 0; padding: 0; display: flex; align-items: center;">
              <DatePeriodoPicker v-on:update:month-change="handlePeriodo" />
            </el-col>
            <el-col :span="8" style="display: flex;flex-wrap: wrap; justify-content: flex-end;">
              <FCButtonIcon type="primary" circle v-on:handle-click="adicionarDespesa" :icon="Plus" />
            </el-col>
          </el-row>
        </el-col>
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
              <el-table-column label="Vencimento" prop="vencimento" width="150" sortable>
                <template v-slot="scope">
                  {{ formatDate(scope.row.vencimento) }}
                </template>
              </el-table-column>
            </template>
          </TableFilterableFrame>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="4">
      <ResumoLateral v-loading="loading" label="Total despesas" :totalDeDespesas="totalDeDespesas"
        :totalPago="totalPago" :totalPendente="totalPendente" />
    </el-col>
  </el-row>

  <AdicionarDespesasWidget v-model="showDrawerAdicionar" v-on:handle-fechar="handleFecharDrawer" />
  <EditarDespesasWidget v-model="showDrawerEditar" v-if="showDrawerEditar" v-on:handle-fechar="handleFecharDrawer"
    :despesa="Despesa" />
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, onUnmounted } from "vue";
import { DespesaInitialState, type IDespesas, type IDespesasModel } from "../../types";
import useFinanceHandler from "../../composables/useFinanceHandler";
import { DespesaControllerDi, type IDespesaController } from "../../controller/DespesaController";
import { formatCurrency, formatDate } from "@/utils/utils";
import BreadCrumb from "@/components/shared/BreadCrumb.vue";
import DatePeriodoPicker from "@/components/shared/DatePeriodoPicker.vue";
import TableFilterableFrame from "@/components/shared/TableFilterableFrame.vue";
import IconInsideTable from "./../../components/IconInsideTable.vue";
import { container } from "@/inversify.config";
import { DespesasGatewayDi, type IDespesasGateway } from "../../services/ports/DespesasGateway";
import {
  Plus
} from '@element-plus/icons-vue';
import FCButtonIcon from "@/components/buttons/Criar/FCButtonIcon.vue";
import { despesasContainer } from "../../container/despesasContainer";
import { despesasControllerContainer } from "../../controller/container/despesaControllerContainer";
import AdicionarDespesasWidget from "../../widgets/adicionar/AdicionarDespesasWidget.vue";
import EditarDespesasWidget from "../../widgets/editar/EditarDespesasWidget.vue";
import ResumoLateral from "@/components/shared/ResumoLateral.vue";

container.load(despesasContainer)
container.load(despesasControllerContainer)

const loading = ref(false);
const showDrawerAdicionar = ref(false);
const showDrawerEditar = ref(false);

const Despesa = ref<IDespesasModel>(DespesaInitialState);

const despesaController = container.get<IDespesaController>(DespesaControllerDi);

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
    if (despesa.status == '1') {
      return despesa
    }
  })

  return financeHandler.obterTotal(findDespesasPagas)
})

const totalPendente = computed(() => {
  const despesas = perPeriodlistaDeDespesas.value;

  const findDespesasPagas = despesas.filter(despesa => {
    if (despesa.status == '2') {
      return despesa
    }
  })

  return financeHandler.obterTotal(findDespesasPagas)
})

const adicionarDespesa = () => {
  showDrawerAdicionar.value = true;
}

const editarDespesa = ((produto: unknown) => {
  Despesa.value = DespesaInitialState

  if (produto) {
    Despesa.value = produto as IDespesasModel
    showDrawerEditar.value = true;
  }
})

const handleFecharDrawer = (async () => {
  showDrawerAdicionar.value = false;
  showDrawerEditar.value = false;

  await obterDespesas()
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
  container.unload(despesasControllerContainer)
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