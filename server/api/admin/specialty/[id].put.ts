import { Specialty } from '~~/server/model/Specialty'
import { upsertSpecialtySchema } from '~~/server/validator/adminValidator'
import { objectIdSchema } from '~~/server/validator/generalValidator'

export default defineEventHandler(async (event) => {
  try {
    const { id } = await validateMiddleware(event, objectIdSchema)

    const { englishName, persianName, slug, icon } = await validateMiddleware(
      event,
      upsertSpecialtySchema,
    )

    const updated = await Specialty.findByIdAndUpdate(
      id,
      {
        englishName,
        persianName,
        slug,
        icon,
      },
      {
        new: true,
        lean: true,
        includeResultMetadata: true,
      },
    )

    if (!updated) {
      return errorResponse(event, 404, 'تخصص پیدا نشد')
    }

    return successResponse(event, 200, 'تخصص بروزرسانی شد')
  } catch (error: any) {
    if (error?.code === 11000) {
      return errorResponse(event, 400, 'اطلاعات وارد شده تکراری است')
    }

    return errorResponse(
      event,
      error?.statusCode || 500,
      error?.statusMessage || 'خطای سرور',
      process.env.NODE_ENV === 'development' ? error?.message : null,
    )
  }
})
