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
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!schedule) return null;

  // console.log(schedule);

  return mapSingleSchedule(schedule);
}

interface UpdateArgs {
  doctorId: string;
  workStart: string;
  workEnd: string;
  lunchStart: string;
  lunchEnd: string;
  bufferTime: number;
  slotInterval: number;
}

export async function updateDoctorSchedule({
  doctorId,
  workStart,
  workEnd,
  lunchStart,
  lunchEnd,
  bufferTime,
  slotInterval,
}: UpdateArgs) {
  const { data, error } = await supabase
    .from('doctor_schedules')
    .upsert(
      {
        doctor_id: doctorId,
        work_start: workStart,
        work_end: workEnd,
        lunch_start: lunchStart,
        lunch_end: lunchEnd,
        buffer_time: bufferTime,
        slot_interval: slotInterval,
      },
      { onConflict: 'doctor_id' },
    )
    .select();

  if (error) throw new Error(error.message);

  return data;
}
