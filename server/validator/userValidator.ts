import { z } from 'zod'
import mongoose from 'mongoose'
//contants
import { dateRegex, timeRegex } from '../../shared/constant/regex'

export const updateUserProfileSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
      .max(50, 'نام باید حداکثر 50 کاراکتر باشد')
      .optional(),
    lastName: z
      .string()
      .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')
      .max(50, 'نام خانوادگی باید حداکثر 50 کاراکتر باشد')
      .optional(),
  }),
})

export const reservationSchema = z.object({
  body: z.object({
    doctorId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'doctorId معتبر نیست',
    }),
    date: z.string().regex(dateRegex, 'فرمت تاریخ باید YYYY/MM/DD باشد'),
    time: z.string().regex(timeRegex, 'فرمت ساعت باید HH:mm باشد'),
  }),
})
