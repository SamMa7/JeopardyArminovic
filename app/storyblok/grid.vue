<template>
    grid 
    {{ blok.categories.length }}
    <div :class="`grid grid-cols-[${blok.categories.length}] gap-4`">
    </div>
</template>

<script setup>
    defineProps({ blok: Object });
</script>