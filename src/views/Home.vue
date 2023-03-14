<template>
  <AppLoader v-if="isLoading"/>
  <AppPage v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modalOpen">Создать</button>
    </template>
    <RequestFilter
        v-if="requests.length"
        v-model:searchName="searchText"
        v-model:searchStatus="searchStatus"
        @clearFilters="clearFilters"
    />
    <RequestTable :requests="filteredRequests"/>
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
import {computed, onMounted, ref} from "vue";
import AppModal from "@/components/ui/AppModal";
import RequestModal from "@/components/request/RequestModal";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import RequestFilter from "@/components/request/RequestFilter";

const modal = ref(false)
const isLoading = ref(false)
const searchText = ref('')
const searchStatus = ref('')

const store = useStore()
const modalClose = () => {
  modal.value = false
}

const modalOpen = () => {
  modal.value = true
}

const requests = computed(() => store.getters["request/allRequests"])

const filteredRequests = computed(() => requests.value.filter(r=> {
  return searchStatus.value ? r.name.includes(searchText.value) && r.status === searchStatus.value : r.name.includes(searchText.value)
}))

const clearFilters = () => {
  searchText.value = ''
  searchStatus.value = ''
}

onMounted(async ()=> {
  isLoading.value = true
  await store.dispatch('request/getRequests')
  isLoading.value = false
})


</script>
