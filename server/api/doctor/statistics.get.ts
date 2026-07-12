import mongoose from 'mongoose'
import { Reservation } from '~~/server/model/Reservation'
import { User } from '~~/server/model/User'

export default defineEventHandler(async (event) => {
  try {
    const doctorId = event.context.user.userId

    const doctor = await User.findById(doctorId).select('createdAt')

    if (!doctor) {
      return errorResponse(event, 404, 'دکتر پیدا نشد')
    }
    if (doctor.createdAt) {
      const daysOnPlatform = Math.floor(
        (Date.now() - doctor.createdAt.getTime()) / (1000 * 60 * 60 * 24),
      )

      const totalReservations = await Reservation.countDocuments({ doctorId })

      const reservationsByDate = await Reservation.aggregate([
        {
          $match: {
            doctorId: new mongoose.Types.ObjectId(doctorId),
          },
        },
        {
          $group: {
            _id: '$date',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])

      return successResponse(event, 200, 'آمار دکتر', {
        daysOnPlatform,
        totalReservations,
        reservationsByDate,
      })
    } else {
      return errorResponse(event, 500, 'تاریخ ثبت دکتر پیدا نشد')
    }
  } catch (err: any) {
    return errorResponse(event, 500, 'خطا در دریافت آمار', err.message)
  }
})
