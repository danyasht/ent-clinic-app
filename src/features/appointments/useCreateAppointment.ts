import { createAppointment as createAppointmentApi } from '@/services/apiAppointments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/lib/queryKeys';

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  const {
    isPending,
    mutate: createAppointment,
    error: createAppointmentError,
  } = useMutation({
    mutationFn: createAppointmentApi,

    onSuccess: () => {
      toast.success('Successfully created new appointment');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKED_APPOINTMENTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCTOR_APPOINTMENTS] });
    },

    onError: (error) => toast.error(error.message),
  });

  return { isPending, createAppointment, createAppointmentError };
}
