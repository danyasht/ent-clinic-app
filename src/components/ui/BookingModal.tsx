import { Button } from './Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Calendar } from './calendar';
import { useState } from 'react';
import { useDoctors } from '@/features/profiles/useDoctors';
import { useCreateAppointment } from '@/features/appointments/useCreateAppointment';
import { useUser } from '@/features/authentication/useUser';
import Spinner from './Spinner';
import { useAvailableSlots } from '@/hooks/useAvailableSlots';
import { checkDate } from '@/helpers/checkDate';

interface Service {
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  serviceDescription: string;
}

export default function BookingModal({ service }: { service: Service }) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [doctorId, setDoctorId] = useState('');
  const [time, setTime] = useState('');

  const { isFetchingDoctors, doctors, doctorsError } = useDoctors();

  const { user, isGettingUser, userError } = useUser();

  const { isPending, createAppointment } = useCreateAppointment();

  const formattedDate = date ? date.toLocaleDateString('en-CA') : '';

  const {
    serviceId,
    serviceName,
    serviceDuration,
    servicePrice,
    serviceDescription,
  } = service;

  const { isLoadingSlots, availableSlots } = useAvailableSlots({
    doctorId,
    formattedDate,
    serviceDuration,
  });

  // console.log(activeAppointments);

  if (!doctors || !user) return null;

  function handleCreateAppointment() {
    if (!date) return;

    const newAppointment = {
      patient_id: user?.profileId,
      doctor_id: doctorId,
      service_id: serviceId,
      appointment_date: date?.toLocaleDateString('en-CA'),
      appointment_time: `${time}:00`,
      status: 'unconfirmed',
    };

    createAppointment(newAppointment, {
      onSuccess: () => {
        setIsOpen((open) => !open);
        setTime('');
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isPending || isFetchingDoctors || isGettingUser || isLoadingSlots ? (
        <Spinner />
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-emerald-800 font-semibold">
              Book an appointment for {serviceName}
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Calendar
              mode="single"
              disabled={(date) => checkDate(date)}
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <div>
            <select
              id="doctor-select"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            >
              <option>
                {isFetchingDoctors ? 'Loading doctors...' : 'Select doctor'}
              </option>
              {doctors?.map((doctor) => (
                <option value={doctor.id} key={doctor.id}>
                  {doctor.fullName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              id="time-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option>Select time</option>
              {availableSlots?.map((slot) => (
                <option value={slot} key={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={handleCreateAppointment}>Confirm</Button>
        </DialogContent>
      )}

      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">Book appointment</Button>
      </DialogTrigger>
    </Dialog>
  );
}
