import { Specialty } from '~~/server/model/Specialty'
import { User } from '~~/server/model/User'
import { upsertSpecialtySchema } from '~~/server/validator/adminValidator'

export default defineEventHandler(async (event) => {
  try {
    const { body: updates } = await validateMiddleware(
      event,
      upsertSpecialtySchema,
    )
    const userId = event.context.user?.userId

    const doctor = await User.findById(userId)

    if (!doctor) {
      return errorResponse(event, 404, 'پروفایل یافت نشد')
    }

    if (updates.specialty) {
      const exists = await Specialty.exists({ _id: updates.specialty })

      if (!exists) {
        return errorResponse(event, 400, 'تخصص انتخاب‌شده معتبر نیست')
      }
    }

    const directFields = ['firstName', 'lastName'] as const
    const doctorInfoFields = ['bio', 'visitPrice', 'specialty'] as const

    directFields.forEach((field) => {
      if (updates[field] !== undefined) {
        doctor[field] = updates[field]
      }
    })

    doctorInfoFields.forEach((field) => {
      if (updates[field] !== undefined && doctor.doctorInfo) {
        doctor.doctorInfo[field] = updates[field]
      }
    })

    doctor.isProfileCompleted = checkDoctorProfileCompletion(doctor)

    await doctor.save()

    return successResponse(event, 200, 'پروفایل با موفقیت بروزرسانی شد')
  } catch (err: any) {
    return errorResponse(
      event,
      500,
      'خطا در بروزرسانی پروفایل',
      err?.message || 'خطای ناشناخته',
    )
  }
})
