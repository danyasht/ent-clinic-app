import { getBookedAppointments as getBookedAppointmentsApi } from '@/services/apiAppointments';
import { useQuery } from '@tanstack/react-query';

export function useBookedAppointments(doctorId: string, date: string) {
  const {
    isLoading: isFetchingBookedAppointments,
    data: bookedAppointments,
    error: bookedAppointmentsError,
  } = useQuery({
    queryKey: ['booked-appointments', doctorId, date],
    queryFn: () => getBookedAppointmentsApi({ doctorId, date }),
    enabled: !!doctorId && !!date,
  });

  return {
    isFetchingBookedAppointments,
    bookedAppointments,
    bookedAppointmentsError,
  };
}
