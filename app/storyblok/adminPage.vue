<template>
    <div class="flex">
        <div class="flex flex-col gap-10 p-5 w-1/2">
            <div class="flex flex-col gap-3">
                <div v-for="team in teams" class="flex gap-10">
                    <div>
                        <div>Team Name: {{ team.name }}</div>
                        <div>Team Password: {{ team.password }}</div>
                    </div>
                    <div class="flex gap-3">
                        <input v-model="inputValue" type="number" />
                        <button @click="plusPoints(team.name)">add</button>
                        <button @click="minusPoints(team.name)">substract</button>
                    </div>
                </div>
            </div>

            <div class="flex gap-5">
                <button @click="() => {resetPoints(); send('reset')}">reset points</button>
                <button @click="initialQuiz">Lade Fragen</button>
                <button @click="initializeTeams">Lade Teams</button>
            </div>
        </div>
        <div class="flex flex-col gap-5 p-5 w-1/2">
            <button @click="messages = []">clear Messages</button>
            <ClientOnly>Websocket: {{ status }} </ClientOnly>
            <div v-for="message in messages"> {{ message }} </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import { useWebSocket } from '@vueuse/core'

    const teamsStore = useTeamsStore();
    const { teams } = storeToRefs(teamsStore);
    const { initializeTeams, resetPoints } = teamsStore;

    const quizStore = useQuizStore();
    const { initialQuiz } = quizStore;

    const inputValue = ref(0);

    const messages = ref<string[]>([]);
    const { status, send, open, close } = useWebSocket(`/ws/websocket`, {
        onMessage(ws, event) {
            const timestamp = new Date(event.timeStamp);
            const toTimeString = (time: number) => {
                return String(time).padStart(2, '0')
            }
            const timeString = `${toTimeString(timestamp.getHours())}:${toTimeString(timestamp.getMinutes())}:${toTimeString(timestamp.getSeconds())}`
            messages.value.push(`${timeString}: ${event.data}`);
        },
    });
    
    const plusPoints = (team: String) => {
        send(`${team};Plus;${inputValue.value}`);
    };
    const minusPoints = (team: String) => {
        send(`${team};Minus;${inputValue.value}`)
    };

    onMounted(() => {
        open()
    })
    onUnmounted(() => {
        close();
    })
</script>