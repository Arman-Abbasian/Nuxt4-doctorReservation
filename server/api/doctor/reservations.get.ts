import { Reservation } from '~~/server/model/Reservation'
import { successResponse, errorResponse } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
  try {
    const doctorId = event.context.user?.userId

    if (!doctorId) {
      return errorResponse(event, 401, 'کاربر احراز هویت نشده است', null)
    }

    const reservations = await Reservation.find({ doctorId })
      .populate('userId', 'firstName lastName mobile')
      .sort({ date: 1, time: 1 })

    return successResponse(event, 200, 'لیست نوبت‌ها', reservations)
  } catch (err: any) {
    return errorResponse(
      event,
      500,
      'خطا در دریافت نوبت‌ها',
      err?.message || 'خطای ناشناخته',
    )
  }
})
