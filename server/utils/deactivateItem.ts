import { getRouterParam } from 'h3'
import type { H3Event } from 'h3'
import type { Model } from 'mongoose'
import { successResponse, errorResponse } from './response'

export async function deactivateItem<T extends { isActive: boolean }>(
  event: H3Event,
  Model: Model<T>,
  name: string,
) {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      return errorResponse(event, 400, 'شناسه معتبر نیست')
    }

    const item = await Model.findById(id)

    if (!item) {
      return errorResponse(event, 404, `${name} پیدا نشد`)
    }

    item.isActive = !item.isActive
    await item.save()

    return successResponse(
      event,
      200,
      `${name} ${item.isActive ? 'غیرفعال' : 'فعال'} شد`,
    )
  } catch (err: any) {
    return errorResponse(event, 500, 'خطای سرور', err.message)
  }
}
