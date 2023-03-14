<template>
<div class="filter">
  <div class="form-control">
    <input v-model="searchTextModel" type="text" placeholder="Введите имя для поиска">
  </div>
  <div class="form-control">
    <select v-model="searchStatusModel">
      <option value="" selected>Выберите статус</option>
      <option value="done">Завершен</option>
      <option value="cancelled">Отменен</option>
      <option value="active">Активен</option>
      <option value="pending">Выполняется</option>
    </select>
  </div>
  <button class="btn warning" @click="emit('clearFilters')">Очистить</button>
</div>
</template>

<script setup>
import {useVModel} from "@vueuse/core"

const props = defineProps({
  searchName: String,
  searchStatus: String
})

const emit = defineEmits(['update:searchName', 'update:searchStatus', 'clearFilters'])

const searchTextModel = useVModel(props, 'searchName', emit)
const searchStatusModel = useVModel(props, 'searchStatus', emit)

</script>

<style scoped>

</style>