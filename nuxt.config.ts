export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', '@vee-validate/nuxt', '@nuxt/ui'],
  icon: {
    clientBundle: {
      scan: true,
    },
    mode: 'svg',
  },
  runtimeConfig: {
    port: process.env.NUXT_PORT,
    mongoURI: process.env.NUXT_MONGO_URI,
    jWTSecret: process.env.NUXT_JWT_SECRET,
    refreshSecret: process.env.NUXT_REFRESH_SECRET,
    public: {
      apiBaseURL: '',
    },
  },
})
