import { useQuery } from '@tanstack/react-query';
import { getDoctorScheduleById } from '@/services/apiSchedule';

export function useDoctorSchedule({ doctorId, enabled }: { doctorId: string; enabled: boolean }) {
  const {
    isLoading: isFetchingSchedule,
    data: schedule,
    error: scheduleError,
  } = useQuery({
    queryKey: ['doctor-schedule', doctorId],
    queryFn: () => getDoctorScheduleById(doctorId),
    enabled: enabled && !!doctorId,
  });

  return { isFetchingSchedule, schedule, scheduleError };
}
