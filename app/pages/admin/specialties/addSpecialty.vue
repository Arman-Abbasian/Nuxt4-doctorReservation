<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { slugRegex } from '~~/shared/constant/regex'
import { useAddSpecialty } from '~/composables/api/admin/mutations/useAddSpecialty'

//schema
const schema = toTypedSchema(
  z.object({
    persianName: z
      .string()
      .min(2, 'حداقل 2 کاراکتر وارد کنید')
      .max(50, 'حداکثر 50 کاراکتر وارد کنید'),
    englishName: z
      .string()
      .min(2, 'حداقل 2 کاراکتر وارد کنید')
      .max(50, 'حداکثر 50 کاراکتر وارد کنید'),
    slug: z
      .string()
      .regex(slugRegex, 'اسلاگ می تواند فقط شامل حروف انگلیسی و - باشد'),
  }),
)

//hooks
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})
const { value: persianName, errorMessage: persianNameErrorMessage } =
  useField<string>('persianName')

const { value: englishName, errorMessage: englishNameErrorMessage } =
  useField<string>('englishName')

const { value: slug, errorMessage: slugErrorMessage } = useField<string>('slug')

//API
const AddSpecialty = useAddSpecialty()

//handlers
const onSubmit = handleSubmit(async (values) => {
  try {
    await AddSpecialty.mutateAsync(values)
    resetForm()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4 w-full">
    <div class="max-w-md flex flex-col gap-6">
      <InputComp
        v-model="persianName"
        label="نام فارسی"
        placeholder="قلب و عروق"
        :error="persianNameErrorMessage"
      >
        <Icon name="lucide:letter-text" size="24px" />
      </InputComp>
      <InputComp
        v-model="englishName"
        label="نام انگلیسی"
        placeholder="Cardiologist"
        :error="englishNameErrorMessage"
        dir="ltr"
      >
        <Icon name="lucide:letter-text" size="24px" />
      </InputComp>

      <InputComp
        v-model="slug"
        label="اسلاگ"
        placeholder="Cardiologist-specialty"
        :error="slugErrorMessage"
        dir="ltr"
      >
        <Icon name="lucide:letter-text" size="24px" />
      </InputComp>

      <ButtonComp
        @click="onSubmit"
        :loading="AddSpecialty.isPending.value"
        :disabled="AddSpecialty.isPending.value"
      />
    </div>
  </form>
</template>
