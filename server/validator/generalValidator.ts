import mongoose from 'mongoose'
import { z } from 'zod'

export const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'شناسه معتبر نیست',
  })

export const objectIdSchema = z.object({
  params: z.object({
    id: objectId,
  }),
})
