import type { PatientAppointment } from '@/types';

import { getStatusBadge } from '@/helpers/statusBadge';

import Tag from './Tag';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/Button';
import { CheckCheck, X } from 'lucide-react';
import { useUpdateAppointment } from '@/features/appointments/useUpdateAppointment';

export default function PatientAppointmentRow({ appointment }: { appointment: PatientAppointment }) {
  const { appointmentId, serviceName, doctorName, status, appointmentTime, appointmentDate } = appointment;

  const { isUpdatingAppointment, updateAppointmentStatus } = useUpdateAppointment();
  return (
    <div
      role="row"
      className="grid h-20 grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_100px] items-center gap-4 px-3 transition-colors not-last:border-b"
    >
      <div className="text-center">
        <Tag toDisplay={serviceName} />
      </div>
      <div className="text-center">
        <Tag toDisplay={doctorName} />
      </div>
      <div className="text-center">{getStatusBadge(status)}</div>
      <div className="text-center">
        <Tag toDisplay={appointmentTime} />
      </div>
      <div className="text-center">
        <Tag toDisplay={appointmentDate} />
      </div>
      <div className="flex justify-center">
        {status !== 'completed' && status !== 'cancelled' ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Cancel
                <X />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{`Cancel an appointment for ${serviceName}?`}</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will cancel your appointment and it will no longer be active.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction disabled={isUpdatingAppointment} variant="outline">
                  Go back
                </AlertDialogAction>
                <AlertDialogCancel
                  disabled={isUpdatingAppointment}
                  onClick={() =>
                    updateAppointmentStatus({
                      appointmentId: appointmentId,
                      status: 'cancelled',
                      updatedAt: new Date().toISOString(),
                    })
                  }
                  variant="destructive"
                >
                  Proceed
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <p className="flex h-9 w-fit items-center gap-1.5 rounded-md bg-emerald-100 px-4 text-sm font-medium text-emerald-700">
            Done
            <CheckCheck className="h-4 w-4" />
          </p>
        )}
      </div>
    </div>
  );
}
