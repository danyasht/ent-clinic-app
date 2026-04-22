import { mapSchedule, mapSingleSchedule } from '@/helpers/mappers';
import { supabase } from '@/lib/supabase';

export async function getSchedule() {
  const { data, error } = await supabase.from('doctor_schedules').select('*');

  if (error) throw new Error(error.message);

  // console.log(data);

  return data.map((column) => ({
    ...mapSchedule(column),
  }));
}

export async function getDoctorScheduleById(doctorId: string) {
  const { data: schedule, error } = await supabase
    .from('doctor_schedules')
    .select('*')
    .eq('doctor_id', doctorId)
    .single();

  if (error) throw new Error(error.message);

  // console.log(schedule);

  return mapSingleSchedule(schedule);
}

interface UpdateArgs {
  workStart: string;
  workEnd: string;
  lunchStart: string;
  lunchEnd: string;
  bufferTime: number;
}

export async function updateDoctorSchedule({ workStart, workEnd, lunchStart, lunchEnd, bufferTime }: UpdateArgs) {
  const { data, error } = await supabase
    .from('doctor_schedules')
    .update({
      work_start: workStart,
      work_end: workEnd,
      lunch_start: lunchStart,
      lunch_end: lunchEnd,
      buffer_time: bufferTime,
    });

  if (error) throw new Error(error.message);

  return data;
}
