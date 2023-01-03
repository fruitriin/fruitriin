<script setup lang="ts">
import titleLogo from '../assets/titleLogo.png'
</script>
<template>
  <a href="/" id="about">
    <img :src="titleLogo" class="logo" alt="Riin's Workspace" />
  </a>
</template>


<style lang="scss" scoped>
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}



#about {
  margin: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}


</style>