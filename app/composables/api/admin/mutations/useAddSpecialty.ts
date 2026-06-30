import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ADMIN_SPECIALTY_QUERY_KEY } from '../queries/useAdminSpecialtyQuery'

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
        queryKey: ADMIN_SPECIALTY_QUERY_KEY,
      })
    },
  })
}
