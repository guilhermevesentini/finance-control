<template>
    <el-row class="container_page">
        <el-col :span="24">
            <el-row class="row-bg" justify="space-between">
                <el-col :span="10">
                    <BreadCrumb name="Editar Despesa" />
                </el-col>
                <el-col :span="4">
                </el-col>
                <el-col :span="10" style="display: flex;flex-wrap: wrap; justify-content: flex-end;">
                    <MenuSuperiorAcoes :btnVoltar="true" @clickVoltar="Voltar" @clickLimpar="Limpar" />
                </el-col>
            </el-row>
        </el-col>
        <el-divider></el-divider>
        <el-col :span="24">
            <FormDespesas :produto="despesaModel" @click-salvar="Salvar" @click-voltar="Voltar"></FormDespesas>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/runtime-core"
import router from "@/router";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import { onMounted } from "vue";
import { ElNotification } from "element-plus";
import BreadCrumb from "@/components/shared/BreadCrumb.vue";
import { DespesaInitialState, type IDespesasModel } from "../../types";
import DespesasGatewayAdapters from "../../services/adapters/DespesasGateway";
import DespesaController from "../../composables/DespesaController";
import FormDespesas from "../../components/FormDespesas.vue";
import { DespesasGatewayDi, type IDespesasGateway } from "../../services/ports/DespesasGateway";
import { container } from "@/inversify.config";

const loading = ref(false);

const routerParams = {
    id: router.currentRoute.value?.params?.id,
    despesaId: router.currentRoute.value?.params?.despesaId
}
const despesaModel: IDespesasModel = reactive(DespesaInitialState);

const despesasGateway = container.get<IDespesasGateway>(DespesasGatewayDi);
const despesaController = new DespesaController();

const getProduto = (async (id: string) => {
    try {
        loading.value = true

        const response = await despesasGateway.obterDespesaById(id);

        if (!response) return

        const buildDespesa = despesaController.buildDespesa(response, routerParams.despesaId as string);

        Object.assign(despesaModel, buildDespesa);

        console.log(despesaModel);
    } catch (err) { console.log(err) } finally {
        loading.value = false
    }
})

const Limpar = (() => {
    despesaModel.id = ''
    despesaModel.nome = ''
    despesaModel.frequencia = ''
    despesaModel.descricao = ''
    despesaModel.costumerId.id = ''
    despesaModel.observacao = ''
    despesaModel.previsao = ''
    despesaModel.recorrente = ''
    despesaModel.status = ''
    despesaModel.valor = 0
    despesaModel.vencimento = ''
})

const Voltar = (() => {
    Limpar()
    router.push('/Despesas')
})

const Salvar = (async () => {
    const buildEmpresa = despesaController.buildDespesaToSave(despesaModel)

    const response = await despesasGateway.salvarDespesa(buildEmpresa);

    if (!response) return ElNotification({
        title: 'Error',
        message: 'Erro ao salvar suas alterações, tente novamente.',
        type: 'error',
        duration: 2000
    })

    ElNotification({
        title: 'success',
        message: 'Despesa foi salva com sucesso.',
        type: 'success',
        duration: 2000
    })

    router.push('/Despesas')
})

onMounted(() => {
    getProduto(routerParams.id as string);
    Limpar()
})
</script>

<style lang="scss" scoped>
.container_page {
    background-color: #fff;
    padding: 10px;
    height: auto;
    overflow: hidden;
    border-radius: 10px;
    max-height: calc(100vh - 40px);
}
</style>