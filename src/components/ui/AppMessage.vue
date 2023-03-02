<template>
  <div :class="['alert', messageClass]">
    <p class="alert-title">{{ TITLE_MAP[message.type] }}</p>
    <p>{{ message.message }}</p>
    <span class="alert-close" @click="closeMessage">&times;</span>
  </div>

</template>

<script setup>

import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore()
const TITLE_MAP = {
  primary: 'Успешно',
  danger: 'Ошибка',
  warning: 'Предупреждение',
}
const message = computed(() => {
  return store.state.message ?? {type: '', message: ''}
})

const messageClass = computed(() => {
  return store.state.message?.type ?? ''
})

const closeMessage = () => {
  store.commit('resetMessage')
}

</script>

<style scoped>

</style>