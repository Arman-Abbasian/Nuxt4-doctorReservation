<script setup lang="ts">
//props
const props = defineProps({
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

//emit
const emit = defineEmits(['click'])
</script>
<template>
  <UButton
    class="flex justify-center p-3"
    :loading="loading"
    :disabled="disabled"
    loading-icon="i-lucide-loader"
    @click="emit('click')"
    >ارسال</UButton
  >
</template>
