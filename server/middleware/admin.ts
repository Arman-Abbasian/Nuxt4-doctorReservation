export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  if (url.pathname.startsWith('/api/admin')) {
    authenticateMiddleware(event)
    authorizeMiddleware(event, 'admin')
  }
})
