import { errorResponse } from './response'

export function authorizeMiddleware(event: any, requiredRole: string) {
  const user = event.context.user
  if (user?.role !== requiredRole) {
    return {
      ok: false as const,
      response: errorResponse(event, 403, 'دسترسی غیرمجاز'),
    }
  }
}
