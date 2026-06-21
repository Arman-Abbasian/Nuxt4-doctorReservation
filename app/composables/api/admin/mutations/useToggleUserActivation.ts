import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ADMIN_USERS_QUERY_KEY } from '../queries/useAdminUsersQuery'

export const useToggleUserActivation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      isActive,
    }: {
      userId: string
      isActive: boolean
    }) => {
      return $fetch<ApiResponse<null>>(`/api/admin/user/${userId}`, {
        method: 'PATCH',
        body: { isActive },
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_USERS_QUERY_KEY,
      })
    },
  })
}
