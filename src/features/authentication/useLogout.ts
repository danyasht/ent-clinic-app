import { logout as logoutApi } from '@/services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending: isLoggingOut,
    mutate: logout,
    error,
  } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
      toast.success('Successfully logged out');
    },

    onError: (err) => toast.error(err.message),
  });

  return { isLoggingOut, logout, error };
}
