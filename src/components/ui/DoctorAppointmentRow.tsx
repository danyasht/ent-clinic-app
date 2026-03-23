import { FastActions } from '@/context/FastActionsContext';
import { TableCell, TableRow } from './table';
import { Check, CheckCheck, Trash, X } from 'lucide-react';
import { useUpdateAppointment } from '@/features/appointments/useUpdateAppointment';

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
export default function DoctorAppointmentRow({
  appointment,
}: {
  appointment: Appointment;
}) {
  const { updateAppointmentStatus } = useUpdateAppointment();

  return (
    <TableRow className="h-20">
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
          <button
            disabled={
              appointment.status === 'confirmed' ||
              appointment.status === 'cancelled' ||
              appointment.status === 'completed'
            }
            className="flex items-center justify-center gap-1 cursor-pointer disabled:cursor-not-allowed"
            onClick={() =>
              updateAppointmentStatus({
                appointmentId: appointment.appointmentId,
                status: 'confirmed',
              })
            }
          >
            <Check className="h-4 w-4" />
            <span>Confirm</span>
          </button>
          <button
            disabled={
              appointment.status === 'cancelled' ||
              appointment.status === 'completed'
            }
            className="flex items-center justify-center gap-1 cursor-pointer disabled:cursor-not-allowed"
            onClick={() =>
              updateAppointmentStatus({
                appointmentId: appointment.appointmentId,
                status: 'cancelled',
              })
            }
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
          <button
            disabled={
              appointment.status === 'completed' ||
              appointment.status === 'cancelled'
            }
            className="flex items-center justify-center gap-1 cursor-pointer disabled:cursor-not-allowed"
            onClick={() =>
              updateAppointmentStatus({
                appointmentId: appointment.appointmentId,
                status: 'completed',
              })
            }
          >
            <CheckCheck className="h-4 w-4" />
            <span>Complete</span>
          </button>
        </FastActions.List>
      </TableCell>
    </TableRow>
  );
}
