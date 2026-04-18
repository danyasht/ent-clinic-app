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
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Successfully saved');
    },
    onError: () => toast.error('Error saving data'),
  });

  return { isSavingAddInfo, saveAddInfo, saveAddInfoError };
}
