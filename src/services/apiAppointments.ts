import { supabase } from '@/lib/supabase';

export async function createAppointment(newAppointment: object) {
  const { data, error } = await supabase
    .from('appointments')
    .insert([newAppointment])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getUserAppointments(profileId: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, service:services(name), doctor:profiles!doctor_id(full_name)')
    .eq('patient_id', profileId);

  if (error) throw new Error(error.message);

  return data.map((appointment) => ({
    appointmentId: appointment.id,
    isPaid: appointment.is_paid,
    patientNotes: appointment.patient_notes,
    status: appointment.status,
    appointmentTime: appointment.appointment_time,
    appointmentDate: appointment.appointment_date,
    serviceName: appointment.service.name,
    doctorName: appointment.doctor.full_name,
  }));
}
