import { FastActions } from '@/context/FastActionsContext';
import { TableCell, TableRow } from './table';

interface Appointment {
  appointmentId: string;
  isPaid: boolean;
  patientNotes: string;
  status: string;
  appointmentTime: string;
  appointmentDate: string;
  serviceName: string;
  patientName: string;
}
export default function PatientAppointmentRow({
  appointment,
}: {
  appointment: Appointment;
}) {
  return (
    <TableRow>
      <TableCell>{appointment.serviceName}</TableCell>
      <TableCell>{appointment.patientName}</TableCell>
      <TableCell>{appointment.status}</TableCell>
      <TableCell>
        {appointment.isPaid === false ? 'No payment yet' : 'Paid'}
      </TableCell>
      <TableCell>{appointment.appointmentTime}</TableCell>
      <TableCell>{appointment.appointmentDate}</TableCell>

      <TableCell className="relative">
        <FastActions.Toggle id={appointment.appointmentId} />

        <FastActions.List id={appointment.appointmentId}>
          <button>Confirm</button>
          <button>Complete</button>
          <button>Delete</button>
        </FastActions.List>
      </TableCell>
    </TableRow>
  );
}
