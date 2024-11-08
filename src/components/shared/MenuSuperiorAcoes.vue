<template>
  <slot name="button"></slot>
  <el-button plain v-if="props.btnVoltar" @click="HandleVoltar" :icon="TopLeft" round></el-button>
  <el-button plain v-if="props.btnLimpar" @click="HandleLimpar" :icon="Brush" round></el-button>
  <el-button type="primary" plain v-if="btnSalvar" @click="HandleSalvar" :icon="Plus" round></el-button>
  <el-button type="primary" plain v-if="btnCriar" @click="HandleCriar" :icon="Plus" round></el-button>

  <div v-for="(button, index) in Buttons" :key="index">
    <ITooltip :tooltip="button.title" placement="top">
      <template #content>
        <el-button v-if="button.condition" type="primary" plain @click="handleClick(button.clickHandler)"
          :icon="button.icon" round></el-button>
      </template>
    </ITooltip>
  </div>
</template>
<script lang="ts" setup>
import {
  Plus,
  TopLeft,
  Brush,
} from '@element-plus/icons-vue';
import type { ICadastroItem } from './TableFilterableFrame.vue';
import ITooltip from "./iTooltip.vue"
const props = defineProps({
  name: { type: String, default: "" },
  btnVoltar: { type: Boolean, default: false },
  btnLimpar: { type: Boolean, default: false },
  btnSalvar: { type: Boolean, default: false },
  btnCriar: { type: Boolean, default: false },
  btnCriarNovoEvento: { type: Boolean, default: false },
  btnCriarNovoProduto: { type: Boolean, default: false },
  btnCriarNovaReceita: { type: Boolean, default: false },
  btnCriarNovaDespesa: { type: Boolean, default: false },
  btnCriarNovaOrdem: { type: Boolean, default: false },
  btnCriarCadastro: { type: Boolean, default: false }
});

interface IEmits {
  (event: "clickVoltar"): void,
  (event: "clickLimpar"): void,
  (event: "clickSalvar"): void,
  (event: "clickCriar"): void,
  (event: "clickCriarNovoEvento"): ICadastroItem,
  (event: "clickCriarNovoProduto"): ICadastroItem,
  (event: "clickCriarNovaReceita"): ICadastroItem,
  (event: "clickCriarNovaDespesa"): ICadastroItem,
  (event: "clickCriarNovaOrdem"): ICadastroItem,
  (event: "clickCriarCadastro"): ICadastroItem,
  (event: "update:atualizarFiltro"): ICadastroItem
}

const emit = defineEmits<IEmits>();

const HandleVoltar = () => {
  emit('clickVoltar')
}
const HandleLimpar = () => {
  emit('clickLimpar')
}
const HandleSalvar = () => {
  emit('clickSalvar')
}
const HandleCriar = () => {
  emit('clickCriar')
}

const handleClick = (value: keyof IEmits) => {
  emit(value);
}

const Buttons = [
  { condition: props.btnCriarNovoEvento, clickHandler: 'clickCriarNovoEvento' as keyof IEmits, icon: Plus, title: 'Adicionar', showTitle: false },
  { condition: props.btnCriarNovoProduto, clickHandler: 'clickCriarNovoProduto' as keyof IEmits, icon: Plus, title: 'Adicionar', showTitle: false },
  { condition: props.btnCriarNovaReceita, clickHandler: 'clickCriarNovaReceita' as keyof IEmits, icon: Plus, title: 'Adicionar', showTitle: false },
  { condition: props.btnCriarNovaDespesa, clickHandler: 'clickCriarNovaDespesa' as keyof IEmits, icon: Plus, title: 'Adicionar', showTitle: false },
  { condition: props.btnCriarNovaOrdem, clickHandler: 'clickCriarNovaOrdem' as keyof IEmits, icon: Plus, title: 'Adicionar', showTitle: false },
  { condition: props.btnCriarCadastro, clickHandler: 'clickCriarCadastro' as keyof IEmits, icon: Plus, title: 'Adicionar', showTitle: false }
];

</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>