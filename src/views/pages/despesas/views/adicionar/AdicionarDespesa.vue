<template>
    <el-row class="container_page">
        <el-col :span="24">
            <el-row class="row-bg" justify="space-between">
                <el-col :span="10">
                    <BreadCrumb name="Nova Despesa" />
                </el-col>
                <el-col :span="4">
                </el-col>
                <el-col :span="10" style="display: flex;flex-wrap: wrap; justify-content: flex-end;">
                    <MenuSuperiorAcoes :btnVoltar="true" :btnLimpar="true" @clickVoltar="Voltar"
                        @clickLimpar="Limpar" />
                </el-col>
            </el-row>
        </el-col>
        <el-divider></el-divider>
        <el-col :span="24">
            <FormDespesas :produto="despesaDetails" @click-salvar="handleCriar" @click-voltar="Voltar"></FormDespesas>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive } from "@vue/runtime-core"
import router from "@/router";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import { ElNotification } from "element-plus";
import { onMounted } from "vue";
import BreadCrumb from "@/components/shared/BreadCrumb.vue";
import DespesasGatewayAdapters from "../../services/adapters/DespesasGateway";
import { DespesaInitialState, type IDespesasModel } from "../../types";
import AdicionarDespesaController from "../../composables/AdiconarDespesaController";
import FormDespesas from "../../components/FormDespesas.vue";
import { container } from "@/inversify.config";
import { DespesasGatewayDi, type IDespesasGateway } from "../../services/ports/DespesasGateway";

const despesaDetails: IDespesasModel = reactive(DespesaInitialState);
const despesasGateway = container.get<IDespesasGateway>(DespesasGatewayDi);

const adicionarDespesaController = new AdicionarDespesaController();

const handleCriar = async (despesa: IDespesasModel) => {
    const novaDespesa = adicionarDespesaController.criarDespesa(despesa);

    if (novaDespesa) {
        const response = await despesasGateway.criarDespesa(novaDespesa);

        if (!response) return

        ElNotification({
            title: 'success',
            message: 'Despesa criada com sucesso.',
            type: 'success',
            duration: 2000
        })

        Voltar()
    }
}

const Limpar = (() => {
    despesaDetails.id = ''
    despesaDetails.nome = ''
    despesaDetails.frequencia = ''
    despesaDetails.descricao = ''
    despesaDetails.costumerId.id = ''
    despesaDetails.observacao = ''
    despesaDetails.previsao = ''
    despesaDetails.recorrente = ''
    despesaDetails.status = ''
    despesaDetails.valor = 0
    despesaDetails.vencimento = ''
})

const Voltar = (() => {
    Limpar()
    router.push('/Despesas')
});

onMounted(() => {
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