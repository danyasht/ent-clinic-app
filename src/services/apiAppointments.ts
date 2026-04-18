import { mapBaseAppointment, mapCustomsFromAppointment } from '@/helpers/mappers';
import { supabase } from '@/lib/supabase';

interface newAppointment {
  patient_id: string;
  doctor_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  patient_notes?: string | null;
  ai_summary?: string | null;
  status: string;
  updated_at: string;
}
export async function createAppointment(newAppointment: newAppointment) {
  const { data, error } = await supabase.from('appointments').insert([newAppointment]).select();

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
    ...mapBaseAppointment(appointment),
    doctorName: appointment.doctor?.full_name,
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
    ...mapBaseAppointment(appointment),
    patientName: appointment.patient?.full_name,
  }));
}

export async function updateAppointmentStatus({
  appointmentId,
  status,
  updatedAt,
}: {
  appointmentId: string;
  status: string;
  updatedAt: string;
}) {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status: status, updated_at: updatedAt })
    .eq('id', appointmentId)
    .select();

  if (error) throw new Error(error.message);

  console.log(status);

  return data;
}

export async function getBookedAppointments({ doctorId, date }: { doctorId: string; date: string }) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, service:services(name, duration)')
    .eq('doctor_id', doctorId)
    .eq('appointment_date', date);

  if (error) throw new Error(error.message);

  return data.map((appointment) => ({
    ...mapBaseAppointment(appointment),
    serviceDuration: appointment.service.duration,
  }));
}

export async function deleteAppointment(appointmentId: string) {
  const { error } = await supabase.from('appointments').delete().eq('id', appointmentId);

  if (error) throw new Error(error.message);
}

export async function getAppointmentById(appointmentId: string) {
  const { data: appointment, error } = await supabase
    .from('appointments')
    .select(
      '*, service:services(name, price), patient:profiles!patient_id(full_name, phone), doctor:profiles!doctor_id(full_name)',
    )
    .eq('id', appointmentId)
    .single();

  if (error) throw new Error(error.message);

  return {
    ...mapBaseAppointment(appointment),
    ...mapCustomsFromAppointment(appointment),
  };
}

export async function updateAppointmentPaymentById(appointmentId: string) {
  const { data, error } = await supabase.from('appointments').update({ is_paid: true }).eq('id', appointmentId);

  if (error) throw new Error(error.message);

  return data;
}
