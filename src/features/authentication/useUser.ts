import { getCurrentUser } from '@/services/apiAuth';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  // console.log(user);

  return {
    isLoading,
    user,
    isAuthenticated: user?.aud === 'authenticated',
    error,
  };
}
