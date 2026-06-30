import { Specialty } from '~~/server/model/Specialty'
import { successResponse, errorResponse } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
  try {
    const specialties = await Specialty.find().select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      icon: 0,
    })

    return successResponse(event, 200, 'لیست تخصص ها', specialties)
  } catch (err: any) {
    return errorResponse(event, 500, 'خطای سرور', err.message)
  }
})
