import { getServices } from '@/services/apiServices';
import { useQuery } from '@tanstack/react-query';

export function useServices() {
  const {
    isLoading: isFetchingServices,
    data: services,
    error: servicesError,
  } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  // console.log(services);

  return { isFetchingServices, services, servicesError };
}
