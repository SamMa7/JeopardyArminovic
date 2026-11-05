<template>
    <div 
        class=" bg-red-600 w-full flex items-center justify-center text-lg font-bold rounded-md"
        @click="clickQuestion()"
    >
        {{ question.points }}
        {{ question.clicked }}
    </div>

    <Transition>
        <div v-if="showModal" class="fixed top-0 left-0 right-0 bottom-0 size-full z-30">
            <div class="bg-black absolute w-full h-full opacity-80" @click="showModal = false"/>
            <div class="bg-white fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 size-2/3 rounded-md items-center justify-center flex flex-col gap-10"> 
                <div class="text-center text-8xl">{{ question.question }}</div>
                <Transition>
                    <div v-if="showAnswer" class="text-center text-xl">{{ question.answer }}</div>
                </Transition>
                <button @click="showAnswer = true">show answer</button>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import {type Question} from '~/stores/quiz.ts';

    const { question } = defineProps<{
        question: Question
    }>();

    const showModal = ref(false);
    const showAnswer = ref(false);

    const clickQuestion = () => {
        question.clicked = !question.clicked;
        showModal.value = true;
    }
</script>