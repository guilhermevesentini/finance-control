<template>
    <el-form ref="formRef" :model="despesasDetails" :rules="rules" label-position="top" style="width: 100%">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-form-item label="Nome" prop="nome">
                    <el-input v-model="despesasDetails.nome" placeholder="Digite aqui" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Descrição" prop="descricao">
                    <el-input v-model="despesasDetails.descricao" placeholder="Digite aqui" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Valor" prop="valor">
                    <el-input v-model="despesasDetails.valor" :formatter="(value: string) => format(value, config)"
                        :parser="(value: string) => unformat(value, config)"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Recorrência" prop="recorrente">
                    <el-select v-model="despesasDetails.recorrente" :options="ESelectOptions"
                        placeholder="Selecione...">
                        <el-option v-for="item in ESelectOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Vencimento" prop="previsao">
                    <FCDataPicker v-model="despesasDetails.vencimento" />
                </el-form-item>
            </el-col>
            <el-col :span="6" v-if="despesasDetails.frequencia == '1'">
                <el-form-item label="Frequência" prop="frequencia">
                    <el-select v-model="despesasDetails.frequencia" :options="ESelectOptions"
                        placeholder="Selecione...">
                        <el-option v-for="item in ESelectOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Pago" prop="status">
                    <el-select v-model="despesasDetails.status" :options="ESelectOptions" placeholder="Selecione...">
                        <el-option v-for="item in ESelectOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Observação" prop="observacao">
                    <el-input v-model="despesasDetails.observacao" type="textarea" />
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-button @click="handleVoltar">Cancel</el-button>
                <el-button type="primary" @click="handleSalvar(formRef)">Salvar</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, reactive } from 'vue';
import { unformat, format } from 'v-money3'
import type { FormInstance, FormRules } from 'element-plus';
import type { IDespesasModel } from '../types';
import FCDataPicker from '@/components/shared/FCDataPicker.vue';

const formRef = ref<FormInstance>();

const props = defineProps<{
    produto: IDespesasModel
}>();

const config = {
    masked: false,
    precision: 2,
    decimal: ',',
    thousands: '.',
    prefix: 'R$ ',
    suffix: '',
};

// const despesasDetails = reactive<IDespesasModel>({
//     recorrente: props.produto.recorrente || '2',
//     status: props.produto.status || '2',
//     costumerId: {
//         id: props.produto.costumerId.id || ''
//     },
//     descricao: props.produto.descricao || '',
//     despesaId: props.produto.despesaId || '',
//     frequencia: props.produto.frequencia || '1',
//     nome: props.produto.nome || '',
//     id: props.produto.id || '',
//     previsao: props.produto.previsao || '',
//     valor: props.produto.valor || 0,
//     observacao: props.produto.observacao || '',
//     vencimento: props.produto.vencimento || '',
//     ano: props.produto.ano
// });

const despesasDetails = reactive<IDespesasModel>(props.produto);

const ESelectOptions = [
    { label: 'Sim', value: '1' },
    { label: 'Não', value: '2' }
];

const emits = defineEmits<{
    (event: "clickSalvar", despesasDetails: IDespesasModel): void;
    (event: "clickVoltar"): void;
}>();

const rules = reactive<FormRules<IDespesasModel>>({
    nome: [{ required: true, message: '', trigger: 'blur' }],
    descricao: [{ required: true, message: '', trigger: 'blur' }],
    valor: [{ required: true, message: '', trigger: 'blur', min: 1 }],
    recorrente: [{ required: true, message: '', trigger: 'blur' }],
    vencimento: [{ required: true, message: '', trigger: 'blur' }],
    status: [{ required: true, message: '', trigger: 'blur' }]
});

const handleSalvar = async (formEl: FormInstance | undefined) => {
    if (!formEl?.validate()) return

    await formEl.validate((valid) => {
        if (valid) {
            emits("clickSalvar", despesasDetails);
        }
    });
}

const handleVoltar = () => {
    emits('clickVoltar');
}
</script>