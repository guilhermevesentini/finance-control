<template>
  <div class="fc-button">
    <el-button v-bind="$attrs" @click="HandleClick" :icon="icon"></el-button>
  </div>
</template>

<script setup lang="ts">
interface IButton {
  icon: unknown
}

withDefaults(defineProps<IButton>(), {})

interface IEmits {
  (event: "handleClick"): void
}

const emit = defineEmits<IEmits>();

const HandleClick = () => {
  emit('handleClick')
}
</script>

<style scoped></style>