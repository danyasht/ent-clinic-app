import { supabase } from "@/lib/supabase";

export async function createAppointment(newAppointment: object) {
  const { data, error } = await supabase
    .from("appointments")
    .insert([newAppointment])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getUserAppointments(profileId: string) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, service:services(name), doctor:profiles!doctor_id(full_name)")
    .eq("patient_id", profileId)
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

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
    .from("appointments")
    .select("*, service:services(name), patient:profiles!patient_id(full_name)")
    .eq("doctor_id", doctorId)
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

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
    .from("appointments")
    .update({ status: status })
    .eq("id", appointmentId)
    .select();

  if (error) throw new Error(error.message);

  console.log(status);

  return data;
}

export async function getBookedAppointments({
  doctorId,
  date,
}: {
  doctorId: string;
  date: string;
}) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*, service:services(name, duration)")
    .eq("doctor_id", doctorId)
    .eq("appointment_date", date);

  if (error) throw new Error(error.message);

  return data.map((appointment) => ({
    appointmentId: appointment.id,
    isPaid: appointment.is_paid,
    patientNotes: appointment.patient_notes,
    status: appointment.status,
    appointmentTime: appointment.appointment_time,
    appointmentDate: appointment.appointment_date,
    serviceName: appointment.service.name,
    serviceDuration: appointment.service.duration,
  }));
}

export async function deleteAppointment(appointmentId: string) {
  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", appointmentId);

  if (error) throw new Error(error.message);
}

export async function getAppointmentById(appointmentId: string) {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "*, service:services(name, price), patient:profiles!patient_id(full_name, phone), doctor:profiles!doctor_id(full_name)",
    )
    .eq("id", appointmentId)
    .single();

  if (error) throw new Error(error.message);

  return {
    appointmentId: data.id,
    aiSummary: data.ai_summary,
    patientPhone: data.patient.phone,
    patientName: data.patient.full_name,
    doctorName: data.doctor.full_name,
    patientNotes: data.patient_notes,
    serviceName: data.service.name,
    appointmentTime: data.appointment_time,
    appointmentDate: data.appointment_date,
    status: data.status,
    servicePrice: data.service.price,
    isPaid: data.is_paid,
  };
}

export async function updateAppointmentPaymentById(appointmentId: string) {
  const { data, error } = await supabase
    .from("appointments")
    .update({ is_paid: true })
    .eq("id", appointmentId);

  if (error) throw new Error(error.message);

  return data;
}
