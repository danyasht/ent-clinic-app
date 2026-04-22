import type { AppointmentDetailItem } from '@/types';

interface AppointmentDescriptionListProps {
  appointmentDetailsArray: AppointmentDetailItem[];
}

export default function AppointmentDescriptionList({ appointmentDetailsArray }: AppointmentDescriptionListProps) {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <dl className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-4 md:gap-y-5">
        {appointmentDetailsArray.map((detail, index) => {
          const isLastOdd = index === appointmentDetailsArray.length - 1 && appointmentDetailsArray.length % 2 !== 0;
          return (
            <div className={`flex items-center gap-1 ${isLastOdd ? 'md:col-span-2' : ''}`} key={detail.name}>
              <dt className="font-medium text-stone-500">{detail.name}:</dt>
              <dd className="font-bold text-stone-800">{detail.value}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
