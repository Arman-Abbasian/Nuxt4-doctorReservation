// server/utils/auth/authenticate.ts
import { getCookie } from 'h3'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { errorResponse } from './response'

export async function authenticateMiddleware(event: any) {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'accessToken')

  if (!token) {
    return {
      ok: false as const,
      response: errorResponse(event, 401, 'توکن وجود ندارد'),
    }
  }

  let decoded: any

  try {
    decoded = jwt.verify(token, config.jwtSecret as string)
  } catch {
    return {
      ok: false as const,
      response: errorResponse(event, 401, 'توکن نامعتبر یا منقضی شده است'),
    }
  }

  if (!decoded?.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
    return {
      ok: false as const,
      response: errorResponse(event, 401, 'شناسه کاربر نامعتبر است'),
    }
  }

  event.context.user = {
    userId: decoded.userId,
    role: decoded.role,
  }

  return {
    ok: true as const,
  }
}
