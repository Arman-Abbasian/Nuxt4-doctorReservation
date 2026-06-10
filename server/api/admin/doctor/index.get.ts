import { User } from '~~/server/model/User'
import { successResponse, errorResponse } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
  try {
    const users = await User.find({
      role: 'doctor',
      isActive: true,
    }).select(
      '-otp -otpExpireAt -refreshToken -__v -createdAt -updatedAt -isActive -role',
    )

    return successResponse(event, 200, 'لیست پزشکان', users)
  } catch (err: any) {
    return errorResponse(event, 500, 'خطای سرور', err.message)
  }
})
