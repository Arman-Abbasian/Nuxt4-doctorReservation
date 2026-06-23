import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ADMIN_DOCTORS_QUERY_KEY } from '../queries/useAdminDoctorsQuery'

export const useAddSpecialty = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ persianName, englishName, slug }: AddSpecialtyType) => {
      return $fetch<ApiResponse<null>>(`/api/admin/specialty`, {
        method: 'post',
        body: { persianName, englishName, slug },
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_DOCTORS_QUERY_KEY,
      })
    },
  })
}
