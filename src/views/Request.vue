<template>
    <AppLoader v-if="loading"/>
const request = ref(null)
    <AppPage title="Заявка" back v-if="request">
        <p><strong>Имя владельца</strong>: {{ request.name }}</p>
        <p><strong>Телефон</strong>: {{ request.phone }}</p>
        <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
        <p><strong>Статус</strong>: 
            <AppStatus :status="request.status"/>
        </p>
    </AppPage>
    <h3  v-else class="text-center text-white"> Заявки с ID "{{ id }}" не сущестует</h3>
</template>

<script setup>
import AppPage from "@/components/ui/AppPage.vue";
import AppLoader from "@/components/ui/AppLoader";
import AppStatus from "@/components/ui/AppStatus";
import {useRoute} from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref} from "vue"
import {currency} from "@/utils/currency";

const route = useRoute()
const store = useStore()

const id = route.params.id

const request = ref(null)
const loading = ref(false)

//можно забрать из стора через id
// const request = computed(()=> store.getters["request/requestItem"](id))


onMounted(async ()=> {
    loading.value = true
    request.value = await store.dispatch('request/getRequest', id)
    loading.value = false
})




</script>