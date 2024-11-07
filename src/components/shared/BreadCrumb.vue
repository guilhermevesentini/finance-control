<template>
    <div class="breadcrumb">{{ props.name }}</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    name: {
        type: String,
        default: ""
    }
});

</script>

<style lang="scss" scoped>
.breadcrumb {
    display: contents;
    font-size: 25px;
}
</style>