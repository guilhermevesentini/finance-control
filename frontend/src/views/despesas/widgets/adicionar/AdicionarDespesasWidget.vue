<template>
  <FCDrawer title="Adicionar despesas">
    <template #body>
      <el-form ref="formRef" :model="despesasDetails" :rules="rules" label-position="top" style="width: 100%">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="Nome" prop="nome">
              <el-input v-model="despesasDetails.nome" placeholder="Digite aqui" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Descrição" prop="descricao">
              <el-input v-model="despesasDetails.descricao" placeholder="Digite aqui" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Valor" prop="valor">
              <el-input v-model="despesasDetails.valor" :formatter="(value: string) => format(value, config)"
                :parser="(value: string) => unformat(value, config)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Recorrência" prop="recorrente">
              <el-select v-model="despesasDetails.recorrente" :options="ESelectOptions" placeholder="Selecione...">
                <el-option v-for="item in ESelectOptions" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Vencimento" prop="vencimento">
              <el-date-picker v-model="despesasDetails.vencimento" format="DD/MM/YYYY" type="date" style="width: 100%"
                placeholder="Selecione a data" />
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="despesasDetails.recorrente == '1'">
            <el-form-item label="Frequência" prop="frequencia">
              <el-select v-model="despesasDetails.frequencia" placeholder="Selecione...">
                <el-option v-for="item in EFrequenciaOptions" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
        </el-row>
      </el-form>
    </template>

    <template #FLeft>
      <el-button @click="Voltar">Cancel</el-button>
    </template>
    <template #FRight>
      <el-button type="primary" @click="handleCriar(formRef)">Salvar</el-button>
    </template>
  </FCDrawer>
</template>

<script setup lang="ts">
import FCDrawer from '@/components/FCDrawer.vue';
import { onMounted, reactive, ref } from 'vue';
import { DespesasGatewayDi, type IDespesasGateway } from '../../services/ports/DespesasGateway';
import { container } from '@/inversify.config';
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';
import router from '@/router';
import { unformat, format } from 'v-money3';
import { DespesaInitialState, type IDespesas, type IDespesasModel } from '../../types';
import { criarDespesaUseCaseDi, type ICriarDespesaUseCase } from '../../handlers/criar/criarDespesaUseCase';

const formRef = ref<FormInstance>();

const despesasDetails = reactive<IDespesasModel>({
  replicar: false,
  ano: 0,
  despesaId: '',
  id: '',
  nome: '',
  frequencia: '1',
  descricao: '',
  costumerId: {
    id: ''
  },
  observacao: '',
  recorrente: '2',
  status: '2',
  valor: '0.00',
  vencimento: new Date()
});

const config = {
  masked: false,
  precision: 2,
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  suffix: '',
};

const ESelectOptions = [
  { label: 'Sim', value: '1' },
  { label: 'Não', value: '2' }
];

const EFrequenciaOptions = [
  { label: 'Mensal', value: '1' },
  { label: 'Semanal', value: '2' },
  { label: 'Semestral', value: '3' },
];

const despesaDetails: IDespesasModel = reactive(DespesaInitialState);
const despesasGateway = container.get<IDespesasGateway>(DespesasGatewayDi);

const despesaUseCase = container.get<ICriarDespesaUseCase>(criarDespesaUseCaseDi);

const rules = reactive<FormRules<IDespesasModel>>({
  nome: [{ required: true, message: '', trigger: 'blur' }],
  valor: [{ required: true, message: '', trigger: 'blur', min: 1 }],
  recorrente: [{ required: true, message: '', trigger: 'blur' }],
  vencimento: [{ required: true, message: '', trigger: 'blur' }],
  status: [{ required: true, message: '', trigger: 'blur' }]
});

const emits = defineEmits<{
  (event: "handleFechar"): void;
}>();

const salvarDespesas = async (novaDespesa: IDespesas) => {
  const response = despesasGateway.criarDespesa(novaDespesa);

  if (!response) return

  ElNotification({
    title: 'success',
    message: 'Despesa criada com sucesso.',
    type: 'success',
    duration: 2000
  })
}

const handleCriar = async (formEl: FormInstance | undefined) => {
  if (!formEl?.validate()) return

  await formEl.validate(async (valid) => {
    if (valid) {
      const novaDespesa = despesaUseCase.handleDespesa(despesasDetails);

      if (novaDespesa) {

        await salvarDespesas(novaDespesa)


        Voltar()
      }
    }
  });


}

const Limpar = (() => {
  despesasDetails.id = ''
  despesaDetails.nome = ''
  despesaDetails.frequencia = '1'
  despesaDetails.descricao = ''
  despesaDetails.costumerId.id = ''
  despesaDetails.observacao = ''
  despesaDetails.recorrente = '2'
  despesaDetails.status = '2'
  despesaDetails.valor = '0.00'
  despesaDetails.vencimento = new Date()
})

const Voltar = (() => {
  Limpar()
  router.push('/Despesas/lista')
  emits('handleFechar');
});

onMounted(() => {
  Limpar()
})
</script>

<style lang="scss" scoped></style>