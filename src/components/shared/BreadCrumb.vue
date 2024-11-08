<template>
    <div class="breadcrumb">{{ name }}</div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>();

</script>

<style lang="scss" scoped>
.breadcrumb {
    display: contents;
    font-size: 25px;
}
</style>