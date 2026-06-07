import { errorResponse } from './response'

export function authorize(event: any, requiredRole: string) {
  const user = event.context.user

  if (user?.role !== requiredRole) {
    return errorResponse(event, 403, 'دسترسی غیرمجاز')
  }
}
