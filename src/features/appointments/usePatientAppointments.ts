import { getUserAppointments } from '@/services/apiAppointments';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { useSearchParams } from 'react-router-dom';

export function usePatientAppointments() {
  const [searchParams] = useSearchParams();

  const sortDefault = searchParams.get('sortBy') || 'appointmentDate-desc';

  const [field, value] = sortDefault.split('-');

  const sortBy = { field, value };

  const { user } = useUser();
  const profileId = user ? user.profileId : '';

  const {
    isLoading: isFetchingUserAppointments,
    data: userAppointments,
    error: userAppointmentsError,
  } = useQuery({
    queryKey: ['appointments', profileId, sortBy],
    queryFn: () => getUserAppointments({ profileId, sortBy }),
    enabled: !!profileId,
  });

  return {
    isFetchingUserAppointments,
    userAppointments,
    userAppointmentsError,
  };
}
