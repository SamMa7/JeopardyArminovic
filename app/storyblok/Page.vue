<script setup>
  defineProps({ blok: Object });
</script>

<template>
  <main class="h-screen flex flex-col">
    <StoryblokComponent v-for="currentBlok in blok.body" :key="currentBlok._uid" :blok="currentBlok" />
  </main>
</template>