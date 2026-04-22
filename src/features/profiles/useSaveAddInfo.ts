import { QUERY_KEYS } from '@/lib/queryKeys';
import { saveUserAddInfo } from '@/services/apiProfiles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useSaveAddInfo() {
  const queryClient = useQueryClient();

  const {
    isPending: isSavingAddInfo,
    mutate: saveAddInfo,
    error: saveAddInfoError,
  } = useMutation({
    mutationFn: saveUserAddInfo,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      toast.success('Details successfully saved');
    },
    onError: (error) => toast.error(error.message),
  });

  return { isSavingAddInfo, saveAddInfo, saveAddInfoError };
}
