<script setup lang="ts">
const props = defineProps<{
  iconName: string
  userName: string
  userMobile: string
  isActive: boolean
  isProfileComplete: boolean
}>()

const emit = defineEmits(['update:isActive'])
</script>

<template>
  <div class="w-56 h-56 bg-secondary rounded-md p-3 flex flex-col gap-5">
    <div class="flex justify-center items-center">
      <Icon
        :name="iconName"
        size="36px"
        class="w-10 h-10 rounded-full bg-primary p-1"
      />
    </div>

    <div class="flex flex-col gap-4">
      <p>نام: {{ userName }}</p>
      <p>موبایل: {{ userMobile }}</p>
      <p class="flex items-center gap-2">
        تکمیل پروفایل:

        <Icon
          v-if="isProfileComplete"
          name="lucide:user-check"
          class="text-green-800"
        />

        <Icon v-else name="lucide:user-lock" class="text-red-800" />
      </p>

      <div class="flex items-center gap-1">
        <p>وضعیت:</p>
        <USwitch
          :model-value="isActive"
          @update:model-value="emit('update:isActive', $event)"
          dir="rtl"
        />
      </div>
    </div>
  </div>
</template>
