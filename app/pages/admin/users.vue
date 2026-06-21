<script setup lang="ts">
import { useToggleUserActivation } from '~/composables/api/admin/mutations/useToggleUserActivation'
import { useAdminUsersQuery } from '~/composables/api/admin/queries/useAdminUsersQuery'
import { type UserAdminType } from '~~/shared/types/user'

//API-SSR
const { data: initialUsers } = await useFetch<ApiResponse<UserAdminType[]>>(
  '/api/admin/user',
  {
    key: 'admin-users-list',
  },
)

//API-CSR
const { data: users, isFetching: usersLoading } = useAdminUsersQuery(
  initialUsers.value,
)

const toggleUserActivation = useToggleUserActivation()

//handler
const toggleStatus = async (id: string, currentStatus: boolean) => {
  try {
    await toggleUserActivation.mutateAsync({
      userId: id,
      isActive: currentStatus,
    })
  } catch (err) {
    alert('خطا در تغییر وضعیت')
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">لیست کاربران</h1>

    <div v-if="toggleUserActivation.isPending.value" class="animate-pulse">
      در حال بارگذاری...
    </div>

    <div v-else class="flex flex-wrap gap-4 rounded-lg shadow">
      <UserCart
        v-for="item in users?.data || []"
        iconName="lucide:user-round"
        :key="item._id"
        :userName="item.firstName + ' ' + item.lastName"
        :userMobile="item.mobile"
        :isActive="item.isActive"
        :isProfileComplete="item.isProfileCompleted"
        @update:isActive="(value) => toggleStatus(item._id, value)"
      />
    </div>
  </div>
</template>
