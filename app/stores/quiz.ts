import { defineStore } from 'pinia'
import Category from '~/storyblok/category.vue'

export type Question = {
    id: string,
    question: string,
    answer: string,
    points: string,
    clicked?: boolean,
}

export type Category = {
    header: string,
    questions: Question[]
}

export const useQuizStore = defineStore('quiz', () => {
    const quiz = ref<Category[]>([]);

    const initialQuiz = async () => {
        const storyblokApiToken = useRuntimeConfig().public.storyblokApiToken;

        try{
            const response = await $fetch('https://api.storyblok.com/v2/cdn/stories/game?token=' + storyblokApiToken);
            const data = response.story.content.categories;

            quiz.value = data.map((category) => {
                return {
                    header: category.header,
                    questions: category.questions.map((question) => {
                        return {
                            id: question._uid,
                            question: question.question,
                            answer: question.answer,
                            points: question.points,
                            clicked: false,
                        }
                    })
                }
            })
            
        } catch (e) {
            console.log(e)
        }
    };

    return {quiz, initialQuiz};
}, {persist: {
    storage: piniaPluginPersistedstate.localStorage(),
}})