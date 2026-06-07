import { useMutation } from '@tanstack/vue-query'

export function useSendOtp() {
  return useMutation({
    mutationFn: (mobile: string) => {
      return $fetch('/api/auth/send-otp', {
        method: 'POST',
        body: { mobile },
      })
    },
  })
}
