import mongoose from 'mongoose'

import { timeRegex, dateRegex } from '~~/server/constant/regex'

const ReservationSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'شناسه پزشک الزامی است.'],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'شناسه کاربر الزامی است.'],
    },

    date: {
      type: String,
      required: [true, 'تاریخ نوبت الزامی است.'],
      match: [dateRegex, 'فرمت تاریخ نامعتبر است. فرمت صحیح: YYYY-MM-DD'],
    },

    time: {
      type: String,
      required: [true, 'ساعت نوبت الزامی است.'],
      match: [timeRegex, 'فرمت ساعت نامعتبر است. فرمت صحیح: HH:mm'],
    },

    status: {
      type: String,
      enum: {
        values: ['pending', 'reserved', 'canceledByDoctor', 'canceledByUser'],
        message: 'وضعیت وارد شده معتبر نیست.',
      },
      default: 'pending',
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, 'توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.'],
    },
  },
  { timestamps: true },
)

/* ایندکس‌ها برای سرعت */
ReservationSchema.index({ doctorId: 1, date: 1 })
ReservationSchema.index({ userId: 1, date: 1 })

module.exports = mongoose.model('Reservation', ReservationSchema)
