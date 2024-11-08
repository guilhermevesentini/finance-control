<template>
  <div class="container_date_range">
    <el-icon>
      <ArrowLeft @click="prevMonth" v-if="showLeftIcon" />
    </el-icon>
    <el-button type="primary" round>{{ currentDate }}&nbsp;<span>- {{ currentYear }}</span></el-button>
    <el-icon>
      <ArrowRight @click="nextMonth" v-if="showRightIcon" />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowLeft,
  ArrowRight
} from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import dayjs from 'dayjs'

interface IMonthsNames {
  [key: number]: string;
}

const months: IMonthsNames = {
  0: 'Janeiro',
  1: 'Fevereiro',
  2: 'Março',
  3: 'Abril',
  4: 'Maio',
  5: 'Junho',
  6: 'Julho',
  7: 'Agosto',
  8: 'Setembro',
  9: 'Outubro',
  10: 'Novembro',
  11: 'Dezembro'
}

const currentMonth = ref(dayjs().month());
const showLeftIcon = ref(true);
const showRightIcon = ref(true);
const currentYear = ref(dayjs().year())

const emits = defineEmits<{
  (event: "update:monthChange", value: number): number;
}>();

const handleMonthName = (value: number) => {
  return months[value]
}

const currentDate = computed(() => {
  const month = currentMonth.value;

  emits('update:monthChange', month);
  return handleMonthName(month)
});

const nextMonth = () => {
  const newDate = currentMonth.value + 1;

  if (currentMonth.value == 11) return showRightIcon.value = false;

  showLeftIcon.value = true;

  return currentMonth.value = newDate
}
const prevMonth = () => {
  const newDate = currentMonth.value - 1;

  if (currentMonth.value == 0) return showLeftIcon.value = false;

  showRightIcon.value = true;

  return currentMonth.value = newDate
}
</script>

<style lang="scss" scoped>
.container_date_range {
  display: flex;
  width: 240px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: space-around;

  .el-icon {
    cursor: pointer;
  }
}
</style>