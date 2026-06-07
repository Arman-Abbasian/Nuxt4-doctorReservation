import { z } from 'zod'
import mongoose from 'mongoose'

export const addCommentSchema = z.object({
  body: z.object({
    doctorId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'شناسه دکتر معتبر نیست',
    }),

    reservationId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'شناسه رزرو معتبر نیست',
      }),

    rating: z
      .number()
      .min(1, 'حداقل امتیاز 1 است')
      .max(5, 'حداکثر امتیاز 5 است'),

    comment: z
      .string()
      .trim()
      .max(1000, 'حداکثر طول متن نظر 1000 کاراکتر است')
      .optional(),
  }),
})

export const changeCommentStatusSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'approved', 'rejected'], {
      error:
        'وضعیت نظر معتبر نیست. فقط یکی از مقادیر pending، approved یا rejected مجاز است.',
    }),
  }),
})
