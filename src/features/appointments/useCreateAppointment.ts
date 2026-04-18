import { createAppointment as createAppointmentApi } from '@/services/apiAppointments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  const {
    isPending,
    mutate: createAppointment,
    error,
  } = useMutation({
    mutationFn: createAppointmentApi,

    onSuccess: () => {
      toast.success('Successfully created new appointment');
      queryClient.invalidateQueries({ queryKey: ['booked-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['doctor-appointments'] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isPending, createAppointment, error };
}
