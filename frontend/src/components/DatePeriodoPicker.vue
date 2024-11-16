<template>
  <div class="container_date_range">
    <div class="container_date_range_item mes">
      <el-icon>
        <ArrowLeft @click="prevMonth" v-if="showLeftIcon" />
      </el-icon>
      <el-button type="secondary" round>{{ currentDate }}</el-button>
      <el-icon>
        <ArrowRight @click="nextMonth" v-if="showRightIcon" />
      </el-icon>
    </div>
    <div class="container_date_range_item">
      <el-icon>
        <ArrowLeft @click="prevYear" />
      </el-icon>
      <el-button type="secondary" round>{{ currentYear }}</el-button>
      <el-icon>
        <ArrowRight @click="nextYear" />
      </el-icon>
    </div>
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
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro'
}

const currentMonth = ref(dayjs().month() + 1);
const showLeftIcon = ref(true);
const showRightIcon = ref(true);

const currentYear = ref(dayjs().year())

const emits = defineEmits<{
  (event: "update:monthChange", mes: number, ano: number): number;
}>();

const handleMonthName = (value: number) => {
  return months[value]
}

const showArrowsIcons = (month: number) => {
  if (month == 12) {
    showRightIcon.value = false
  } else {
    showRightIcon.value = true
  }

  if (month == 1) {
    showLeftIcon.value = false
  } else {
    showLeftIcon.value = true
  }
}

const currentDate = computed(() => {
  const month = currentMonth.value;
  return handleMonthName(month)
});

const nextMonth = () => {
  const newDate = currentMonth.value + 1;
  showArrowsIcons(newDate)
  emits('update:monthChange', newDate, currentYear.value);
  return currentMonth.value = newDate
}
const prevMonth = () => {
  const newDate = currentMonth.value - 1;
  showArrowsIcons(newDate)
  emits('update:monthChange', newDate, currentYear.value);
  return currentMonth.value = newDate
}

const nextYear = () => {
  const newYear = currentYear.value + 1;
  emits('update:monthChange', currentMonth.value, newYear);
  return currentYear.value = newYear
}
const prevYear = () => {
  const newYear = currentYear.value - 1;
  emits('update:monthChange', currentMonth.value, newYear);
  return currentYear.value = newYear
}
</script>

<style lang="scss" scoped>
.container_date_range {
  display: flex;

  &_item {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;

    .el-icon {
      cursor: pointer;
      margin: 0 0.5rem;
    }

    .el-button {
      height: 30px;
      cursor: default;
    }

    .el-button:hover {
      background-color: #fff;
      color: #2e2e2e;
    }
  }

  .mes {
    .el-button {
      width: 120px;
    }
  }

  .el-icon {
    cursor: pointer;
  }
}
</style>