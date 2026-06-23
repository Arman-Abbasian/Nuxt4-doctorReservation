import mongoose, { Schema, type InferSchemaType } from 'mongoose'
import { dateRegex, timeRegex } from '~~/shared/constant/regex'

const ReservationSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'شناسه پزشک الزامی است.'],
    },

    userId: {
      type: Schema.Types.ObjectId,
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
        message: 'وضعیت {VALUE} معتبر نیست.',
      },
      default: 'pending',
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, 'توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.'],
    },
  },
  {
    timestamps: true,
  },
)

ReservationSchema.index({ doctorId: 1, date: 1 })
ReservationSchema.index({ userId: 1, date: 1 })

export type ReservationDocument = InferSchemaType<typeof ReservationSchema> & {
  _id: mongoose.Types.ObjectId
}

export const Reservation =
  mongoose.models.Reservation ||
  mongoose.model('Reservation', ReservationSchema)
