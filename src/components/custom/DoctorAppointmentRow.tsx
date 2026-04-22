import { useNavigate } from 'react-router-dom';
import { useUpdateAppointment } from '@/features/appointments/useUpdateAppointment';
import { useDeleteAppointment } from '@/features/appointments/useDeleteAppointment';

import type React from 'react';
import type { DoctorAppointment } from '@/types';

import { getPaymentBadge, getStatusBadge } from '@/helpers/statusBadge';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '../ui/dropdown-menu';
import { Check, CheckCheck, MoreHorizontal, Trash, X } from 'lucide-react';
import Tag from './Tag';

export default function DoctorAppointmentRow({ appointment }: { appointment: DoctorAppointment }) {
  const { isUpdatingAppointment, updateAppointmentStatus } = useUpdateAppointment();
  const { isDeletingAppointment, deleteAppointment } = useDeleteAppointment();
  const navigate = useNavigate();

  const { appointmentId, serviceName, patientName, status, isPaid, appointmentTime, appointmentDate } = appointment;

  function redirectToDetails(appointmentId: string) {
    if (!appointmentId) return;
    navigate(`/appointment/${appointmentId}`);
  }

  function handleMenuAction(e: React.MouseEvent, actionCallback: () => void) {
    e.stopPropagation();
    actionCallback();
  }

  const dropdownMenuItems = [
    {
      label: 'Confirm',
      disabled: status !== 'unconfirmed',
      action: () =>
        updateAppointmentStatus({
          appointmentId: appointmentId,
          status: 'confirmed',
          updatedAt: new Date().toISOString(),
        }),
      icon: <Check />,
    },

    {
      label: 'Complete',
      disabled: !isPaid || status === 'completed' || status === 'cancelled',
      action: () =>
        updateAppointmentStatus({
          appointmentId: appointmentId,
          status: 'completed',
          updatedAt: new Date().toISOString(),
        }),
      icon: <CheckCheck />,
    },
    {
      label: 'Cancel',
      disabled: (isPaid && status === 'confirmed') || status === 'completed' || status === 'cancelled',
      action: () =>
        updateAppointmentStatus({
          appointmentId: appointmentId,
          status: 'cancelled',
          updatedAt: new Date().toISOString(),
        }),
      icon: <X />,
    },
    {
      label: 'Delete',
      disabled: status === 'confirmed' || status === 'unconfirmed',
      action: () => deleteAppointment(appointmentId),
      icon: <Trash />,
    },
  ];

  return (
    <div
      role="row"
      className="grid h-20 cursor-pointer grid-cols-[2fr_2fr_1fr_1.5fr_1fr_1.2fr_0.3fr] items-center gap-3 px-3 transition-colors not-last:border-b hover:bg-stone-50"
      onClick={() => redirectToDetails(appointmentId)}
    >
      <div className="text-center">
        <Tag toDisplay={serviceName} />
      </div>
      <div className="text-center">
        <Tag toDisplay={patientName} />
      </div>
      <div className="text-center">{getStatusBadge(status)}</div>
      <div className="text-center">{getPaymentBadge(isPaid)}</div>
      <div className="text-center">
        <Tag toDisplay={appointmentTime} />
      </div>
      <div className="text-center">
        <Tag toDisplay={appointmentDate} />
      </div>

      <div className="relative flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {dropdownMenuItems.map((item) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={item.label}
                disabled={item.disabled || isDeletingAppointment || isUpdatingAppointment}
                onClick={(e) => handleMenuAction(e, item.action)}
              >
                <span className="h-4 w-4">{item.icon}</span>
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
