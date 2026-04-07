import { TableCell, TableRow } from "../ui/table";
import { Check, CheckCheck, MoreHorizontal, Trash, X } from "lucide-react";
import { useUpdateAppointment } from "@/features/appointments/useUpdateAppointment";
import { useDeleteAppointment } from "@/features/appointments/useDeleteAppointment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { getPaymentBadge, getStatusBadge } from "@/helpers/statusBadge";
import Tag from "./Tag";
import { useNavigate } from "react-router-dom";
import type React from "react";

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
  const { deleteAppointment } = useDeleteAppointment();
  const navigate = useNavigate();

  const {
    appointmentId,
    serviceName,
    patientName,
    status,
    isPaid,
    appointmentTime,
    appointmentDate,
  } = appointment;

  function redirectToDetails(appointmentId: string) {
    if (!appointmentId) return;
    navigate(`/appointment/${appointmentId}`);
  }

  function handleMenuAction(e: React.MouseEvent, actionCallback: () => void) {
    e.stopPropagation();
    actionCallback();
  }

  return (
    <TableRow
      className="h-20 cursor-pointer"
      onClick={() => redirectToDetails(appointmentId)}
    >
      <TableCell>
        <Tag toDisplay={serviceName} />
      </TableCell>
      <TableCell>
        <Tag toDisplay={patientName} />
      </TableCell>
      <TableCell>{getStatusBadge(status)}</TableCell>
      <TableCell>{getPaymentBadge(isPaid)}</TableCell>
      <TableCell>
        <Tag toDisplay={appointmentTime} />
      </TableCell>
      <TableCell>
        <Tag toDisplay={appointmentDate} />
      </TableCell>

      <TableCell className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              disabled={
                status === "confirmed" ||
                status === "cancelled" ||
                status === "completed"
              }
              className="flex cursor-pointer items-center justify-start gap-1 disabled:cursor-not-allowed"
              onClick={(e) =>
                handleMenuAction(e, () =>
                  updateAppointmentStatus({
                    appointmentId: appointmentId,
                    status: "confirmed",
                  }),
                )
              }
            >
              <Check className="h-4 w-4" />
              <span>Confirm</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={status === "cancelled" || status === "completed"}
              className="flex cursor-pointer items-center justify-start gap-1 disabled:cursor-not-allowed"
              onClick={(e) =>
                handleMenuAction(e, () =>
                  updateAppointmentStatus({
                    appointmentId: appointmentId,
                    status: "cancelled",
                  }),
                )
              }
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={status === "completed" || status === "cancelled"}
              className="flex cursor-pointer items-center justify-start gap-1 disabled:cursor-not-allowed"
              onClick={(e) =>
                handleMenuAction(e, () =>
                  updateAppointmentStatus({
                    appointmentId: appointmentId,
                    status: "completed",
                  }),
                )
              }
            >
              <CheckCheck className="h-4 w-4" />
              <span>Complete</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={status === "confirmed" || status === "unconfirmed"}
              className="flex cursor-pointer items-center justify-start gap-1 disabled:cursor-not-allowed"
              onClick={(e) =>
                handleMenuAction(e, () => deleteAppointment(appointmentId))
              }
            >
              <Trash className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
