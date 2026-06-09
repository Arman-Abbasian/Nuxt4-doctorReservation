import { z } from 'zod'
import { Types } from 'mongoose'

const objectId = z
  .string()
  .trim()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: 'شناسه معتبر نیست',
  })

export const objectIdSchema = z.object({
  params: z.object({
    id: objectId,
  }),
})
