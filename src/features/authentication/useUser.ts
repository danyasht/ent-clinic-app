import { getCurrentUser } from '@/services/apiAuth';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const {
    isLoading: isGettingUser,
    data: user,
    error: userError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  // console.log(user);

  return {
    isGettingUser,
    user,
    isAuthenticated: user?.aud === 'authenticated',
    userError,
  };
}
