import { User } from '~~/server/model/User'
import { verifyOtpSchema } from '~~/server/validator/authValidator'

export default defineEventHandler(async (event) => {
  await guestMiddleware(event)

  const { body } = await validateMiddleware(event, verifyOtpSchema)
  const { mobile, otp } = body

  try {
    const user = await User.findOne({ mobile })

    if (!user) {
      return errorResponse(event, 404, 'کاربر یافت نشد')
    }

    if (!user.otp || !user.otpExpireAt) {
      return errorResponse(event, 400, 'کدی برای تایید وجود ندارد')
    }

    if (user.otpExpireAt.getTime() < Date.now()) {
      return errorResponse(event, 400, 'کد منقضی شده است')
    }

    if (user.otp !== otp) {
      return errorResponse(event, 400, 'کد اشتباه است')
    }

    user.otp = null
    user.otpExpireAt = null

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    user.refreshToken = refreshToken
    await user.save()

    setCookie(event, 'accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60,
    })

    setCookie(event, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    })

    return successResponse(event, 200, 'ورود موفق')
  } catch (err: any) {
    return errorResponse(event, 500, 'خطای سرور', err.message)
  }
})
