import { z } from 'zod'
import { mobileRegex } from '../constant/regex'

export const sendOtpSchema = z.object({
  body: z.object({
    mobile: z
      .string({ error: 'شماره موبایل الزامی است' })
      .regex(mobileRegex, 'فرمت شماره موبایل معتبر نیست'),
  }),
})

export const verifyOtpSchema = z.object({
  body: z.object({
    mobile: z
      .string({ error: 'شماره موبایل الزامی است' })
      .regex(/^09[0-9]{9}$/, 'فرمت شماره موبایل معتبر نیست'),

    otp: z
      .string({ error: 'کد تایید الزامی است' })
      .length(6, { message: 'کد تایید باید 6 رقم باشد' }),
  }),
})
