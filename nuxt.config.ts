// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    basicAuthUser: '',    // via NUXT_BASIC_AUTH_USER
    basicAuthPassword: '', // via NUXT_BASIC_AUTH_PASSWORD
  },
})
