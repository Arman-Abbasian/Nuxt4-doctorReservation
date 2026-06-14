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
  <div class="w-44 h-20 bg-secondary rounded-md p-3">
    <Icon :name="iconName" size="36px" />

    <div>
      <p>نام: {{ userName }}</p>
      <p>موبایل: {{ userMobile }}</p>

      <USwitch
        :model-value="isActive"
        @update:model-value="emit('update:isActive', $event)"
      />
    </div>
  </div>
</template>
