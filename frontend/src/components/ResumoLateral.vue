<template>
  <div class="FC-Resumo">
    <div class="FC-Resumo_item">
      <h4>Total Despesas</h4>
      <span>{{ totalDeDespesas }}</span>
    </div>
    <div class="FC-Resumo_item">
      <h4>Total Pago</h4>
      <span>{{ totalPago }}</span>
    </div>
    <div class="FC-Resumo_item">
      <h4>Total Pendente</h4>
      <span>{{ totalPendente }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  totalDeDespesas: string
  totalPago: string
  totalPendente: string
}

defineProps<IProps>()

</script>

<style lang="scss">
.FC-Resumo {
  display: flex;
  flex-direction: column;
  margin: 0 0 0 5px;

  &_item {
    padding: 0.5rem 0.5rem;
    background-color: #fff;
    border-radius: 5px;
    margin: 3px;

    h4 {
      font-weight: 600;
    }
  }

  &_item:first-child {
    margin: 0 3px 3px 3px;
  }
}
</style>