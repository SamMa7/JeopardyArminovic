<template>
    <div 
        class=" bg-red-600 w-full flex items-center justify-center text-lg font-bold rounded-md"
        @click="showModal = true"
    >
        {{ blok.points }}
    </div>

    <Transition>
        <div v-if="showModal" class="fixed top-0 left-0 right-0 bottom-0 size-full z-30">
            <div class="bg-black absolute w-full h-full opacity-80" @click="showModal = false"/>
            <div class="bg-white fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 size-2/3 rounded-md items-center justify-center flex"> 
                <div class="text-center text-8xl">{{ blok.question }}</div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
    defineProps({ blok: Object });

    const showModal = ref(false);
</script>