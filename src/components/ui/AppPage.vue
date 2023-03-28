<template>
<div class="breadcrumbs" v-if="back">
  <router-link to="/" class="text-white">Вернуться к списку заявок</router-link>
</div>
<div class="card">
  <h1 class="card-title">{{title}}
    <slot name="header"/>
  </h1>
  <slot/>
</div>
</template>

<script setup>

import {onMounted} from "vue";

const props=defineProps({
  title: String,
  back: Boolean
})

onMounted(()=> {
  document.title = `${props.title} | Приложение банка`
})

</script>
