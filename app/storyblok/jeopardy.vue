<template>
    <div class="h-screen flex flex-col max-w-screen">
        <div>
            <h1 class="px-5 py-3 text-3xl">Arminovic Jeopardy</h1>
        </div> 
        <div :class="`grid grid-cols-${blok.categories.length} gap-4 grow bg-blue-600 px-5 py-3`">
            <div v-for="category in blok.categories" class="col-span-1">
                <Category :blok="category" :questionCols="highestQuestionCount"/>
            </div>
        </div>
        <div class="h-64 bg-green-500 py-3 px-5 flex w-screen justify-between">
            <div v-for="(_, index) in Array(Number(teams.length+1))" class="bg-white aspect-video" >
                <div v-if="index && teams.length && teams[index-1]">
                    {{ teams[index-1].name }}
                    {{ teams[index-1].points }}
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
    import Category from '~/storyblok/category.vue';
    import { useTeamsStore } from '~/stores/teams';

    const teamsStore = useTeamsStore();
    const { teams } = storeToRefs(teamsStore);
    const { resetPoints, addPoints, substractPoints} = teamsStore;

    const {blok} = defineProps({ blok: Object });

    const highestQuestionCount = computed(() => {
        var count = 0;
        blok.categories.forEach(category => {
            if(category.questions.length > count) count = category.questions.length;
        });
        return count;
    });

    useWebSocket(`/ws/websocket`, {
        onConnected(ws) {
            console.log('Connected!')
        },
        onMessage(ws, event) {
            const message = event.data;
            console.log('Message: ', message);

            if(message == 'reset') {
                console.log('reset points');
                resetPoints();
                return;
            }

            const values = message.replace(' ', '').split(';');
            if(values[1] == 'Plus') {
                addPoints(values[0], Number(values[2]))
            }
            if(values[1] == 'Minus') {
                substractPoints(values[0], Number(values[2]))
            }
        }
    });
</script>
