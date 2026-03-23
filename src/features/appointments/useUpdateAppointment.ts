import { updateAppointmentStatus as updateAppointmentStatusApi } from '@/services/apiAppointments';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdatingAppointment,
    mutate: updateAppointmentStatus,
    error: updateAppointmentError,
  } = useMutation({
    mutationFn: updateAppointmentStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-appointments'] });
    },
  });

  return { isUpdatingAppointment, updateAppointmentStatus };
}
