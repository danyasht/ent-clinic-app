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
import { useSchedule } from '@/features/schedule/useSchedule';
import { generateTimeSlots } from '@/helpers/generateTimeSlots';

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

  const { isFetchingSchedule, schedule, scheduleError } = useSchedule();

  if (!doctors || !user || !schedule) return null;

  const selectedDoctorSchedule = schedule?.find(
    (schedule) => schedule.doctorId === doctorId,
  );

  const {
    workStartTime,
    workEndTime,
    lunchStartTime,
    lunchEndTime,
    slotInterval,
  } = selectedDoctorSchedule || {};

  generateTimeSlots({
    workStartTime,
    workEndTime,
    lunchStartTime,
    lunchEndTime,
    slotInterval,
  });

  // console.log(selectedDoctorSchedule);

  const {
    serviceId,
    serviceName,
    serviceDuration,
    servicePrice,
    serviceDescription,
  } = service;

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

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
      onSuccess: () => setIsOpen((open) => !open),
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isPending || isFetchingDoctors || isGettingUser || isFetchingSchedule ? (
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
              disabled={!date}
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <div>
            <label htmlFor="doctor-select"></label>
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
            <label htmlFor="time-select"></label>
            <select
              id="time-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option>Select time</option>
              {timeSlots?.map((slot) => (
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
