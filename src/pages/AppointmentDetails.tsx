import { useState } from 'react';
import { useAppointment } from '@/features/appointments/useAppointment';
import { useUpdateAppointmentPayment } from '@/features/appointments/useUpdateAppointmentPayment';

import Spinner from '@/components/custom/Spinner';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/helpers/formatPrice';

import { getPaymentBadge, getStatusBadge } from '@/helpers/statusBadge';
import DetailBackNav from '@/components/custom/DetailBackNav';
import AppointmentDescriptionList from '@/components/custom/AppointmentDescriptionList';

export default function AppointmentDetails() {
  const { isFetchingAppointment, appointment, appointmentError } = useAppointment();

  const { isUpdatingPayment, updateAppointmentPayment, updatingPaymentError } = useUpdateAppointmentPayment();

  const [isChecked, setIsChecked] = useState(false);

  if (isFetchingAppointment || !appointment) return <Spinner />;

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
  } = appointment;

  // console.log(appointment);

  const appointmentDescriptionArray = [
    { name: 'Patient:', value: patientName },
    { name: 'Doctor:', value: doctorName },
    { name: 'Patient phone:', value: patientPhone },
    { name: 'Date:', value: appointmentDate },
    { name: 'Status:', value: getStatusBadge(status) },
    { name: 'Time:', value: appointmentTime },
  ];

  return (
    <section className="mx-auto max-w-6xl">
      <DetailBackNav description="Appointment details" className="mx-4" />

      <div className="grid grid-cols-1 px-4 md:grid-cols-2 md:gap-3">
        <div className="flex h-full flex-col gap-6 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
          <h1 className="min-h-10 border-b border-stone-100 pb-3 text-lg font-semibold text-stone-800">
            {`Primary information about ${serviceName}`}
          </h1>
          <AppointmentDescriptionList
            status={status}
            updatedAt={updatedAt}
            appointmentDetailsArray={appointmentDescriptionArray}
          />
        </div>

        <div className="flex h-full flex-col gap-6 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
          <h1 className="min-h-10 border-b border-stone-100 pb-3 text-lg font-semibold text-stone-800">
            Payment details
          </h1>
          <div className="flex flex-1 flex-col gap-3">
            <dl className="flex items-center gap-2">
              <dt className="font-medium text-stone-500">Payment status:</dt>
              <dd className="font-bold text-stone-800">{getPaymentBadge(isPaid)}</dd>
            </dl>
            <div className="flex h-full flex-col gap-10">
              {isPaid ? (
                <p className="mt-auto rounded-md bg-emerald-100 px-3 py-2 font-medium text-emerald-800">{`Patient ${patientName} has already paid ${formatPrice(servicePrice)} for the service`}</p>
              ) : (
                <div className="flex h-full flex-col">
                  <div className="flex items-start gap-3">
                    <input
                      id="check"
                      type="checkbox"
                      className="mt-1 h-6 w-6"
                      disabled={status !== 'confirmed'}
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <label
                      htmlFor="check"
                      className="font-medium text-stone-500"
                    >{`I confirm that patient ${patientName} has paid ${formatPrice(servicePrice)} for the service`}</label>
                  </div>
                  <Button
                    disabled={!isChecked || status !== 'confirmed' || isUpdatingPayment}
                    variant="default"
                    className="text-md mt-auto font-semibold"
                    onClick={() => updateAppointmentPayment(appointmentId)}
                  >
                    Confirm payment
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-full rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
          <p>{patientNotes}</p>
        </div>
        <div className="h-full rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">AI summary</div>
      </div>
    </section>
  );
}
