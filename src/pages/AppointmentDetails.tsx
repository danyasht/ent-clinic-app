import { useState } from 'react';
import { useAppointment } from '@/features/appointments/useAppointment';
import { useUpdateAppointmentPayment } from '@/features/appointments/useUpdateAppointmentPayment';

import Spinner from '@/components/custom/Spinner';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/helpers/formatPrice';

import { getPaymentBadge, getStatusBadge } from '@/helpers/statusBadge';
import AppointmentDescriptionList from '@/components/custom/AppointmentDescriptionList';
import { formatISODate } from '@/helpers/formatDate';
import { useUpdateAppointment } from '@/features/appointments/useUpdateAppointment';
import ErrorFallback from '@/components/custom/ErrorFallback';

export default function AppointmentDetails() {
  const { isFetchingAppointment, appointment, appointmentError } = useAppointment();

  const { isUpdatingPayment, updateAppointmentPayment } = useUpdateAppointmentPayment();

  const { isUpdatingAppointment, updateAppointmentStatus } = useUpdateAppointment();

  const [isChecked, setIsChecked] = useState(false);

  if (isFetchingAppointment) return <Spinner fullScreen />;

  if (appointmentError) return <ErrorFallback errorMessage={appointmentError?.message} />;

  if (!appointment) return <ErrorFallback errorMessage="Appointment not found" />;

  const {
    appointmentId,
    aiSummary,
    patientPhone,
    patientName,
    doctorName,
    patientNotes,
    serviceName,
    appointmentDate,
    appointmentTime,
    status,
    servicePrice,
    isPaid,
    updatedAt,
    paidAt,
  } = appointment;

  // console.log(appointment);

  const statusUpdateText: Record<string, string> = {
    confirmed: 'Confirmed',
    unconfirmed: 'Created',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  const updateLabel = statusUpdateText[status] || 'Updated';

  const appointmentDescriptionArray = [
    { name: 'Patient', value: patientName },
    { name: 'Doctor', value: doctorName },
    { name: 'Patient phone', value: patientPhone },
    { name: 'Date', value: appointmentDate },
    { name: 'Status', value: getStatusBadge(status) },
    { name: 'Time', value: appointmentTime },
    { name: updateLabel, value: formatISODate(updatedAt) || 'now' },
  ];

  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 px-4 md:grid-cols-2 md:gap-3">
        <div className="flex h-full flex-col gap-6 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
          <h1 className="min-h-10 border-b border-stone-100 pb-3 text-lg font-semibold text-stone-800">
            {`Primary information about ${serviceName}`}
          </h1>
          <AppointmentDescriptionList appointmentDetailsArray={appointmentDescriptionArray} />
          {status === 'unconfirmed' && (
            <Button
              disabled={isUpdatingAppointment || isUpdatingPayment}
              onClick={() => {
                updateAppointmentStatus({
                  appointmentId: appointmentId,
                  status: 'confirmed',
                  updatedAt: new Date().toISOString(),
                });
              }}
            >
              Confirm appointment
            </Button>
          )}
        </div>

        <div className="flex h-full flex-col gap-6 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
          <h1 className="min-h-10 border-b border-stone-100 pb-3 text-lg font-semibold text-stone-800">
            Payment details
          </h1>

          <dl className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <dt className="font-medium text-stone-500">Payment status:</dt>
              <dd className="font-bold text-stone-800">{getPaymentBadge(isPaid)}</dd>
            </div>

            {paidAt ? (
              <div className="flex items-center gap-2">
                <dt className="font-medium text-stone-500">Paid at:</dt>
                <dd className="font-bold text-stone-800">{formatISODate(paidAt)}</dd>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <dt className="font-medium text-stone-500">Payment date:</dt>
                <dd className="font-medium text-stone-400">No payment yet</dd>
              </div>
            )}

            <div className="flex items-center gap-2">
              <dt className="font-medium text-stone-500">Service price:</dt>
              <dd className="font-bold text-stone-800">{formatPrice(servicePrice)}</dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-col gap-4">
            {isPaid ? (
              <p className="rounded-md bg-emerald-100 px-3 py-2 leading-snug font-medium text-emerald-800">
                {`Patient ${patientName} has already paid ${formatPrice(servicePrice)} for the service.`}
              </p>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <input
                    id="check"
                    type="checkbox"
                    className="mt-1 h-6 w-6 shrink-0 cursor-pointer"
                    disabled={status !== 'confirmed' || isUpdatingPayment}
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <label htmlFor="check" className="cursor-pointer leading-snug font-medium text-stone-500">
                    {`I confirm that patient ${patientName} has paid ${formatPrice(servicePrice)} for the service.`}
                  </label>
                </div>

                <Button
                  disabled={!isChecked || status !== 'confirmed' || isUpdatingAppointment}
                  variant="default"
                  className="text-md w-full font-semibold"
                  onClick={() => updateAppointmentPayment(appointmentId)}
                >
                  Confirm payment
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="h-full rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
          <p>{patientNotes}</p>
        </div>
        <div className="h-full rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
          {aiSummary || 'Not implemented yet'}
        </div>
      </div>
    </section>
  );
}
