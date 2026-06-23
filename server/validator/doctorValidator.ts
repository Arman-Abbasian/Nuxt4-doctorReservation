import { z } from 'zod'
import { WeekDay, weekDayEnum } from '../../shared/constant/enum'
import { timeRegex } from '../../shared/constant/regex'
import mongoose from 'mongoose'

export const updateDoctorProfileSchema = z.object({
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
    specialty: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'تخصص معتبر نمی‌باشد',
      })
      .optional(),
    visitPrice: z
      .number()
      .positive('قیمت ویزیت باید یک عدد مثبت باشد')
      .optional(),
    bio: z
      .string()
      .max(1000, 'توضیحات پزشک نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد')
      .optional(),
  }),
})

export const updateDayScheduleSchema = z.object({
  body: z
    .object({
      day: z
        .string({
          error: 'روز هفته الزامی است',
        })
        .refine((val: any) => weekDayEnum.includes(val), {
          message: 'روز انتخاب شده معتبر نیست',
        }),
      start: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? 'ساعت شروع الزامی است'
              : 'ساعت شروع معتبر نیست',
        })
        .regex(timeRegex, 'فرمت ساعت شروع باید HH:mm باشد (مثلاً 08:30)'),
      end: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? 'ساعت پایان الزامی است'
              : 'ساعت پایان معتبر نیست',
        })
        .regex(timeRegex, 'فرمت ساعت پایان باید HH:mm باشد (مثلاً 14:00)'),
    })
    .refine(
      (data) => {
        const startTime = parseInt(data.start.replace(':', ''))
        const endTime = parseInt(data.end.replace(':', ''))
        return endTime >= startTime
      },
      {
        message: 'ساعت پایان باید بعد از ساعت شروع باشد',
        path: ['end'],
      },
    ),
})
