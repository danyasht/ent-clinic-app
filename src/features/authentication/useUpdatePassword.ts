import { updateCurrentUserPassword } from '@/services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdatePassword() {
  const {
    isPending: isUpdatingPassword,
    mutate: updatePassword,
    error: updatePasswordError,
  } = useMutation({
    mutationFn: updateCurrentUserPassword,

    onSuccess: () => toast.success('Password updated'),

    onError: (error) => toast.error(error.message),
  });

  return { isUpdatingPassword, updatePassword, updatePasswordError };
}
