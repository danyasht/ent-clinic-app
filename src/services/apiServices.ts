import { mapService } from '@/helpers/mappers';
import { supabase } from '@/lib/supabase';

export async function getServices() {
  const { data, error } = await supabase.from('services').select('*');

  if (error) throw new Error(error.message);

  // console.log(data);

  return data.map((service) => ({
    ...mapService(service),
  }));
}
