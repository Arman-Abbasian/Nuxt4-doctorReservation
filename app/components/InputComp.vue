<script setup lang="ts">
//props
const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  error: String,
  dir: {
    type: String,
    default: 'rtl',
  },
  type: {
    type: String,
    default: 'text',
  },
})

//emit
const emit = defineEmits(['update:modelValue'])

//handlers
const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" class="text-sm font-medium text-foreground">
      {{ label }}
    </label>

    <div
      class="flex items-center gap-2 border rounded-lg px-3 py-2"
      :dir="dir"
      :class="[
        error
          ? 'border-red-500'
          : 'border-secondary focus-within:border-secondary-foreground',
      ]"
    >
      <input
        :type="type"
        :value="modelValue"
        placeholder="09121472589"
        @input="updateValue"
        class="!flex-1 outline-none text-sm bg-transparent"
        :dir="dir"
      />

      <div
        v-if="$slots.default"
        class="flex items-center justify-center shrink-0"
      >
        <slot />
      </div>
    </div>

    <span v-if="error" class="text-xs text-red-500">
      {{ error }}
    </span>
  </div>
</template>
