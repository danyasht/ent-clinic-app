import { getDoctorAppointments } from '@/services/apiAppointments';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';

export function useDoctorAppointments() {
  const { user } = useUser();
  const profileId = user ? user.profileId : null;

  const {
    isLoading: isFetchingDoctorAppointments,
    data: doctorAppointments,
    error: doctorAppointmentsError,
  } = useQuery({
    queryKey: ['doctor-appointments', profileId],
    queryFn: () => getDoctorAppointments(profileId as string),
    enabled: !!profileId,
  });

  return {
    isFetchingDoctorAppointments,
    doctorAppointments,
    doctorAppointmentsError,
  };
}
