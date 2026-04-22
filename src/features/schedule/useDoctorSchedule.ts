import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { getDoctorScheduleById } from '@/services/apiSchedule';

export function useDoctorSchedule() {
  const { user } = useUser();
  const profileId = user ? user.profileId : '';

  const {
    isLoading: isFetchingSchedule,
    data: schedule,
    error: scheduleError,
  } = useQuery({
    queryKey: ['doctor-schedule', profileId],
    queryFn: () => getDoctorScheduleById(profileId),
  });

  return { isFetchingSchedule, schedule, scheduleError };
}
