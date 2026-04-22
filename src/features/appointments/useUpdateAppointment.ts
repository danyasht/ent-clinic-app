import { updateAppointmentStatus as updateAppointmentStatusApi } from '@/services/apiAppointments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/lib/queryKeys';

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdatingAppointment,
    mutate: updateAppointmentStatus,
    error: updateAppointmentError,
  } = useMutation({
    mutationFn: updateAppointmentStatusApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCTOR_APPOINTMENTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPOINTMENT] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPOINTMENTS] });
    },

    onError: (error) => toast.error(error.message),
  });

  return { isUpdatingAppointment, updateAppointmentStatus, updateAppointmentError };
}
