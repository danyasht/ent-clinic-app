import { deleteAppointment as deleteAppointmentApi } from '@/services/apiAppointments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeletingAppointment,
    mutate: deleteAppointment,
    error: deleteAppointmentError,
  } = useMutation({
    mutationFn: deleteAppointmentApi,
    onSuccess: () => {
      toast.success('Appointment successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['doctor-appointments'],
      });
    },
  });

  return { isDeletingAppointment, deleteAppointment, deleteAppointmentError };
}
