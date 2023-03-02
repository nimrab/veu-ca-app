<template>
<form @submit.prevent="onSubmit">
  <div :class="['form-control',{invalid: nError }]">
    <label for="email">ФИО</label>
    <input type="text" id="name" v-model="name" @blur="nBlur">
    <small v-if="nError">{{ nError }}</small>
  </div>
  <div :class="['form-control',{invalid: pError }]">
    <label for="phone">Номер телефона</label>
    <input type="text" id="phone" v-model="phone" @blur="pBlur">
    <small v-if="pError">{{ pError }}</small>
  </div>
  <div :class="['form-control',{invalid: aError }]">
    <label for="amount">Сумма</label>
    <input type="text" id="name" v-model="amount" @blur="aBlur">
    <small v-if="aError">{{ aError }}</small>
  </div>

  <div class="form-control">
    <label for="status">Статус</label>
      <select name="status" id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
  </div>
  <button class="btn primary" type="submit" :disabled="isSubmitBtnDisabled">Создать</button>

</form>

</template>

<script setup>

import {useRequestForm} from "@/use/request-form";
import {useStore} from "vuex";
const emits = defineEmits(['created'])
const store = useStore()

const submit = async (values) => {
  emits('created')
  await store.dispatch('request/createRequest', values)
}

const { name, nError, nBlur, phone, pError, pBlur, amount, aError, aBlur, status, onSubmit, isSubmitBtnDisabled } = useRequestForm(submit)



</script>

<style scoped>

</style>