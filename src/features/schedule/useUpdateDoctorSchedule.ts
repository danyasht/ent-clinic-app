import { updateDoctorSchedule } from '@/services/apiSchedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface UpdateArgs {
  doctorId: string;
  workStart: string;
  workEnd: string;
  lunchStart: string;
  lunchEnd: string;
  bufferTime: number;
  slotInterval: number;
}

export function useUpdateDoctorSchedule() {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdatingSchedule,
    mutate: updateSchedule,
    error: updatingScheduleError,
  } = useMutation({
    mutationFn: ({ doctorId, workStart, workEnd, lunchStart, lunchEnd, slotInterval, bufferTime }: UpdateArgs) =>
      updateDoctorSchedule({ doctorId, workStart, workEnd, lunchStart, lunchEnd, slotInterval, bufferTime }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-schedule'] });
      toast.success('Successfully updated time preferences!');
    },

    onError: (error) => toast.error(error.message),
  });

  return { isUpdatingSchedule, updateSchedule, updatingScheduleError };
}
