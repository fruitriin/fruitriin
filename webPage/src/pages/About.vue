<script setup>
import titleLogo from '../assets/titleLogo.png'
</script>
<template>
  <a href="/" >
    <img :src="titleLogo" class="logo" alt="Riin's Workspace" />
  </a>
</template>

<style>
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