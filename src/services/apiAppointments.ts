import { supabase } from '@/lib/supabase';

import { mapBaseAppointment, mapCustomsFromAppointment } from '@/helpers/mappers';
import type { NewAppointment } from '@/types';

const mapColumn: Record<string, string> = {
  appointmentDate: 'appointment_date',
  servicePrice: 'service_price',
};

export async function createAppointment(newAppointment: NewAppointment) {
  const { data, error } = await supabase.from('appointments').insert([newAppointment]).select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getUserAppointments({
  profileId,
  sortBy,
}: {
  profileId: string;
  sortBy: { field: string; value: string };
}) {
  let query = supabase
    .from('appointments')
    .select('*, service:services(name), doctor:profiles!doctor_id(full_name)')
    .eq('patient_id', profileId);

  if (sortBy) {
    const column = mapColumn[sortBy.field] || sortBy.field;
    query = query.order(column, { ascending: sortBy.value === 'asc' });
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data.map((appointment) => ({
    ...mapBaseAppointment(appointment),
    doctorName: appointment.doctor?.full_name,
  }));
}

export async function getDoctorAppointments({
  profileId,
  searchQuery,
  sortBy,
  filterBy,
}: {
  profileId: string;
  searchQuery?: string;
  sortBy: { field: string; value: string };
  filterBy: string;
}) {
  // console.log(sortBy);

  let query = supabase
    .from('appointments')
    .select('*, service:services!inner(name, price), patient:profiles!patient_id(full_name)')
    .eq('doctor_id', profileId);

  if (searchQuery) {
    query = query.ilike('service.name', `%${searchQuery}%`);
  }

  const isForeignTableColumnSort = sortBy.field === 'servicePrice';

  if (sortBy && !isForeignTableColumnSort) {
    const columnName = mapColumn[sortBy.field] || sortBy.field;
    query = query.order(columnName, { ascending: sortBy.value === 'asc' });
  }

  if (filterBy && filterBy !== 'all') {
    query = query.eq('status', filterBy);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  const mappedData = data.map((appointment) => ({
    ...mapBaseAppointment(appointment),
    patientName: appointment.patient?.full_name,
    servicePrice: appointment.service?.price,
    serviceName: appointment.service?.name,
  }));

  if (isForeignTableColumnSort) {
    mappedData.sort((a, b) => {
      const priceA = a.servicePrice || 0;
      const priceB = b.servicePrice || 0;
      return sortBy.value === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }

  return mappedData;
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

  // console.log(status);

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
  const { data, error } = await supabase
    .from('appointments')
    .update({ is_paid: true, paid_at: new Date().toISOString() })
    .eq('id', appointmentId);

  if (error) throw new Error(error.message);

  return data;
}
