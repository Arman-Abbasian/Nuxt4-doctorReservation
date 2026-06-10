import { Comment } from '~~/server/model/Comment'
import { successResponse, errorResponse } from '~~/server/utils/response'
import { objectIdSchema } from '~~/server/validator/generalValidator'

export default defineEventHandler(async (event) => {
  try {
    authorizeMiddleware(event, 'admin')

    await validateMiddleware(event, objectIdSchema)

    return deactivateItem(event, Comment, 'نظر')
  } catch (err: any) {
    console.error('Error in admin comments patch handler:', err)
    return errorResponse(
      event,
      err.statusCode || 500,
      'خطا در بروزرسانی وضعیت نظر.',
      err.message,
    )
  }
})
