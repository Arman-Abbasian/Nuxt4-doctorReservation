import { User } from '~~/server/model/User'
import { deactivateItem } from '~~/server/utils/deactivateItem'
import { objectIdSchema } from '~~/server/validator/generalValidator'

export default defineEventHandler(async (event) => {
  await validateMiddleware(event, objectIdSchema)

  return deactivateItem(event, User, 'کاربر')
})
