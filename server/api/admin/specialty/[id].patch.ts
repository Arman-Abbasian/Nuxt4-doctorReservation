import { Specialty } from '~~/server/model/Specialty'
import { deactivateItem } from '~~/server/utils/deactivateItem'
import { objectIdSchema } from '~~/server/validator/generalValidator'

export default defineEventHandler(async (event) => {
  await validateMiddleware(event, objectIdSchema)

  return deactivateItem(event, Specialty, 'تخصص')
})
