import { getUserAppointments } from '@/services/apiAppointments';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';

export function useAppointments() {
  const { user } = useUser();
  const profileId = user ? user.profileId : null;

  const {
    isLoading: isFetchingUserAppointments,
    data: userAppointments,
    error: userAppointmentsError,
  } = useQuery({
    queryKey: ['appointments', profileId],
    queryFn: () => getUserAppointments(profileId as string),
    enabled: !!profileId,
  });

  return {
    isFetchingUserAppointments,
    userAppointments,
    userAppointmentsError,
  };
}
