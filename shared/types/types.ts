export interface ApiSuccessResponse<T = unknown> {
  isSuccess: true
  message: string
  data: T | null
  error: null
}

export interface ApiErrorResponse {
  isSuccess: false
  message: string
  data: null
  error: any | null
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse
