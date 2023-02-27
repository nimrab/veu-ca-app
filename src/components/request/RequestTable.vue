<template>
<h4 v-if="noRequest" class="text-center">Заявок пока нет</h4>

</template>

<script setup>
import {computed} from "vue";

const props= defineProps({
  requests: Array,
})

const noRequest = computed(()=> {
  return !props.requests.length
})

</script>
