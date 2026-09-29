<template>
    <div class="">
        <h1 class="px-5 py-3 text-3xl">Arminovic Jeopardy</h1>
    </div> 
    <div :class="`grid grid-cols-${blok.categories.length} gap-4 grow bg-blue-600 px-5 py-3`">
        <div v-for="category in blok.categories" class="col-span-1">
            <Category :blok="category" :questionCols="highestQuestionCount"/>
        </div>
    </div>
</template>

<script setup>
import Category from './category.vue';
    const {blok} = defineProps({ blok: Object });

    const highestQuestionCount = computed(() => {
        var count = 0;
        blok.categories.forEach(category => {
            if(category.questions.length > count) count = category.questions.length;
        });
        return count;
    });
</script>