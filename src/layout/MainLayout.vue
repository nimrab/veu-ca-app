<template>
  <TheNavbar/>
  <div class="container with-nav">
      <router-view/>
  </div>
</template>

<script setup>


import TheNavbar from "@/components/TheNavbar.vue";
</script>

<style scoped>

</style>