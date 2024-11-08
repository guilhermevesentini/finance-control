<template>
  <div>
    <div>
      <FCNavbar />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import FCNavbar from './components/navbar/FCNavbar.vue';
</script>

<style lang="scss"></style>