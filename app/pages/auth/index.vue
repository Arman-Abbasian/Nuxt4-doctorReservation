<script lang="ts" setup>
definePageMeta({
  ssr: false,
})

import { useSendOtp } from '~/composables/api/auth/mutations/useSendOtp.js'
import MobileSection from './components/mobileSection.vue'
import OTPSection from './components/OTPSection.client.vue'

//refs
const componentNumber = ref(1)
const mobile = ref<string>('')
const otp = ref<string>('')

//API
const { data, mutate: SendOtpMutate, isPending, error } = useSendOtp()

//handler
const handleSubmit = () => {
  SendOtpMutate(mobile.value, {
    onSuccess(data) {
      otp.value = data.data?.otp ?? ''
      componentNumber.value = 2
    },
  })
}

const resendOTPHandler = (OTP: string) => {
  otp.value = OTP
}
</script>

<template>
  <div class="flex justify-center mx-auto max-w-md">
    <MobileSection
      v-if="componentNumber === 1"
      v-model:parent-mobile="mobile"
      @submitted="handleSubmit"
    />
    <OTPSection
      v-if="componentNumber === 2"
      :mobile="mobile"
      :otp="otp"
      @back-to-mobile="componentNumber = 1"
      @on-resend-otp="resendOTPHandler"
      :OTPTime="data?.data?.remainingSec || 120"
    />
  </div>
</template>
