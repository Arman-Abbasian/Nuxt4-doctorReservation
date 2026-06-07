<!-- components/mobileSection.vue -->
<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

//props
const props = defineProps<{
  parentMobile: string
}>()

//emits
const emit = defineEmits(['update:parentMobile', 'submitted'])

//schema
const schema = toTypedSchema(
  z.object({
    mobile: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست!'),
  }),
)

//hooks
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    mobile: props.parentMobile,
  },
})

const { value: mobile, errorMessage } = useField<string>('mobile')

//handlers
const onSubmit = handleSubmit((values) => {
  emit('update:parentMobile', values.mobile)
  emit('submitted')
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4 w-full">
    <InputComp
      v-model="mobile"
      label="شماره موبایل"
      placeholder="09123456789"
      :error="errorMessage"
      dir="ltr"
    >
      <Icon name="lucide:smartphone" size="24px" />
    </InputComp>

    <button
      type="submit"
      class="bg-primary text-primary-foreground rounded-lg py-2"
    >
      ارسال
    </button>
  </form>
</template>
