<script setup lang="ts">
const props = defineProps<{
  iconName: string
  englishName: string
  persianName: string
  slug: string
  isActive: boolean
}>()

const emit = defineEmits(['update:isActive'])
</script>

<template>
  <div class="w-64 h-56 bg-secondary rounded-md p-3 flex flex-col gap-5">
    <div class="flex justify-center items-center">
      <Icon
        :name="iconName"
        size="36px"
        class="w-10 h-10 rounded-full bg-primary p-1"
      />
    </div>

    <div class="flex flex-col gap-4">
      <p>نام فارسی: {{ persianName }}</p>
      <p>نام انگلیسی: {{ englishName }}</p>
      <p class="flex items-center gap-2">نام اسلاگ: {{ slug }}</p>

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
