<template>
    <div class="flex flex-col gap-10 p-5">
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

        <div>
            <ClientOnly>Websocket: {{ status }} </ClientOnly>
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

    const { status, send } = useWebSocket(`/ws/websocket`);

    const plusPoints = (team: String) => {
        send(`${team};Plus;${inputValue.value}`);
    };
    const minusPoints = (team: String) => {
        send(`${team};Minus;${inputValue.value}`)
    };
</script>