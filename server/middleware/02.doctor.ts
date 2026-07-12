export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  if (url.pathname.startsWith('/api/doctor')) {
    authorizeMiddleware(event, 'doctor')
  }
})
