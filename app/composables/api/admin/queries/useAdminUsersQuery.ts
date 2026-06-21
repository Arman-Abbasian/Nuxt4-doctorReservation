import { useQuery } from '@tanstack/vue-query'
import type { UserAdminType } from '~~/shared/types/user'

export const ADMIN_USERS_QUERY_KEY = ['admin-users-list']

export const useAdminUsersQuery = (
  initialData?: ApiResponse<UserAdminType[]> | undefined,
) => {
  return useQuery({
    queryKey: ADMIN_USERS_QUERY_KEY,
    queryFn: () => $fetch<ApiResponse<UserAdminType[]>>('/api/admin/user'),
    initialData: initialData ?? undefined,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
