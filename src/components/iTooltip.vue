<template>
  <el-tooltip class="box-item" effect="dark" :content="tooltip" placement="top-start">
    <slot name="content"></slot>
  </el-tooltip>
</template>
<script lang="ts" setup>
defineProps<{
  tooltip?: string
}>();
</script>