<template>
  <TheNavbar/>
  <div class="container with-nav">
    <AppMessage/>
      <router-view/>
  </div>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
import AppMessage from "@/components/ui/AppMessage";
</script>
