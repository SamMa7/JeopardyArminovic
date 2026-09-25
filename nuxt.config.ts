// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
        apiOptions: {
          region: "eu",
        },
      },
    ],
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '~/assets/tailwind.css',
  ],
  runtimeConfig: {
    basicAuthUser: '',    // via NUXT_BASIC_AUTH_USER
    basicAuthPassword: '', // via NUXT_BASIC_AUTH_PASSWORD
  },
})