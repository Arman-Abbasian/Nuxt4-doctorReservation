import {
  QueryClient,
  VueQueryPlugin,
  hydrate,
  dehydrate,
} from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60,
      },
      mutations: {
        retry: 0,
      },
    },
  })

  // دفترچه رو راه انداختیم.
  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })

  //Dehydrate (سرور): اطلاعات رو از دفترچه سرور بسته‌بندی کردیم برای ارسال.
  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      nuxtApp.payload.vueQueryState = dehydrate(queryClient)
    })
  }
  //Hydrate (کلاینت): اطلاعات رو از بسته‌بندی باز کردیم و ریختیم توی دفترچه کلاینت.
  if (import.meta.client) {
    nuxtApp.hooks.hook('app:created', () => {
      if (nuxtApp.payload.vueQueryState) {
        hydrate(queryClient, nuxtApp.payload.vueQueryState)
      }
    })
  }
})
