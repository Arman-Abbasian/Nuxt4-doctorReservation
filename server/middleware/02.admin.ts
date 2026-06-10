export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  if (url.pathname.startsWith('/api/admin')) {
    authorizeMiddleware(event, 'admin')
  }
})
