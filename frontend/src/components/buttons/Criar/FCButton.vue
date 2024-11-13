<template>
  <div class="fc-button">
    <el-button :type="type" v-bind="$attrs" @click="HandleClick" :icon="icon" :circle="circle" :round="round">
      <slot name="label"></slot>
    </el-button>
  </div>
</template>

<script setup lang="ts">
interface IButton {
  type: string
  icon: unknown
  circle?: boolean
  round?: boolean
  label?: string
}

withDefaults(defineProps<IButton>(), {
  type: 'primary',
  circle: false,
  round: false
})

interface IEmits {
  (event: "handleClick"): void
}

const emit = defineEmits<IEmits>();

const HandleClick = () => {
  emit('handleClick')
}
</script>

<style scoped></style>