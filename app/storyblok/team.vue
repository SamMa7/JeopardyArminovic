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

    const { status, send, open, close } = useWebSocket(`/ws/websocket`, {
        onConnected(ws) {
            send(`Team ${teamName} ist Connected`)
        },
        onDisconnected(ws) {
            send(`Team ${teamName} ist Disconnected`)
        },
    });

    const teamName = blok?.teamName;
    const password = blok?.password;

    const click = () => {
        send(`Team ${teamName} hat gedrückt!`)
    }

    onMounted(() => {
        open()
    })
    onUnmounted(() => {
        close();
    })
</script>