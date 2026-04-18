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

export interface DoctorAppointment extends Appointment {
  patientName: string;
}

export interface PatientAppointment extends Appointment {
  doctorName: string;
}
