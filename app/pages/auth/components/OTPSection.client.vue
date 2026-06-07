<script setup lang="ts">
import { ref } from 'vue'
import VOtpInput from 'vue3-otp-input'
import { useSendOtp } from '~/composables/api/auth/mutations/useSendOtp'

//refs
const otpValue = ref('')
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null)

//props
const props = defineProps<{
  mobile: string
  OTPTime: number
}>()

//emits
const emit = defineEmits(['backToMobile'])

//hooks
const { formattedTime, remainingSeconds, startTimer, stopTimer } = useTimer()

onMounted(() => {
  startTimer(props.OTPTime ?? 120)
})

//API
const { data, mutate, isPending, error } = useSendOtp()

onUnmounted(() => {
  stopTimer()
})

//handlers
const backToMobileHandler = () => {
  emit('backToMobile')
}

const handleOnComplete = (value: string) => {
  console.log('api call', { otp: value, mobile: props.mobile })
}

const resendCodeHandler = () => {
  mutate(props.mobile, {
    onSuccess(response) {
      startTimer(response?.data?.remainingSec || 120)
    },
  })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4" dir="ltr">
    <p @click="backToMobileHandler">تغییر شماره موبایل</p>
    <p>ورود کد ارسالی</p>
    <v-otp-input
      :num-inputs="6"
      ref="otpInput"
      input-type="letter-numeric"
      :should-auto-focus="true"
      @on-change="(val) => (otpValue = val)"
      @on-complete="handleOnComplete"
      input-classes="flex h-12 w-12 items-center justify-center 
      rounded-md border border-input px-3 py-2 text-sm bg-background
      ring-offset-background focus-visible:outline-none mx-1
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50 text-center text-lg font-bold"
    />
    <!-- timer section -->
    <div class="text-sm text-muted-foreground">
      <template v-if="remainingSeconds > 0">
        {{ formattedTime }}
      </template>

      <button
        v-else
        type="button"
        class="text-primary font-medium"
        @click="resendCodeHandler"
      >
        ارسال مجدد کد
      </button>
    </div>
  </div>
</template>
