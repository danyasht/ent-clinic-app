import { supabase } from '@/lib/supabase';

export async function getSchedule() {
  const { data, error } = await supabase.from('doctor_schedules').select('*');

  if (error) throw new Error(error.message);

  // console.log(data);

  return data.map((column) => ({
    scheduleId: column.id,
    doctorId: column.doctor_id,
    workStartTime: column.work_start,
    workEndTime: column.work_end,
    lunchStartTime: column.lunch_start,
    lunchEndTime: column.lunch_end,
    slotInterval: column.slot_interval,
  }));
}
