import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ADMIN_DOCTORS_QUERY_KEY } from '../queries/useAdminDoctorsQuery'
import { ADMIN_SPECIALTY_QUERY_KEY } from '../queries/useAdminSpecialtyQuery'

export const useToggleSpecialtyActivation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      specialtyId,
      isActive,
    }: {
      specialtyId: string
      isActive: boolean
    }) => {
      return $fetch<ApiResponse<null>>(`/api/admin/specialty/${specialtyId}`, {
        method: 'PATCH',
        body: { isActive },
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_SPECIALTY_QUERY_KEY,
      })
    },
  })
}
