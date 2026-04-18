import { mapDoctor } from '@/helpers/mappers';
import { supabase } from '@/lib/supabase';

export async function getDoctors() {
  const { data, error } = await supabase.from('profiles').select('*').eq('role', 'doctor');

  if (error) throw new Error(error.message);

  return data.map((doctor) => ({
    ...mapDoctor(doctor),
  }));
}

export async function saveUserAddInfo({
  profileId,
  phoneInput,
  dobInput,
}: {
  profileId: string;
  phoneInput: string | null;
  dobInput: string | null;
}) {
  console.log(profileId, phoneInput, dobInput);
  const { data, error } = await supabase
    .from('profiles')
    .update({ phone: phoneInput, date_of_birth: dobInput })
    .eq('id', profileId);

  if (error) throw new Error(error.message);

  return data;
}

export async function saveUserPreferences({
  profileId,
  bloodType,
  allergies,
}: {
  profileId: string;
  bloodType: string;
  allergies: string[] | null;
}) {
  // console.log(profileId, bloodType, allergies);
  const { data, error } = await supabase
    .from('profiles')
    .update({ blood_type: bloodType, allergies: allergies })
    .eq('id', profileId);

  if (error) throw new Error(error.message);

  return data;
}
