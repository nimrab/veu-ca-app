<template>
<span :class="['badge', className]">{{textMap[props.status]}}</span>
</template>

<script setup>
const props = defineProps({
  status: String
})

const classMap={
  active: 'primary',
  cancelled: 'danger',
  done: 'primary',
  pending: 'warning',
}

const textMap = {
  active: 'Активен',
  cancelled: 'Отменен',
  done: 'Завершен',
  pending: 'Выполняется',
}

const className = classMap[props.status]

</script>

<style scoped>

</style>