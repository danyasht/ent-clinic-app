import { mapSchedule } from '@/helpers/mappers';
import { supabase } from '@/lib/supabase';

export async function getSchedule() {
  const { data, error } = await supabase.from('doctor_schedules').select('*');

  if (error) throw new Error(error.message);

  // console.log(data);

  return data.map((column) => ({
    ...mapSchedule(column),
  }));
}
