<template>
    <div class=" bg-red-600 w-full flex items-center justify-center text-lg font-bold">
        {{ blok.points }}
    </div>
</template>

<script setup>
    defineProps({ blok: Object });
</script>