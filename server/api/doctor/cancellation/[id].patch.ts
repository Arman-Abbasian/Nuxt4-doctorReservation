import { Reservation } from '~~/server/model/Reservation'
import { successResponse, errorResponse } from '~~/server/utils/response'
import { objectIdSchema } from '~~/server/validator/generalValidator'

export default defineEventHandler(async (event) => {
  try {
    await validateMiddleware(event, objectIdSchema)
    const doctorId = event.context.user?.userId
    const reservationId = event.context.params?.id

    if (!doctorId) {
      return errorResponse(event, 401, 'کاربر احراز هویت نشده است', null)
    }

    if (!reservationId) {
      return errorResponse(event, 400, 'شناسه رزرو ارسال نشده است', null)
    }

    const reservation = await Reservation.findOne({
      _id: reservationId,
      doctorId,
      status: { $in: ['reserved'] },
    })

    if (!reservation) {
      return errorResponse(event, 404, 'رزرو پیدا نشد یا قابل کنسل نیست', null)
    }

    reservation.status = 'canceledByDoctor'
    await reservation.save()

    return successResponse(event, 200, 'رزرو با موفقیت کنسل شد', reservation)
  } catch (err: any) {
    return errorResponse(
      event,
      500,
      'خطا در کنسل کردن رزرو',
      err?.message || 'خطای ناشناخته',
    )
  }
})
