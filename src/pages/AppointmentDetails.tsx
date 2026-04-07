import Spinner from "@/components/custom/Spinner";
import { Button } from "@/components/ui/Button";
import { useAppointment } from "@/features/appointments/useAppointment";
import { useUpdateAppointmentPayment } from "@/features/appointments/useUpdateAppointmentPayment";
import { formatPrice } from "@/helpers/formatPrice";
import { getPaymentBadge, getStatusBadge } from "@/helpers/statusBadge";
import { useState } from "react";

export default function AppointmentDetails() {
  const { isFetchingAppointment, appointment, appointmentError } =
    useAppointment();

  const { isUpdatingPayment, updateAppointmentPayment, updatingPaymentError } =
    useUpdateAppointmentPayment();

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
  } = appointment;

  console.log(appointment);
  return (
    <>
      <div className="mb-6 flex h-10 items-center justify-between">
        <h1 className="text-lg font-semibold text-stone-800">Details</h1>
        <Button variant="default" className="text-md">
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 px-4 py-4 md:grid-cols-3 md:gap-3">
        <div className="border-atone-100 flex flex-col gap-6 rounded-xl border bg-white px-4 py-4 shadow-sm md:col-span-2">
          <h1 className="h-10 border-b border-stone-100 text-lg font-semibold text-stone-800">
            {`Primary information about ${serviceName}`}
          </h1>
          <dl className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <dt className="font-medium text-stone-500">Patient:</dt>
              <dd className="font-bold text-stone-800">{patientName}</dd>
            </div>
            <div className="flex items-center gap-1">
              <dt className="font-medium text-stone-500">Doctor:</dt>
              <dd className="font-bold text-stone-800">{doctorName}</dd>
            </div>
            <div className="flex items-center gap-1">
              <dt className="font-medium text-stone-500">Date:</dt>
              <dd className="font-bold text-stone-800">{appointmentDate}</dd>
            </div>
            <div className="flex items-center gap-1">
              <dt className="font-medium text-stone-500">Time:</dt>
              <dd className="font-bold text-stone-800">{appointmentTime}</dd>
            </div>
            <div className="flex items-center gap-1">
              <dt className="font-medium text-stone-500">Status:</dt>
              <dd className="font-bold text-stone-800">
                {getStatusBadge(status)}
              </dd>
            </div>
          </dl>
        </div>
        <div className="border-atone-100 flex flex-col gap-6 rounded-xl border bg-white px-4 py-4 shadow-sm">
          <h1 className="h-10 border-b border-stone-100 text-lg font-semibold text-stone-800">
            Payment details
          </h1>
          <div className="flex flex-1 flex-col gap-3">
            <dl className="flex items-center gap-2">
              <dt className="font-medium text-stone-500">Payment status:</dt>
              <dd className="font-bold text-stone-800">
                {getPaymentBadge(isPaid)}
              </dd>
            </dl>
            <div className="flex h-full flex-col gap-10">
              {isPaid ? (
                <p className="mt-auto rounded-md bg-emerald-100 px-3 py-2 font-medium text-emerald-800">{`Patient ${patientName} has already paid ${formatPrice(servicePrice)} for the service`}</p>
              ) : (
                <div className="flex h-full flex-col">
                  <div className="flex flex-1 items-start gap-3">
                    <input
                      id="check"
                      type="checkbox"
                      className="h-7 w-7"
                      disabled={status !== "confirmed"}
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <label
                      htmlFor="check"
                      className="font-medium text-stone-500"
                    >{`I confirm that patient ${patientName} has paid ${formatPrice(servicePrice)} for the service`}</label>
                  </div>
                  <Button
                    disabled={
                      !isChecked || status !== "confirmed" || isUpdatingPayment
                    }
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
      </div>
    </>
  );
}
