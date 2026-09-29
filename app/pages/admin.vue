<script setup>
  const { story } = await useAsyncStoryblok("admin", {
    // asyncData options https://nuxt.com/docs/4.x/api/composables/use-async-data
    lazy: false,
    api: {
      version: "draft",
      resolve_relations: "featured-articles.posts",
    },
    bridge: {
      resolveRelations: ["featured-articles.posts"],
    },
  });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>