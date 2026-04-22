import { login as loginApi } from '@/services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending: isLoggingIn,
    mutate: login,
    error: loginError,
  } = useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success(`Welcome, ${data.user?.email}!`);
      navigate('/dashboard', { replace: true });
    },

    onError: (error) => toast.error(error.message),
  });

  return { isLoggingIn, login, loginError };
}
