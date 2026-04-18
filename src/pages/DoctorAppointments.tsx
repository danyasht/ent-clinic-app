import Spinner from '../components/custom/Spinner';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDoctorAppointments } from '@/features/appointments/useDoctorAppointments';
import DoctorAppointmentRow from '../components/custom/DoctorAppointmentRow';
import DetailBackNav from '@/components/custom/DetailBackNav';

export default function DoctorAppointments() {
  const { isFetchingDoctorAppointments, doctorAppointments, doctorAppointmentsError } = useDoctorAppointments();

  if (isFetchingDoctorAppointments) return <Spinner />;

  return (
    <>
      <DetailBackNav description="My patients table" />
      <div className="overflow-scroll overflow-y-auto rounded-md border bg-white">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorAppointments?.map((appointment) => (
              <DoctorAppointmentRow appointment={appointment} key={appointment.appointmentId} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
