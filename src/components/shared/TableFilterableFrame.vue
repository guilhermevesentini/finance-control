<template>
    <el-table :data="produtosFiltrados" style="width: 100%" empty-text="Sem Valores" v-loading="isLoading"
        :default-sort="{ prop: 'previsao', order: 'ascending' }">
        <slot name="tableCollumn"></slot>
        <el-table-column align="right" width="180">
            <template #header>
                <el-input v-model="filtroAtual" size="small" clearable placeholder="Digite aqui..."
                    :suffix-icon="Search" />
            </template>

            <template #default="scope">
                <el-button small title="editar" :icon="Edit" link @click="handleEditar(scope.row)" />
                <el-button small type="danger" title="Deletar" :icon="Delete" link
                    @click="handleDeletar(scope.row.id)" />
            </template>
        </el-table-column>
    </el-table>
    <el-col :span="12">
        <el-pagination v-model:current-page="currentPage" :page-size="itemsPerPage" layout="prev, pager, next"
            :total="produtos?.length" @current-change="handlePageChange" />
    </el-col>
</template>

<script lang="ts" setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { filtrarItems } from '@/utils/utils';
import { Search } from '@element-plus/icons-vue'
import { computed, ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
    produtos: unknown[];
    Loading?: boolean
}>();

export interface ICadastroItem {
    id: number | string;
    nome?: string;
    despesaId?: string
}

const isLoading = computed(() => props.Loading)

const filtroAtual = ref<string>('');
const currentPage = ref(1);
const itemsPerPage = ref(8);

const produtosFiltrados = computed(() => {
    return filtrarItems(props.produtos, filtroAtual, currentPage, itemsPerPage)
});

const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
};

const emits = defineEmits<{
    (event: "handleEditar", params: ICadastroItem): ICadastroItem;
    (event: "handleDeletar", id: string): string;
}>();


const handleEditar = (params: ICadastroItem) => {
    emits('handleEditar', params);
}
const handleDeletar = (id: string) => {
    emits('handleDeletar', id);
}
</script>