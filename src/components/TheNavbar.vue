<template>
  <nav class="navbar">
    <h3>Online bank</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Заявки</router-link>
      </li>
      <li>
        <router-link to="/help">Помощь</router-link>
      </li>
      <li>
        <a href="#">Сообщения</a>
      </li>
      <li>
        <a href="#" @click.prevent="logOut">Выход</a>
      </li>
    </ul>

  </nav>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router =useRouter()
const store = useStore()

const logOut = () => {
  store.commit('auth/resetToken')
  router.push('/auth')
}

</script>

<style scoped>

</style>