import { Comment } from '~~/server/model/Comment'
import { successResponse, errorResponse } from '~~/server/utils/response'
import { objectIdSchema } from '~~/server/validator/generalValidator'

export default defineEventHandler(async (event) => {
  try {
    authorizeMiddleware(event, 'admin')
    const { id } = await validateMiddleware(event, objectIdSchema)

    const body = await readBody(event)
    const { status } = body

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return errorResponse(
        event,
        400,
        'وضعیت باید یکی از pending, approved, rejected باشد.',
      )
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { status },
      {
        lean: true,
        includeResultMetadata: true,
      },
    )

    if (!updatedComment) {
      return errorResponse(event, 404, `نظر با شناسه ${id} یافت نشد.`)
    }

    return successResponse(event, 200, 'وضعیت نظر با موفقیت بروزرسانی شد.')
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
