<template>
  <AppPage back title="Помощь">
    <QuestionItem v-for="item in questions" :key="item.title" :question="item"></QuestionItem>
  </AppPage>
</template>
<script setup>
import AppPage from '@/components/ui/AppPage.vue';
import QuestionItem from '@/components/question/QuestionItem.vue';


const questions = [
  { title: 'Что есть в данной системе?', text: 'В системе можно работать с заявками и совершать действия по их созданию, редактированию, удалению' },
  { title: 'Как реализовано хранение заявок', text: 'Авторизация и хранение заявок реализовано через Firebase' },
]

</script>
