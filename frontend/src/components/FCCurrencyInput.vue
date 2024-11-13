<template>
  <div class="el-form-item__content" :class="{ 'has-error': hasError }">
    <div class="el-input">
      <div class="el-input__wrapper custom-input-wrapper">
        <money3 v-bind="{ ...$attrs, ...props, modelValue: internalValue }" @update:modelValue="handleUpdateValue"
          class="custom-money-input"></money3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Money3Component } from 'v-money3';
import { ref, watch } from 'vue';

// Definindo as propriedades
const props = withDefaults(defineProps<Partial<{
  masked: boolean,
  prefix: string,
  suffix: string,
  thousands: string,
  decimal: string,
  precision: number,
  disableNegative: boolean,
  disabled: boolean,
  min: string | number | undefined,
  max: string | number | undefined,
  allowBlank: boolean,
  minimumNumberOfCharacters: number,
  shouldRound: boolean,
  focusOnRight: boolean,
  modelValue: string | number,
  showOnRight: boolean,
  placeholder?: string,
  customPrefix?: string,
  customPrefixColor?: string
}>>(), {
  masked: false,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  decimal: ',',
  precision: 2,
  disableNegative: false,
  disabled: false,
  allowBlank: true,
  shouldRound: true,
  focusOnRight: true,
  modelValue: '',
  showOnRight: true,
  placeholder: 'R$ 0,00'
})

// Valor interno para o componente
const internalValue = ref(props.modelValue)

// Emite o valor para o `v-model`
const handleUpdateValue = (newValue: string | number) => {
  internalValue.value = newValue;
  // Emite o novo valor para o modelo
  emit('update:modelValue', newValue);
}

const hasError = (valor: number) => {
  if (valor <= 0) return true

  return false
}

const money3 = Money3Component

// Observa o valor do modelValue para manter o valor interno atualizado
watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue
})

</script>

<style lang="scss">
.custom-input-wrapper {
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 4px;
  font-size: 14px;
  background-color: #fff;
  width: 100%;
}

.custom-prefix {
  margin-right: 8px;
  font-weight: bold;
}


.has-error {
  .custom-money-input {
    box-shadow: 0 0 0 1px #ED1517 inset !important;
  }
}

.custom-money-input {
  border: none;
  outline: none;
  font-size: inherit;
  flex: 1;
  padding: 4px 8px;
  color: #606266;
}

.custom-money-input:disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

.custom-money-input::placeholder {
  color: #bfbfbf;
}
</style>
