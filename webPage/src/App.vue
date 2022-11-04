<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import titleLogo from './assets/titleLogo.png'
</script>

<template>
  <div>
    <a href="/" >
      <img :src="titleLogo" class="logo" alt="Riin's Workspace" />
    </a>
  </div>
</template>

<style scoped>
.logo {
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
