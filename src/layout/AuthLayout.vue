<template>
  <div class="container">
    <AppMessage v-if="isMessageExist"/>
    <router-view/>
  </div>
</template>


<script setup>
import AppMessage from "@/components/ui/AppMessage";
import {useStore} from "vuex";
import {computed, watch} from "vue";
import {useRoute} from "vue-router";
import {error} from "@/utils/errors";

const store = useStore()
const route = useRoute()

const isMessageExist = computed(() => {
  return !!store.state.message
})

watch(route, () => {
  if (route.query?.message === 'auth') {
    store.dispatch('setMessage', {type: 'warning', message: error(route.query.message)})
  }
})

</script>
