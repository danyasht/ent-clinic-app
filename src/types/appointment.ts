export interface Appointment {
  appointmentId: string;
  isPaid: boolean;
  patientNotes: string;
  status: string;
  appointmentTime: string;
  appointmentDate: string;
  serviceName: string;
  updatedAt: string;
}

export type AppointmentStatus = 'confirmed' | 'completed' | 'cancelled' | 'unconfirmed';

export interface NewAppointment {
  patient_id: string;
  doctor_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  patient_notes?: string | null;
  ai_summary?: string | null;
  status: AppointmentStatus;
  updated_at: string;
}

export interface DoctorAppointment extends Appointment {
  patientName: string;
}

export interface PatientAppointment extends Appointment {
  doctorName: string;
}
