import { createAppointment as createAppointmentApi } from '@/services/apiAppointments';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateAppointment() {
  const {
    isPending,
    mutate: createAppointment,
    error,
  } = useMutation({
    mutationFn: createAppointmentApi,

    onSuccess: () => toast.success('Successfully created new appointment'),

    onError: (err) => toast.error(err.message),
  });

  return { isPending, createAppointment, error };
}
