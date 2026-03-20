import AppointmentRow from '@/components/ui/AppointmentRow';
import Spinner from '@/components/ui/Spinner';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppointments } from '@/features/appointments/useAppointments';

export default function Appointments() {
  const {
    isFetchingUserAppointments,
    userAppointments,
    userAppointmentsError,
  } = useAppointments();

  if (isFetchingUserAppointments) return <Spinner />;

  // console.log(userAppointments);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userAppointments?.map((appointment) => (
          <AppointmentRow
            appointment={appointment}
            key={appointment.appointmentId}
          />
        ))}
      </TableBody>
    </Table>
  );
}
