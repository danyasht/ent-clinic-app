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
    .eq('patient_id', profileId)
    .order('appointment_date', { ascending: true })
    .order('appointment_time', { ascending: true });

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

export async function getDoctorAppointments(doctorId: string) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, service:services(name), patient:profiles!patient_id(full_name)')
    .eq('doctor_id', doctorId)
    .order('appointment_date', { ascending: true })
    .order('appointment_time', { ascending: true });

  if (error) throw new Error(error.message);

  return data.map((appointment) => ({
    appointmentId: appointment.id,
    isPaid: appointment.is_paid,
    patientNotes: appointment.patient_notes,
    status: appointment.status,
    appointmentTime: appointment.appointment_time,
    appointmentDate: appointment.appointment_date,
    serviceName: appointment.service.name,
    patientName: appointment.patient.full_name,
  }));
}

export async function updateAppointmentStatus({
  appointmentId,
  status,
}: {
  appointmentId: string;
  status: string;
}) {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status: status })
    .eq('id', appointmentId)
    .select();

  if (error) throw new Error(error.message);

  console.log(status);

  return data;
}
