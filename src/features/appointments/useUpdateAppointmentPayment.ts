import { updateAppointmentPaymentById as updateAppointmentPaymentByIdApi } from "@/services/apiAppointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateAppointmentPayment() {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdatingPayment,
    mutate: updateAppointmentPayment,
    error: updatingPaymentError,
  } = useMutation({
    mutationFn: updateAppointmentPaymentByIdApi,
    onSuccess: () => {
      toast.success("Successfully paid!");
      queryClient.invalidateQueries({
        queryKey: ["doctor-appointments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["appointment"],
      });
    },
  });

  return { isUpdatingPayment, updateAppointmentPayment, updatingPaymentError };
}
