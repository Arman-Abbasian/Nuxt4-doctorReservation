import { useQuery } from '@tanstack/vue-query'
import type { DoctorAdminType } from '~~/shared/types/doctor'

export const ADMIN_DOCTORS_QUERY_KEY = ['admin-doctors-list']

export const useAdminDoctorsQuery = (
  initialData?: ApiResponse<DoctorAdminType[]> | undefined,
) => {
  return useQuery({
    queryKey: ADMIN_DOCTORS_QUERY_KEY,
    queryFn: () => $fetch<ApiResponse<DoctorAdminType[]>>('/api/admin/doctor'),
    initialData: initialData ?? undefined,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
