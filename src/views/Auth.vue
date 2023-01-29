<template>
  <form class="card" @submit.prevent="onSubmit">

    <h1>Войти в систему</h1>

    <div :class="['form-control',{invalid: eError }]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control',{invalid: eError }]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="eError">{{ pError }}</small>
    </div>
    <button class="btn primary" type="submit" :disabled="isSubmitBtnDisabled">Войти</button>
    <div class="text-danger" v-if="isMaxAttempt">Лимит попыток</div>
  </form>
</template>


<script setup>
import {useLoginForm} from "@/use/login-form";

const {
  email,
  password,
  eError,
  pError,
  onSubmit,
  eBlur,
  pBlur,
  isSubmitBtnDisabled,
  isMaxAttempt,
} = useLoginForm()
</script>

<style scoped>

</style>