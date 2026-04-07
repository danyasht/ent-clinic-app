import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAppointmentById } from "@/services/apiAppointments";

export function useAppointment() {
  const { appointmentId } = useParams();

  const {
    isLoading: isFetchingAppointment,
    data: appointment,
    error: appointmentError,
  } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointmentById(appointmentId || ""),
    enabled: !!appointmentId,
  });

  return { isFetchingAppointment, appointment, appointmentError };
}
