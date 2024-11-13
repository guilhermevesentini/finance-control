<template>
  <i :class="'material-icons table-icon-status ' + name" :title="title" :style="'color: ' + color">
    {{ name }}
  </i>
</template>
<script lang="ts" setup>
interface IProps {
  name: string
  title: string
  color: string
}
defineProps<IProps>()
</script>
<style lang="scss">
.table-icon-status {
  font-size: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 4px;
}
</style>