import { supabase } from '@/lib/supabase';

export async function getDoctors() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'doctor');

  if (error) throw new Error(error.message);

  return data.map((doctor) => ({
    id: doctor.id,
    fullName: doctor.full_name,
    role: doctor.role,
  }));
}
