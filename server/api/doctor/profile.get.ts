import { User } from '~~/server/model/User'
import { successResponse, errorResponse } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
  try {
    const auth = await authenticateMiddleware(event)
    if (!auth.ok) {
      return auth.response
    }
    const authorize = authorizeMiddleware(event, 'doctor')
    if (!authorize?.ok) {
      return authorize?.response
    }

    const doctorId = event.context.user.userId

    const doctor = await User.findById(doctorId)
      .select({
        _id: 0,
        otp: 0,
        otpExpireAt: 0,
        refreshToken: 0,
        role: 0,
        __v: 0,
      })
      .populate({
        path: 'doctorInfo.specialty',
        select: 'persianName englishName',
      })
    console.log({ doctor })

    if (!doctor || doctor.role !== 'doctor') {
      return errorResponse(event, 404, 'دکتر یافت نشد')
    }

    // ۴. بازگرداندن پاسخ موفقیت‌آمیز
    return successResponse(event, 200, 'پروفایل دکتر', doctor)
  } catch (err: any) {
    return errorResponse(
      event,
      500,
      'خطا در دریافت پروفایل',
      err?.message || 'خطای ناشناخته سرور',
    )
  }
})
