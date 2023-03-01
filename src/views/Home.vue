<template>
  <AppPage title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modalOpen">Создать</button>
    </template>
    <RequestTable :requests="[]"/>
    <teleport to="body">
      <AppModal v-if="modal" title="Создать заявку" @close="modalClose">
        <RequestModal @created="modalClose"/>
      </AppModal>
    </teleport>
  </AppPage>>
</template>

<script setup>
import AppPage from "@/components/ui/AppPage";
import RequestTable from "@/components/request/RequestTable";
import {ref} from "vue";
import AppModal from "@/components/ui/AppModal";
import RequestModal from "@/components/request/RequestModal";

const modal = ref(false)
const modalClose = () => {
  modal.value = false
}

const modalOpen = () => {
  modal.value = true
}



</script>
