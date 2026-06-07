export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vee-validate/nuxt',
    'shadcn-nuxt',
  ],
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
