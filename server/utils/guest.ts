import { getRequestHeader } from 'h3'
import jwt from 'jsonwebtoken'
import { errorResponse } from './response'

export async function guestMiddleware(event: any) {
  const config = useRuntimeConfig()

  const authHeader = getRequestHeader(event, 'authorization')

  // اگر هدر وجود نداشت، یعنی کاربر مهمان است و اجازه ورود دارد (معادل next() در اکسپرس)
  if (!authHeader) return

  const token = authHeader.split(' ')[1] || ''

  try {
    jwt.verify(token, config.jwtSecret as string)
    return errorResponse(event, 400, 'شما قبلاً وارد شده‌اید')
  } catch (err) {
    // اگر توکن نامعتبر بود یا منقضی شده بود، خطای verify رو نادیده می‌گیریم
    // و اجازه می‌دیم کاربر ادامه بده (معادل next() در اکسپرس)
    return
  }
}
