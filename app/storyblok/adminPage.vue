<template>
    <div class="flex flex-col gap-3 p-5">
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
        WebsocketState: {{ status }}
    </div>

    <button @click="() => {resetPoints(); send('reset')}" class="m-5">reset points</button>
</template>

<script setup>
    import { useTeamsStore } from '~/stores/teams';
    const teamsStore = useTeamsStore();
    const { teams } = storeToRefs(teamsStore);
    import { useWebSocket } from '@vueuse/core'

    const { status, send } = useWebSocket(`/ws/websocket`);

    const inputValue = ref(0);

    const plusPoints = (team) => {
        send(`${team};Plus;${inputValue.value}`);
    };
    const minusPoints = (team) => {
        send(`${team};Minus;${inputValue.value}`)
    };
</script>