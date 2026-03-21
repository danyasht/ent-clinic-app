import { TableCell, TableRow } from './table';

interface Appointment {
  appointmentId: string;
  isPaid: boolean;
  patientNotes: string;
  status: string;
  appointmentTime: string;
  appointmentDate: string;
  serviceName: string;
  doctorName: string;
}
export default function PatientAppointmentRow({
  appointment,
}: {
  appointment: Appointment;
}) {
  return (
    <TableRow>
      <TableCell>{appointment.serviceName}</TableCell>
      <TableCell>{appointment.doctorName}</TableCell>
      <TableCell>{appointment.status}</TableCell>
      <TableCell>{appointment.appointmentTime}</TableCell>
      <TableCell>{appointment.appointmentDate}</TableCell>
    </TableRow>
  );
}
