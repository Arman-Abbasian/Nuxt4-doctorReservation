import { Comment } from '~~/server/model/Comment'
import { successResponse, errorResponse } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
  try {
    authorizeMiddleware(event, 'admin')
    const comments = await Comment.find()

    return successResponse(event, 200, 'لیست نظرات', comments)
  } catch (err: any) {
    return errorResponse(event, 500, 'خطای سرور', err.message)
  }
})
