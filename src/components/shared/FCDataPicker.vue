<template>
  <el-date-picker v-model="internalValue" v-bind="$attrs" :format="format" :type="type" :label="label"
    :placeholder="placeholder" style="width: 100%" />
</template>

<script setup lang="ts">
import { EDateFormat } from '@/@types/dateTypes';
import { ref, watch, withDefaults } from 'vue';

interface IProps {
  format?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  modelValue: string;
}

const props = withDefaults(defineProps<IProps>(), {
  format: EDateFormat.day,
  type: 'date',
  label: 'Selecione a data',
  placeholder: 'Selecione a data',
});

const internalValue = ref(props.modelValue);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<style lang="scss" scoped></style>
