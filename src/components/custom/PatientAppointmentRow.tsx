import { getStatusBadge } from "@/helpers/statusBadge";
import { TableCell, TableRow } from "../ui/table";
import Tag from "./Tag";

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
  const { serviceName, doctorName, status, appointmentTime, appointmentDate } =
    appointment;
  return (
    <TableRow>
      <TableCell>
        <Tag toDisplay={serviceName} />
      </TableCell>
      <TableCell>
        <Tag toDisplay={doctorName} />
      </TableCell>
      <TableCell>{getStatusBadge(status)}</TableCell>
      <TableCell>
        <Tag toDisplay={appointmentTime} />
      </TableCell>
      <TableCell>
        <Tag toDisplay={appointmentDate} />
      </TableCell>
    </TableRow>
  );
}
