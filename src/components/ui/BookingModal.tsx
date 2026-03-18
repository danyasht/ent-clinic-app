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

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

export default function BookingModal({ service }: { service: Service }) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [doctorId, setDoctorId] = useState('');
  const [time, setTime] = useState('');

  const {
    isLoading: isGettingDoctors,
    doctors,
    error: doctorsError,
  } = useDoctors();

  const { user: { id: patientId } = {}, isLoading } = useUser();

  const { isPending, createAppointment } = useCreateAppointment();

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
      patient_id: patientId,
      doctor_id: doctorId,
      service_id: service.id,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-emerald-800 font-semibold">
            Book an appointment for {service.name}
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
              {isGettingDoctors ? 'Loading doctors...' : 'Select doctor'}
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
            {timeSlots?.map((time) => (
              <option value={time} key={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={handleCreateAppointment}>Confirm</Button>
      </DialogContent>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">Book appointment</Button>
      </DialogTrigger>
    </Dialog>
  );
}
