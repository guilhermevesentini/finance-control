<template>
  <el-row class="side-card">
    <h4>Relatório</h4>

    <h4></h4>

    <label>{{ label }}</label>
    <p>{{ total }}</p>
  </el-row>
</template>
<script lang="ts" setup>
interface IProps {
  label: string
  total: string
}

defineProps<IProps>()

</script>
<style lang="scss" scoped>
.side-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: nowrap;
  border-radius: 10x;
  border: 1px solid #a5d8f5;
  background-color: #fff;
  border-radius: 5px;
  margin: 0px 0px 10px 10px;

  label {
    font-size: 14px;
    font-weight: 700;
    background-color: #a5d8f5;
    padding: 5px;
    width: 100%;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    padding: 5px;
  }
}
</style>