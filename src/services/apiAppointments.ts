import { supabase } from '@/lib/supabase';

export async function createAppointment(newAppointment: any) {
  const { data, error } = await supabase
    .from('appointments')
    .insert([newAppointment])
    .select();

  if (error) throw new Error(error.message);

  return data;
}
