import { sendOtpSchema } from '~~/server/validator/authValidator'
import { User } from '~~/server/model/User'
import { SendOtpData } from '~~/shared/types/auth'

export default defineEventHandler(async (event) => {
  await guestMiddleware(event)

  const { body } = await validateMiddleware(event, sendOtpSchema)
  const { mobile } = body

  try {
    let user = await User.findOne({ mobile })

    if (
      user &&
      user.otp &&
      user.otpExpireAt &&
      user.otpExpireAt.getTime() > Date.now()
    ) {
      const remainingMs = user.otpExpireAt.getTime() - Date.now()
      const remainingSec = Math.ceil(remainingMs / 1000)

      return successResponse(
        event,
        200,
        `یک کد فعال از قبل موجود است، لطفاً ${remainingSec} ثانیه صبر کنید`,
        { remainingSec },
      )
    }

    const otp = generateOTP()
    const otpExpireAt = new Date(Date.now() + 2 * 60 * 1000)

    if (!user) {
      user = await User.create({ mobile, otp, otpExpireAt })
    } else {
      user.otp = otp
      user.otpExpireAt = otpExpireAt
      await user.save()
    }

    const remainingMs = otpExpireAt.getTime() - Date.now()
    const remainingSec = Math.ceil(remainingMs / 1000)

    return successResponse<SendOtpData>(event, 200, 'کد ارسال شد', {
      otp,
      remainingSec,
    })
  } catch (err: any) {
    return errorResponse(event, 500, 'خطای سرور', err.message)
  }
})
