import { z } from 'zod'
import { slugRegex } from '../../shared/constant/regex'

export const upsertSpecialtySchema = z.object({
  body: z.object({
    persianName: z
      .string({ error: 'نام فارسی تخصص باید رشته باشد' })
      .trim()
      .min(1, { message: 'نام فارسی تخصص الزامی است' })
      .min(2, { message: 'نام فارسی تخصص باید حداقل ۲ کاراکتر باشد' })
      .max(50, { message: 'نام فارسی تخصص حداکثر می‌تواند ۵۰ کاراکتر باشد' }),

    englishName: z
      .string({ error: 'نام انگلیسی تخصص باید رشته باشد' })
      .trim()
      .min(1, { message: 'نام انگلیسی تخصص الزامی است' })
      .min(2, { message: 'نام انگلیسی باید حداقل ۲ کاراکتر باشد' })
      .max(50, { message: 'نام انگلیسی حداکثر می‌تواند ۵۰ کاراکتر باشد' }),

    slug: z
      .string({ error: 'اسلاگ باید رشته باشد' })
      .trim()
      .min(1, { message: 'اسلاگ الزامی است' })
      .min(2, { message: 'اسلاگ باید حداقل ۲ کاراکتر باشد' })
      .max(50, { message: 'اسلاگ حداکثر می‌تواند ۵۰ کاراکتر باشد' })
      .regex(slugRegex, {
        message: 'اسلاگ فقط می‌تواند شامل حروف کوچک انگلیسی و خط تیره باشد',
      }),
  }),
})
