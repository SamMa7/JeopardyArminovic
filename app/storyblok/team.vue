<template>
    <div class="flex flex-col gap-10 p-5">
        <div class="flex flex-col">
            <div>Team Name: {{ teamName }}</div>
            <div>websocketstatus: {{ status }}</div>
        </div>
        
        <button @click="click()">Button</button>
    </div>
</template>

<script setup lang="ts">
    const {blok} = defineProps({blok: Object});

    const { status, send } = useWebSocket(`/ws/websocket`);

    const teamName = blok?.teamName;
    const password = blok?.password;

    const click = () => {
        send(`Team ${teamName} hat gedrückt!`)
    }
</script>