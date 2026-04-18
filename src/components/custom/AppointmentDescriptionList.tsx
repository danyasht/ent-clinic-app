import { formatISODate } from '@/helpers/formatDate';
import type { AppointmentDetailItem } from '@/types';

interface AppointmentDescriptionListProps {
  appointmentDetailsArray: AppointmentDetailItem[];
  status: string;
  updatedAt: string;
}

export default function AppointmentDescriptionList({
  appointmentDetailsArray,
  updatedAt,
  status,
}: AppointmentDescriptionListProps) {
  const statusUpdateText: Record<string, string> = {
    confirmed: 'Confirmed',
    unconfirmed: 'Created',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return (
    <div className="flex flex-1 flex-col gap-3">
      <dl className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-4 md:gap-y-5">
        {appointmentDetailsArray.map((detail) => (
          <div className="flex items-center gap-1" key={detail.name}>
            <dt className="font-medium text-stone-500">{detail.name}</dt>
            <dd className="font-bold text-stone-800">{detail.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-center gap-2">
        <p className="font-medium text-stone-500">{statusUpdateText[status]}:</p>
        <p className="font-bold text-stone-800">{formatISODate(updatedAt) || 'now'}</p>
      </div>
    </div>
  );
}
