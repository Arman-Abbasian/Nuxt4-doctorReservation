import type { H3Event } from 'h3'
import { setResponseStatus } from 'h3'

export function successResponse<T = unknown>(
  event: H3Event,
  statusCode: number,
  message: string,
  data: T | null = null,
) {
  setResponseStatus(event, statusCode)

  return {
    isSuccess: true,
    message,
    data,
    error: null,
  }
}

export function errorResponse(
  event: H3Event,
  statusCode: number,
  message: string,
  error: unknown = null,
) {
  setResponseStatus(event, statusCode)

  return {
    isSuccess: false,
    message,
    data: null,
    error,
  }
}
