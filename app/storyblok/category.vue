<template>
    <div class="h-full flex flex-col gap-3">
        <h2 class="text-center py-3 px-2 bg-purple-600 text-xl font-semibold">{{ category.header }}</h2>
        <div :class="`grid grid-rows-${questionCols} gap-3 grow`">
            <template v-for="question in category.questions">
                <Question :question="question"/>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {type Category} from '~/stores/quiz.ts';

    const { category, questionCols } = defineProps<{
        category: Category;
        questionCols: number;
    }>();
</script>