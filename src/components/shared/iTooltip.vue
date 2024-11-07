<template>
<el-tooltip
    class="box-item"
    effect="dark"
    :content="tooltip"
    placement="top-start"
    >
    <slot name="content"></slot>    
</el-tooltip>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
defineProps<{
  tooltip?: string
}>();
</script>