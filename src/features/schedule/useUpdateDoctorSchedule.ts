import { useMutation } from '@tanstack/react-query';

export function useUpdateDoctorSchedule() {
  const { isPending: isUpdatingSchedule, mutate: updateSchedule, error: updatingScheduleError } = useMutation({});

  return { isUpdatingSchedule, updateSchedule, updatingScheduleError };
}
