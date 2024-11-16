<template>
  <el-menu class="navbar" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item class="logo">
      <img :src="logo"> <span class="hidden-sm-and-down">Finance Control</span>
    </el-menu-item>
    <div class="flex-grow" />
    <span>{{ nomeUsuario }}</span>
    <div class="flex-grow" />
    <el-switch class="hidden-sm-and-down" v-model="thema" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" @click="toggleTheme" />
    <el-dropdown trigger="click" class="menu">
      <span class="el-dropdown-link">
        <el-icon class="el-icon--right">
          <Avatar />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Configurar Conta</el-dropdown-item>
          <el-dropdown-item>Personalizar</el-dropdown-item>
          <el-dropdown-item :icon="SwitchButton" @click="logout">Sair</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-menu>
</template>

<script setup lang="ts">
import logo from "@/assets/images/logo.png";
import router from '@/router';
import {
  Avatar,
  SwitchButton,
  Sunny,
  Moon
} from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from "vue";

const thema = ref(true);

const nomeUsuario = ref('')

const handleSelect = (key: string, keyPath: string[]) => {
  router.push({ path: `/` });
}

const logout = (() => {
  localStorage.removeItem('user');
  router.push({ path: `/login` });
})

const toggleTheme = () => {
  const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
};

onMounted(() => {
  const storage = localStorage.getItem('user')
  const usuario = storage ? JSON.parse(storage) : {};

  nomeUsuario.value = usuario.username || 'user';
})
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 100%;
  background-color: #466ff5;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  color: #fff;

  .el-menu-item:first-child:hover {
    background-color: transparent;
  }
  
  .logo {
    color: #fff;
  }

  .logo:hover {
    background-color: none !important;
  }

  img {
    width: 25px;
    margin-right: 0.5rem;
  }

  .menu {
    padding: 1rem;
    color: #fff;

    .el-icon--right {
      font-size: 24px;
      cursor: pointer;
    }
  }

  .flex-grow {
    flex-grow: 1;
  }

  .block-col-2 .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }

  .block-col-2 .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>