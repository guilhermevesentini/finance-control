<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <NavbarMenu />
      </el-header>
      <el-container class="full-height-aside">
        <SidebarMenu />
        <el-container>
          <el-main>
            <MainContainer />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainContainer from './MainContainer.vue';
import NavbarMenu from './NavbarMenu.vue';
import SidebarMenu from './SidebarMenu.vue';


</script>

<style scoped></style>