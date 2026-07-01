import { useQuery } from '@tanstack/vue-query'
import type { SpecialtyAdminType } from '~~/shared/types/specialty'

export const ADMIN_SPECIALTY_QUERY_KEY = ['admin-specialties-list']

export const useAdminSpecialtyQuery = (
  initialData?: ApiResponse<SpecialtyAdminType[]> | undefined,
) => {
  return useQuery({
    queryKey: ADMIN_SPECIALTY_QUERY_KEY,
    queryFn: () =>
      $fetch<ApiResponse<SpecialtyAdminType[]>>('/api/admin/specialty'),
    initialData: initialData ?? undefined,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}