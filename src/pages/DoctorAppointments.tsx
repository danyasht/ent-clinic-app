import Spinner from '@/components/ui/Spinner';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDoctorAppointments } from '@/features/appointments/useDoctorAppointments';
import DoctorAppointmentRow from '../components/ui/DoctorAppointmentRow';
import { FastActions } from '@/context/FastActionsContext';

export default function DoctorAppointments() {
  const {
    isFetchingDoctorAppointments,
    doctorAppointments,
    doctorAppointmentsError,
  } = useDoctorAppointments();

  if (isFetchingDoctorAppointments) return <Spinner />;

  return (
    <FastActions>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-34">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctorAppointments?.map((appointment) => (
            <DoctorAppointmentRow
              appointment={appointment}
              key={appointment.appointmentId}
            />
          ))}
        </TableBody>
      </Table>
    </FastActions>
  );
}
