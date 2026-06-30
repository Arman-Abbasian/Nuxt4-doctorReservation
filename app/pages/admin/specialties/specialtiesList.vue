<script setup lang="ts">
import SpecilatyCart from '~/components/specilatyCart.vue'
import { useToggleDoctorActivation } from '~/composables/api/admin/mutations/useToggleDoctorActivation'
import { useAdminSpecialtyQuery } from '~/composables/api/admin/queries/useAdminSpecialtyQuery'
import { type SpecialtyAdminType } from '~~/shared/types/specialty'

//API
const { data: initialSpecialties } = await useFetch<
  ApiResponse<SpecialtyAdminType[]>
>('/api/admin/specialty', {
  key: 'admin-specialties-list',
})
console.log(initialSpecialties.value)
const { data: specialties, isFetching: specialtiesLoading } =
  useAdminSpecialtyQuery(initialSpecialties.value)

const toggleDoctorActivation = useToggleDoctorActivation()

const toggleStatus = async (id: string, currentStatus: boolean) => {
  try {
    await toggleDoctorActivation.mutateAsync({
      doctorId: id,
      isActive: currentStatus,
    })
  } catch (err) {
    alert('خطا در تغییر وضعیت')
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">لیست پزشکان</h1>

    <div v-if="toggleDoctorActivation.isPending.value" class="animate-pulse">
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
      />
    </div>
  </div>
</template>
