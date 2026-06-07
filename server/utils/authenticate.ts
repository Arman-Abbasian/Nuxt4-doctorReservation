// server/utils/auth/authenticate.ts
import { getCookie, createError } from 'h3'
import jwt from 'jsonwebtoken'
import { errorResponse } from './response'

export async function authenticateMiddleware(event: any) {
  const config = useRuntimeConfig()

  const token = getCookie(event, 'accessToken')

  if (!token) {
    return errorResponse(event, 401, 'توکن وجود ندارد')
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret as string) as any

    //  (معادل req.user در اکسپرس)
    event.context.user = {
      userId: decoded.userId,
      role: decoded.role,
    }
  } catch (err: any) {
    return errorResponse(event, 401, 'توکن نامعتبر یا منقضی شده است')
  }
}
