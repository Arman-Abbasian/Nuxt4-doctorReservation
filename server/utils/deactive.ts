import { successResponse, errorResponse } from './response'

const deactivateItem = async (Model, req, res, name, role) => {
  try {
    const { id } = req.params

    const item = await Model.findById(id)
    if (!item) return errorResponse(res, 404, `${name} پیدا نشد`, null)

    item.isActive = !item.isActive
    await item.save()

    return successResponse(
      res,
      200,
      `${name} ${item.isActive ? 'غیرفعال' : 'فعال'} شد`,
    )
  } catch (err) {
    return errorResponse(res, 500, 'خطای سرور', err.message)
  }
}
module.exports = { deactivateItem }
