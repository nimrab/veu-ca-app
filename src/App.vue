<template>
  <component v-if="layout" :is="layout"></component>
</template>

<script setup>
import AuthLayout from '@/layout/AuthLayout.vue'
import MainLayout from "@/layout/MainLayout.vue";
import {computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const layout = computed(()=> {
  return route.meta.layout === 'main' ? MainLayout : AuthLayout
})

</script>
