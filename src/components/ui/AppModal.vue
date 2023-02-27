<template>
<div class="modal-backdrop" @click="modalClose"></div>
  <div class="modal">
    <h3 v-if="props.title">{{props.title}}</h3>
    <slot/>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
})

const emits = defineEmits(['close'])

const modalClose = () => {
  emits('close')
}

</script>

<style scoped>

</style>