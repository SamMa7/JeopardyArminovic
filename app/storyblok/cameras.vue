<template>
    <div class="h-64 bg-green-500 py-3 px-5 flex w-screen justify-between">
        <div v-for="cam in Array(Number(blok.count))" class="bg-white aspect-video" />
    </div>
    
</template>

<script setup>
    defineProps({ blok: Object });
</script>