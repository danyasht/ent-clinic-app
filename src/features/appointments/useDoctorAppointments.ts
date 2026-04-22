import { getDoctorAppointments } from '@/services/apiAppointments';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { useSearchParams } from 'react-router-dom';

export function useDoctorAppointments() {
  const { user } = useUser();

  const [searchParams] = useSearchParams();

  const sortDefault = searchParams.get('sortBy') || 'appointmentDate-desc';

  const searchQuery = searchParams.get('serviceName') || '';

  const filterBy = searchParams.get('status') || 'confirmed';

  const [field, value] = sortDefault.split('-');

  const sortBy = { field, value };

  const profileId = user ? user.profileId : '';

  const {
    isLoading: isFetchingDoctorAppointments,
    data: doctorAppointments,
    error: doctorAppointmentsError,
  } = useQuery({
    queryKey: ['doctor-appointments', profileId, searchQuery, sortBy, filterBy],
    queryFn: () => getDoctorAppointments({ profileId, searchQuery, sortBy, filterBy }),
    enabled: !!profileId,
  });

  return {
    isFetchingDoctorAppointments,
    doctorAppointments,
    doctorAppointmentsError,
  };
}
