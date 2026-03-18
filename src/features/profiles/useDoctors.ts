import { getDoctors } from '@/services/apiProfiles';
import { useQuery } from '@tanstack/react-query';

export function useDoctors() {
  const {
    isLoading,
    data: doctors,
    error,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  });

  return { isLoading, doctors, error };
}
