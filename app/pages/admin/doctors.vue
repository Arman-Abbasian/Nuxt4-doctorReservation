<script setup lang="ts">
import { useToggleDoctorActivation } from '~/composables/api/admin/mutations/useToggleDoctorActivation'
import { useAdminDoctorsQuery } from '~/composables/api/admin/queries/useAdminDoctorsQuery'
import { type DoctorAdminType } from '~~/shared/types/doctor'

//API
const { data, refresh, pending } = await useFetch<
  ApiResponse<DoctorAdminType[]>
>('/api/admin/doctor', {
  key: 'admin-doctors-list',
})

const { data: doctors, isLoading } = useAdminDoctorsQuery()

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

    <div v-if="pending" class="animate-pulse">در حال بارگذاری...</div>

    <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
      <UserCart
        v-for="item in doctors?.data || []"
        iconName="lucide:user-round"
        :key="item._id"
        :userName="item.firstName + ' ' + item.lastName"
        :userMobile="item.mobile"
        :isActive="item.isActive"
        v-model="isActive"
        @update:isActive="(value) => toggleStatus(item._id, value)"
      />
    </div>
  </div>
</template>
