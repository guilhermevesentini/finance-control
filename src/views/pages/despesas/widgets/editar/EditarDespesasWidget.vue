<template>
  <FCDrawer title="Editar despesas">
    <template #body>
      <el-form ref="formRef" :model="despesa" :rules="rules" label-position="top" style="width: 100%">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="Nome" prop="nome">
              <el-input v-model="despesa.nome" placeholder="Digite aqui" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Descrição" prop="descricao">
              <el-input v-model="despesa.descricao" placeholder="Digite aqui" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Valor" prop="valor">
              <el-input v-model="despesa.valor" :formatter="(value: string) => format(value, config)"
                :parser="(value: string) => unformat(value, config)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Recorrência" prop="recorrente">
              <el-select v-model="despesa.recorrente" :options="ESelectOptions" placeholder="Selecione...">
                <el-option v-for="item in ESelectOptions" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Vencimento" prop="vencimento">
              <el-date-picker v-model="despesa.vencimento" format="DD/MM/YYYY" type="date" style="width: 100%"
                placeholder="Selecione a data" />
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="despesa.recorrente == '1'">
            <el-form-item label="Frequência" prop="frequencia">
              <el-select v-model="despesa.frequencia" placeholder="Selecione...">
                <el-option v-for="item in EFrequenciaOptions" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="despesa.recorrente == '1'">
            <el-form-item label="Frequência" prop="frequencia">
              <el-select v-model="despesa.frequencia" placeholder="Selecione...">
                <el-option v-for="item in EFrequenciaOptions" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="replicar">
              <el-checkbox v-model="despesa.replicar" label="Replicar alteração para outros meses?" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Observação" prop="observacao">
              <el-input v-model="despesa.observacao" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template #FLeft>
      <el-button @click="Voltar">Cancel</el-button>
    </template>
    <template #FRight>
      <el-button type="primary" @click="handleSalvar(formRef)">Salvar</el-button>
    </template>
  </FCDrawer>
</template>

<script setup lang="ts">
import FCDrawer from '@/components/shared/FCDrawer.vue';
import { DespesaInitialState, type IDespesas, type IDespesasModel } from '../../types';
import { onMounted, reactive, ref } from 'vue';
import { DespesasGatewayDi, type IDespesasGateway } from '../../services/ports/DespesasGateway';
import { container } from '@/inversify.config';
import { AdicionarDespesaControllerDi, type IAdicionarDespesaController } from '../../controller/AdiconarDespesaController';
import { ElNotification, type FormInstance, type FormRules } from 'element-plus';
import router from '@/router';
import { unformat, format } from 'v-money3';
import { DespesaControllerDi, type IDespesaController } from '../../controller/DespesaController';

interface IProps {
  despesa: IDespesasModel
}

const props = defineProps<IProps>()

const formRef = ref<FormInstance>();

const despesa = ref<IDespesasModel>(props.despesa || DespesaInitialState);

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

const despesasGateway = container.get<IDespesasGateway>(DespesasGatewayDi);
const adicionarDespesaController = container.get<IAdicionarDespesaController>(AdicionarDespesaControllerDi);
const despesaController = container.get<IDespesaController>(DespesaControllerDi);

const rules = reactive<FormRules<IDespesasModel>>({
  nome: [{ required: true, message: '', trigger: 'blur' }],
  valor: [{ required: true, message: '', trigger: 'blur', min: 0 }],
  recorrente: [{ required: true, message: '', trigger: 'blur' }],
  vencimento: [{ required: true, message: '', trigger: 'blur' }],
  status: [{ required: true, message: '', trigger: 'blur' }]
});

const emits = defineEmits<{
  (event: "handleFechar"): void;
}>();

const salvarDespesas = async (novaDespesa: IDespesas) => {
  const response = despesasGateway.salvarDespesa(novaDespesa);

  if (!response) return

  ElNotification({
    title: 'success',
    message: 'Despesa criada com sucesso.',
    type: 'success',
    duration: 2000
  })
}

const Salvar = (async () => {
  const buildEmpresa = despesaController.buildDespesaToSave(despesa.value)

  const response = await despesasGateway.salvarDespesa(buildEmpresa as IDespesas);

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

  Voltar()
})

const handleSalvar = async (formEl: FormInstance | undefined) => {
  if (!formEl?.validate()) return

  await formEl.validate(async (valid) => {
    if (valid) {
      await Salvar()
    }
  });
}

const Voltar = (() => {
  router.push('/Despesas/lista')
  emits('handleFechar');
});

onMounted(() => {
  despesa.value = props.despesa
})
</script>

<style lang="scss" scoped></style>