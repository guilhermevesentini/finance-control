<template>
  <el-row class="sidebar hidden-sm-and-down">
    <el-col :style="{ width: collapsed ? '65px' : '200px' }">
      <el-menu :default-active="activeMenu" :class="collapsed ? 'full-height mobile' : 'full-height desktop'">
        <el-menu-item index="1" @click="ClickNoLink('/Dashboard')">
          <el-icon>
            <DataAnalysis />
          </el-icon>
          <span v-if="!collapsed">Dashboard</span>
        </el-menu-item>
        <el-menu-item index="2" @click="ClickNoLink('/Despesas')">
          <el-icon>
            <Minus />
          </el-icon>
          <span v-if="!collapsed">Despesas</span>
        </el-menu-item>
        <!-- <el-menu-item index="8" @click="ClickNoLink('/Cadastros')">
          <el-icon>
            <Setting />
          </el-icon>
          <span v-if="!collapsed">Cadastros</span>
        </el-menu-item> -->
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import router from '@/router';
import {
  DataAnalysis,
  Minus,
  Setting,
} from '@element-plus/icons-vue';
import { ref } from 'vue';



const collapsed = ref(true);

const routeIndexMapping: { [key: string]: string } = {
  '/Dashboard': '1',
  '/Despesas/overview': '2',
  '/Cadastros': '8',
};

router.afterEach(() => {
  activeMenu = getActiveMenu();
});

const getActiveMenu = (): string => {
  const currentRoute = router.currentRoute.value.path;
  return routeIndexMapping[currentRoute] || '2';
};

let activeMenu = getActiveMenu();

const ClickNoLink = (path: string) => {
  return router.push(`${path}`)
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  padding: 0;
  
  .full-height {
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #fff;  
  
    .modile {
      .el-menu-item {
        padding: 0
      }
    }
  
    .desktop {
      .el-menu-item:last-child {
      position: absolute;
      bottom: 0;
      width: 100%;
      color: #fff;
    }
    }

    
  }
}
</style>