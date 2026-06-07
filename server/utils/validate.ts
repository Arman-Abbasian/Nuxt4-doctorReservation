import { readBody, getQuery, getRouterParams, createError } from 'h3'
import type { ZodType } from 'zod'

export async function validateMiddleware(event: any, schema: ZodType<any>) {
  try {
    const data = {
      params: getRouterParams(event),
      query: getQuery(event),
      body: await readBody(event),
    }

    return schema.parse(data)
  } catch (error: any) {
    const zodErrors = error?.issues || error?.errors

    if (zodErrors) {
      const formatted = zodErrors.map((err: any) => ({
        field: err.path.slice(1).join('.'),
        message: err.message,
      }))

      throw createError({
        statusCode: 400,
        statusMessage: 'خطای اعتبارسنجی',
        data: formatted,
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'خطای سرور',
    })
  }
}
