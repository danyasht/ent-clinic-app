import { QUERY_KEYS } from '@/lib/queryKeys';
import { updateAppointmentPaymentById as updateAppointmentPaymentByIdApi } from '@/services/apiAppointments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateAppointmentPayment() {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdatingPayment,
    mutate: updateAppointmentPayment,
    error: updatePaymentError,
  } = useMutation({
    mutationFn: updateAppointmentPaymentByIdApi,

    onSuccess: () => {
      toast.success('Successfully paid!');
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DOCTOR_APPOINTMENTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.APPOINTMENT],
      });
    },

    onError: (error) => toast.error(error.message),
  });

  return { isUpdatingPayment, updateAppointmentPayment, updatePaymentError };
}
