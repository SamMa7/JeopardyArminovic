<script setup>
const slug = useRoute().params.slug;

const { story } = await useAsyncStoryblok(slug && slug.length > 0 ? slug.join("/") : "game", {
    api: {
        version: "draft",
    },
});
</script>

<template>
    <StoryblokComponent v-if="story" :blok="story.content" />
</template>