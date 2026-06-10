import { successResponse, errorResponse } from '~~/server/utils/response'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { addCommentSchema } from '~~/server/validator/commentValidator'
import { Reservation, ReservationDocument } from '~~/server/model/Reservation'
import { Comment } from '~~/server/model/Comment'
import mongoose from 'mongoose'

dayjs.extend(utc)
dayjs.extend(timezone)

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user
    const userId = user?.userId

    const { doctorId, reservationId, rating, comment } =
      await validateMiddleware(event, addCommentSchema)

    const reservation = await Reservation.findOne({
      _id: new mongoose.Types.ObjectId(reservationId),
      userId,
      doctorId,
    })

    if (!reservation) {
      return errorResponse(event, 400, 'رزرو یافت نشد')
    }

    if (reservation.status !== 'reserved') {
      return errorResponse(event, 400, 'امکان ثبت نظر برای این رزرو وجود ندارد')
    }

    const reservationDateTime = dayjs.tz(
      `${reservation.date} ${reservation.time}`,
      'YYYY-MM-DD HH:mm',
      'Asia/Tehran',
    )

    const now = dayjs().tz('Asia/Tehran')

    const limitTime = reservationDateTime.add(1, 'hour')

    if (now.isBefore(limitTime)) {
      return errorResponse(
        event,
        400,
        'امکان ثبت نظر یک ساعت بعد از ویزیت آغاز می شود',
      )
    }

    const alreadyCommented = await Comment.exists({ reservationId })

    if (alreadyCommented) {
      return errorResponse(event, 400, 'قبلاً برای این ویزیت نظر ثبت شده است')
    }

    await Comment.create({
      doctorId,
      userId,
      reservationId,
      rating,
      comment,
    })

    return successResponse(event, 201, 'نظر ثبت شد و در انتظار تأیید است')
  } catch (error: any) {
    return errorResponse(event, 500, 'خطا در ثبت نظر', error.message)
  }
})
