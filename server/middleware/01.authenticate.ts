export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  if (
    url.pathname.startsWith('/api/admin') ||
    url.pathname.startsWith('/api/user') ||
    url.pathname.startsWith('/api/doctor') ||
    url.pathname.startsWith('/api/comment')
  ) {
    authenticateMiddleware(event)
  }
})
