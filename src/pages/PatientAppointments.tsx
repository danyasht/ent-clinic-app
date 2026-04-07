import PatientAppointmentRow from '@/components/custom/PatientAppointmentRow';
import Spinner from '@/components/custom/Spinner';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePatientAppointments } from '@/features/appointments/usePatientAppointments';

export default function PatientAppointments() {
  const {
    isFetchingUserAppointments,
    userAppointments,
    userAppointmentsError,
  } = usePatientAppointments();

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
          <PatientAppointmentRow
            appointment={appointment}
            key={appointment.appointmentId}
          />
        ))}
      </TableBody>
    </Table>
  );
}
