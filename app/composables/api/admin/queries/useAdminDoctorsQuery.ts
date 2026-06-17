import { useQuery } from '@tanstack/vue-query'
import type { DoctorAdminType } from '~~/shared/types/doctor'

export const ADMIN_DOCTORS_QUERY_KEY = ['admin-doctors-list']

export const useAdminDoctorsQuery = (
  initialData?:
    | Ref<ApiResponse<DoctorAdminType[]> | null>
    | ApiResponse<DoctorAdminType[]>
    | null,
) => {
  return useQuery({
    queryKey: ADMIN_DOCTORS_QUERY_KEY,
    queryFn: () => $fetch<ApiResponse<DoctorAdminType[]>>('/api/admin/doctor'),
    initialData: () => {
      if (!initialData) return undefined
      if ('value' in initialData) return initialData.value ?? undefined
      return initialData ?? undefined
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
