<template>
<h4 v-if="noRequest" class="text-center">Заявок пока нет</h4>
<table v-else class="table">
  <thead>
<tr>
  <th>#</th>
  <th>ФИО</th>
  <th>Телефон</th>
  <th>Сумма</th>
  <th>Статус</th>
  <th>Действие</th>
</tr>
  </thead>
  <tbody>
    <tr v-for="(r,idx) in props.requests" :key="r.id">
      <td>{{idx + 1}}</td>
      <td>{{r.name}}</td>
      <td>{{r.phone}}</td>
      <td>{{r.amount}} руб</td>
      <td>{{statuses[r.status]}}</td>
      <td>
<!--        <router-link v-slot="{navigate}" custom :to="{name: 'request', params: {id: r.id}}">-->
          <button class="btn primary" @click="navigate">Открыть</button>
<!--        </router-link>-->
      </td>
    </tr>
  </tbody>
</table>
</template>

<script setup>
import {computed, onMounted} from "vue";

const props=defineProps({
  requests: Array,
})
const statuses = {
  done: 'Завершен',
  active: 'Активен',
  cancelled: 'Отменен',
  pending: 'Выполняется',
}

const noRequest = computed(()=> {
  return !props.requests.length
})


</script>
