import type { PatientAppointment } from '@/types';

import { getStatusBadge } from '@/helpers/statusBadge';

import { TableCell, TableRow } from '../ui/table';
import Tag from './Tag';

export default function PatientAppointmentRow({
  appointment,
}: {
  appointment: PatientAppointment;
}) {
  const { serviceName, doctorName, status, appointmentTime, appointmentDate } =
    appointment;
  return (
    <TableRow className="pointer-events-none h-20">
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
