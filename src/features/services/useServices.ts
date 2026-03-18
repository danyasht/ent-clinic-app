import { getServices } from '@/services/apiServices';
import { useQuery } from '@tanstack/react-query';

export function useServices() {
  const {
    isLoading,
    data: services,
    error,
  } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  return { isLoading, services, error };
}
