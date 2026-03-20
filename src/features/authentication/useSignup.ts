import { signup as signupApi } from '@/services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useSignup() {
  const {
    isPending: isSigningUp,
    mutate: signup,
    error: signupError,
  } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => toast.success('Account created, please log in!'),

    onError: (err) => toast.error(err.message),
  });

  return { isSigningUp, signup, signupError };
}
