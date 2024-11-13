<template>
  <div>
    <div>
      <FCNavbar :navbar-items="navItemsDespesas" />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import FCNavbar from '@/components/navbar/FCNavbar.vue';
import { navItemsDespesas } from './types';

</script>

<style lang="scss"></style>