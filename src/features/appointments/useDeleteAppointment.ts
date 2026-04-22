import { deleteAppointment as deleteAppointmentApi } from '@/services/apiAppointments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/lib/queryKeys';

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
        queryKey: [QUERY_KEYS.DOCTOR_APPOINTMENTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.APPOINTMENTS],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeletingAppointment, deleteAppointment, deleteAppointmentError };
}
