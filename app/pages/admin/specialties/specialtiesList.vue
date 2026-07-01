<script setup lang="ts">
import SpecilatyCart from '~/components/specilatyCart.vue'
import { useToggleSpecialtyActivation } from '~/composables/api/admin/mutations/useToggleSpecialtyActivation'
import { useAdminSpecialtyQuery } from '~/composables/api/admin/queries/useAdminSpecialtyQuery'
import { type SpecialtyAdminType } from '~~/shared/types/specialty'

//emit
const emit = defineEmits(['edit'])

//API
const { data: initialSpecialties } = await useFetch<
  ApiResponse<SpecialtyAdminType[]>
>('/api/admin/specialty', {
  key: 'admin-specialties-list',
})

const { data: specialties, isFetching: specialtiesLoading } =
  useAdminSpecialtyQuery(initialSpecialties.value)

const toggleSpecialtyActivation = useToggleSpecialtyActivation()

const toggleStatus = async (id: string, currentStatus: boolean) => {
  try {
    await toggleSpecialtyActivation.mutateAsync({
      specialtyId: id,
      isActive: currentStatus,
    })
  } catch (err) {
    alert('خطا در تغییر وضعیت')
  }
}

const editHandler = (id: string) => {
  const findItem = specialties?.value?.data?.find((item) => item._id == id)
  if (findItem) emit('edit', findItem)
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">لیست پزشکان</h1>

    <div v-if="toggleSpecialtyActivation.isPending.value" class="animate-pulse">
      در حال بارگذاری...
    </div>

    <div v-else class="flex gap-4 flex-wrap rounded-lg shadow">
      <SpecilatyCart
        v-for="item in specialties?.data || []"
        iconName="lucide:user-round"
        :key="item._id"
        :persian-name="item.persianName"
        :english-name="item.englishName"
        :slug="item.slug"
        :isActive="item.isActive"
        @update:isActive="(value) => toggleStatus(item._id, value)"
        @edit="editHandler(item._id)"
      />
    </div>
  </div>
</template>
