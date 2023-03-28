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
      <td><span>{{idx + 1}}</span></td>
      <td><span>{{r.name}}</span></td>
      <td><span>{{r.phone}}</span></td>
      <td><span>{{currency(r.amount)}}</span></td>
      <td>
        <AppStatus :status="r.status" />
      </td>
      <td>
        <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: r.id}}">
          <button class="btn" @click="navigate">Открыть</button>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import {computed, ref} from "vue";
import {currency} from "@/utils/currency";
import AppStatus from "@/components/ui/AppStatus";

const props=defineProps({
  requests: Array,
})

const noRequest = computed(()=> {
  return !props.requests.length
})


</script>

