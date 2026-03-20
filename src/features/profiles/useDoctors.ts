import { getDoctors } from '@/services/apiProfiles';
import { useQuery } from '@tanstack/react-query';

export function useDoctors() {
  const {
    isLoading: isFetchingDoctors,
    data: doctors,
    error: doctorsError,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  });

  return { isFetchingDoctors, doctors, doctorsError };
}
