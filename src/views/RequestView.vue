<template>
    <AppLoader v-if="loading" />
    <AppPage title="Заявка" back v-if="request && !loading">
        <p><strong>Имя владельца</strong>: {{ request.name }}</p>
        <p><strong>Телефон</strong>: {{ request.phone }}</p>
        <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
        <p><strong>Статус</strong>:
            <AppStatus :status="request.status" />
        </p>

        <div class="form-control" style="margin-bottom: 15px;">
            <label for="status">Изменить сатус: </label>
            <select id="status" v-model="status">
                <option value="done">Завершен</option>
                <option value="cancelled">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>

        <button class="btn danger" @click="removeRequest">Удалить</button>
        <button class="btn" @click="updateRequest" :disabled="isUpdateBtnDisabled">Обновить</button>
    </AppPage>
    <h3 v-if="!request && !loading" class="text-center text-white"> Заявки с ID "{{ id }}" не сущестует</h3>
</template>

<script setup>
import AppPage from "@/components/ui/AppPage.vue";
import AppLoader from "@/components/ui/AppLoader";
import AppStatus from "@/components/ui/AppStatus";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, ref, computed } from "vue"
import { currency } from "@/utils/currency";

const route = useRoute()
const router = useRouter()
const store = useStore()

const id = route.params.id

const request = ref(null)
const loading = ref(false)
const status = ref('')

//можно забрать из стора через id
// const request = computed(()=> store.getters["request/requestItem"](id))

const isUpdateBtnDisabled = computed(() => request.value?.status === status.value)

const removeRequest = async () => {
    loading.value = true
    await store.dispatch('request/removeRequest', id)
    loading.value = false
    router.push('/')
}

const updateRequest = async () => {
    loading.value = true
    await store.dispatch('request/updateRequest', { ...request.value, status: status.value})
    request.value = await store.dispatch('request/getRequest', id)
    status.value = request.value?.status
    loading.value = false
}

onMounted(async () => {
    loading.value = true
    request.value = await store.dispatch('request/getRequest', id)
    status.value = request.value?.status
    loading.value = false
})




</script>