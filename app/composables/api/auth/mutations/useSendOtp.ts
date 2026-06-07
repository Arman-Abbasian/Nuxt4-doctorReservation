import { useMutation } from '@tanstack/vue-query'
import { type SendOtpData } from '~~/shared/types/auth'
import { type ApiResponse } from '~~/shared/types/types'

export function useSendOtp() {
  return useMutation({
    mutationFn: (mobile: string) => {
      return $fetch<ApiResponse<SendOtpData>>('/api/auth/send-otp', {
        method: 'POST',
        body: { mobile },
      })
    },
  })
}

export function useVerifyOtp() {
  return useMutation({
    // 2. ورودی رو به صورت یک آبجکت دریافت کن
    mutationFn: (payload: { mobile: string; otp: string }) => {
      return $fetch('/api/auth/verify-otp', {
        method: 'POST',
        body: payload, // اینجا آبجکت رو مستقیم بفرست
      })
    },
  })
}
