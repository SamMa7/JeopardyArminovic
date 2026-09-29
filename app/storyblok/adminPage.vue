<template>
    <div class="flex flex-col gap-3 p-5">
        <div v-for="team in teams" class="flex gap-10">
            <div>
                <div>Team Name: {{ team.name }}</div>
                <div>Team Password: {{ team.password }}</div>
            </div>
            <div class="flex gap-3">
                points:  {{ team.points }}
                <input v-model="inputValue" type="number" />
                <button @click="addPoints(team.name, inputValue)">add</button>
                <button @click="substractPoints(team.name, inputValue)">substract</button>
            </div>
        </div>
    </div>

    <button @click="resetPoints" class="m-5">reset points</button>
</template>

<script setup>
    import { useTeamsStore } from '~/stores/teams';
    const teamsStore = useTeamsStore();
    const { teams } = storeToRefs(teamsStore);
    const { addPoints, substractPoints, resetPoints} = teamsStore;

    const inputValue = ref(0);
</script>