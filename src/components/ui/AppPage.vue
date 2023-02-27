<template>
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
})

onMounted(()=> {
  document.title = `${props.title} | Приложение банка`
})

</script>
