<template>
    <div class="question">
        <div class="question-title" @click="toggleItemText">{{ props.question.title }}</div>
        <div class="question-body" v-if="isOpen">{{props.question.text}}</div>
    </div>

</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    question: Array
})

const isOpen = ref(false)

const toggleItemText = () => {
    isOpen.value = !isOpen.value
}
</script> 