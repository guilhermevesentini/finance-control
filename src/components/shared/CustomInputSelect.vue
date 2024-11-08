<template>
  <div>
    <el-select v-model="selectedValue" placeholder="Selecione...">
      <el-option v-for="option in categoriasList" :value="option.nome" :key="option._id">{{ option.nome }}</el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import type { ICategorias } from "@/@types/types";
import { ref, watch, reactive, watchEffect } from "vue";

let categoriasList: ICategorias[] = reactive([]);

const buscarCategorias = async (data: unknown) => {
  try {
    const response = await fetch(`http://localhost:3001/${data}`);
    if (response.ok) {
      const data = await response.json();
      categoriasList.length = 0;
      categoriasList.push(...data);
    } else {
      console.error("Erro ao buscar categorias");
    }
  } catch (error) {
    console.error("Erro ao buscar categorias", error);
  }
};

interface IProps {
  label: string
  placeholder: string
  options: ICategorias[]
  valueKey: string
  textKey: string
  modelValue: string | number
  data: string
}
const props = defineProps<IProps>();

const selectedValue = ref(props.modelValue);
const endPointName = ref(props.data);

const emit = defineEmits<{
  (event: "update:modelValue", value: string | undefined): void;
}>();

watch(selectedValue, (newValue) => {
  emit("update:modelValue", newValue as string);
});

watchEffect(() => {
  buscarCategorias(endPointName.value);
  if (props.modelValue) {
    selectedValue.value = props.modelValue
  }
});
</script>
