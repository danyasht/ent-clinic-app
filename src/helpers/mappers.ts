interface AppointmentFromDb {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  is_paid: boolean;
  paid_at: string;
  patient_notes: string;
  ai_summary: string;
  updated_at: string;
  service: {
    name: string;
    [key: string]: unknown;
  };

  doctor: {
    full_name: string;
    [key: string]: unknown;
  };

  patient: {
    full_name: string;
    [key: string]: unknown;
  };

  [key: string]: unknown;
}

export function mapBaseAppointment(appointment: AppointmentFromDb) {
  return {
    appointmentId: appointment.id,
    appointmentDate: appointment.appointment_date,
    appointmentTime: appointment.appointment_time,
    status: appointment.status,
    isPaid: appointment.is_paid,
    patientNotes: appointment.patient_notes,
    aiSummary: appointment.ai_summary,
    updatedAt: appointment.updated_at,
    paidAt: appointment.paid_at,
    serviceName: appointment.service?.name,
  };
}

interface CustomPropsAppointment {
  patient: {
    full_name: string;
    phone: string;
  };

  doctor: {
    full_name: string;
  };

  service: {
    price: number;
  };
}

export function mapCustomsFromAppointment(appointment: CustomPropsAppointment) {
  return {
    patientName: appointment.patient.full_name,
    doctorName: appointment.doctor.full_name,
    servicePrice: appointment.service.price,
    patientPhone: appointment.patient.phone,
  };
}

interface ProfileFromDb {
  id: string;
  full_name: string;
  role: string;
  date_of_birth: string | null;
  phone: string | null;
  blood_type: string | null;
  allergies: string[] | null;
}

interface AuthUser {
  email?: string;
  aud?: string;
  created_at?: string;
}

export function mapProfile(profile: ProfileFromDb, user: AuthUser) {
  const cleanProfile = {
    profileId: profile.id,
    fullName: profile.full_name,
    role: profile.role,
    dateOfBirth: profile.date_of_birth,
    phone: profile.phone,
    bloodType: profile.blood_type,
    allergies: profile.allergies,
  };

  const cleanUser = {
    email: user.email,
    aud: user.aud,
    createdAt: user.created_at,
  };

  return { ...cleanProfile, ...cleanUser };
}

interface DoctorFromDb {
  id: string;
  full_name: string;
  role: string;
}

export function mapDoctor(doctor: DoctorFromDb) {
  return { id: doctor.id, fullName: doctor.full_name, role: doctor.role };
}

interface ScheduleColumnFromDb {
  id: string;
  doctor_id: string;
  work_start: string;
  work_end: string;
  lunch_start: string;
  lunch_end: string;
  slot_interval: number;
  buffer_time: number;
}

export function mapSingleSchedule(schedule: ScheduleColumnFromDb) {
  return {
    scheduleId: schedule.id,
    doctorId: schedule.doctor_id,
    workStartTime: schedule.work_start,
    workEndTime: schedule.work_end,
    lunchStartTime: schedule.lunch_start,
    lunchEndTime: schedule.lunch_end,
    slotInterval: schedule.slot_interval,
    bufferTime: schedule.buffer_time,
  };
}

export function mapSchedule(column: ScheduleColumnFromDb) {
  return {
    scheduleId: column.id,
    doctorId: column.doctor_id,
    workStartTime: column.work_start,
    workEndTime: column.work_end,
    lunchStartTime: column.lunch_start,
    lunchEndTime: column.lunch_end,
    slotInterval: column.slot_interval,
    bufferTime: column.buffer_time,
  };
}

interface ServiceFromDb {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: number;
}

export function mapService(service: ServiceFromDb) {
  return {
    serviceId: service.id,
    serviceName: service.name,
    servicePrice: service.price,
    serviceDescription: service.description,
    serviceDuration: service.duration,
  };
}
