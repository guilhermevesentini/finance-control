<template>
    <div class="breadcrumb">{{ name }}</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ name: string }>();

</script>

<style lang="scss" scoped>
.breadcrumb {
    display: contents;
    font-size: 25px;
}
</style>