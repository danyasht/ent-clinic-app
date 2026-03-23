import { getSchedule as getScheduleApi } from '@/services/apiSchedule';
import { useQuery } from '@tanstack/react-query';

export function useSchedule() {
  const {
    isLoading: isFetchingSchedule,
    data: schedule,
    error: scheduleError,
  } = useQuery({
    queryKey: ['doctor-schedules'],
    queryFn: getScheduleApi,
  });

  return { isFetchingSchedule, schedule, scheduleError };
}
