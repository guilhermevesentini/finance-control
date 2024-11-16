<template>
  <el-tabs v-model="currentRoute" class="FC-Navbar" @tab-click="handleTabClick">
    <el-tab-pane v-for="menu in navbarItems" :key="menu.name" :name="menu.name">
      <template #label>
        {{ menu.label }}
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNavbar, type PageItems } from './useFCNavbar';
import type { TabsPaneContext } from 'element-plus';

type IProps = {
  navbarItems: PageItems[]
}

defineProps<IProps>()

const router = useRouter();
const route = useRoute();

const routername = computed<string>(() => router.currentRoute.value.name as string);
const currentRoute = ref<string>(routername.value || '/Despesas/overview');

const handleTabClick = (tab: TabsPaneContext) => {
  currentRoute.value = String(tab.props.name);
};

watch(() => route.name, (newVal) => {
  currentRoute.value = route.path as string;
}, { deep: true, immediate: true });

watch(currentRoute, (routeName: string) => {
  try {
    router.push(routeName);
  } catch (err) { console.log(err) }
}, { deep: true, immediate: true });
</script>

<style lang="scss">
.FC-Navbar {
  background-color: #fff;
  padding: 10px;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 7px;

  .el-tabs__header {
    margin: 0 !important;
  }
}
</style>