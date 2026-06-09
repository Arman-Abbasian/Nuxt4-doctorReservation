import { Specialty } from '~~/server/model/Specialty'
import { upsertSpecialtySchema } from '~~/server/validator/adminValidator'

export default defineEventHandler(async (event) => {
  try {
    const { slug, persianName, englishName, icon } = await validateMiddleware(
      event,
      upsertSpecialtySchema,
    )

    const query = {
      $or: [{ slug }, { persianName }, { englishName }],
    }

    const existingSpecialty = await Specialty.findOne(query as any).lean()

    if (existingSpecialty) {
      return errorResponse(event, 400, 'این تخصص یا اسلاگ قبلاً ثبت شده است')
    }

    // 3. ایجاد تخصص
    const specialty = await Specialty.create({
      persianName,
      englishName,
      slug,
      icon,
    })

    return successResponse(event, 201, 'تخصص با موفقیت ایجاد شد', specialty)
  } catch (error: any) {
    if (error?.code === 11000) {
      return errorResponse(event, 400, 'اطلاعات وارد شده تکراری است')
    }

    return errorResponse(
      event,
      error?.statusCode || 500,
      error?.statusMessage || 'خطای سرور در ایجاد تخصص',
      process.env.NODE_ENV === 'development' ? error?.message : null,
    )
  }
})
