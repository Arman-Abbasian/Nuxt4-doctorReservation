import { Specialty } from '~~/server/model/Specialty'
import { successResponse, errorResponse } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
  try {
    const specialties = await Specialty.find({
      isActive: true,
    })

    return successResponse(event, 200, 'لیست پزشکان', specialties)
  } catch (err: any) {
    return errorResponse(event, 500, 'خطای سرور', err.message)
  }
})
