<script setup lang="ts">
const props = defineProps<{
  iconName: string
  userName: string
  userMobile: string
  isActive: boolean
}>()

const emit = defineEmits(['update:isActive'])
</script>

<template>
  <div class="w-52 h-52 bg-secondary rounded-md p-3 flex flex-col gap-5">
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
