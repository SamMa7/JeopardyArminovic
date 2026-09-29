<template>
    <div class="h-full flex flex-col gap-3">
        <h2 class="text-center py-3 px-2 bg-purple-600 text-xl font-semibold">{{ blok.Headline }}</h2>
        <div :class="`grid grid-rows-${questionCols} gap-3 grow`">
            <template v-for="question in blok.questions">
                <Question :blok="question" />
            </template>
        </div>
    </div>
</template>

<script setup>
    defineProps({ blok: Object, questionCols: Number });
</script>