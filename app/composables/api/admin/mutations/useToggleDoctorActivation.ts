import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ADMIN_DOCTORS_QUERY_KEY } from '../queries/useAdminDoctorsQuery'

export const useToggleDoctorActivation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      doctorId,
      isActive,
    }: {
      doctorId: string
      isActive: boolean
    }) => {
      return $fetch<ApiResponse<null>>(`/api/admin/doctor/${doctorId}`, {
        method: 'PATCH',
        body: { isActive },
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_DOCTORS_QUERY_KEY,
      })
    },
  })
}
