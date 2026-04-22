import { useRef, useState } from 'react';

import type { NewAppointment, Service } from '@/types';

import { useDoctors } from '@/features/profiles/useDoctors';
import { useCreateAppointment } from '@/features/appointments/useCreateAppointment';
import { useUser } from '@/features/authentication/useUser';
import { useAvailableSlots } from '@/hooks/useAvailableSlots';

import { checkDate } from '@/helpers/checkDate';

import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Calendar } from '../ui/calendar';
import Spinner from './Spinner';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import Label from './Label';
import { Input } from '../ui/Input';
import { useNavigate } from 'react-router-dom';
import ErrorFallback from './ErrorFallback';
import ErrorMessage from './ErrorMessage';

export default function BookingModal({ service }: { service: Service }) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [doctorId, setDoctorId] = useState('');
  const [time, setTime] = useState('');
  const [step, setStep] = useState(1);

  const notesRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  const { isFetchingDoctors, doctors, doctorsError } = useDoctors();

  const { user, isGettingUser, userError } = useUser();

  const { isPending, createAppointment } = useCreateAppointment();

  const formattedDate = date ? date.toLocaleDateString('en-CA') : '';

  const { serviceId, serviceName, serviceDuration } = service;

  const { isLoadingSlots, availableSlots, bookedAppointmentsError, scheduleError } = useAvailableSlots({
    doctorId,
    formattedDate,
    serviceDuration,
  });

  const generatingSlotsError = bookedAppointmentsError || scheduleError;

  // console.log(activeAppointments);

  function handleCreateAppointment() {
    const patientNotes = notesRef.current?.value?.trim();

    if (!date || !time || !doctorId) return;

    const newAppointment: NewAppointment = {
      patient_id: user?.profileId || '',
      doctor_id: doctorId,
      service_id: serviceId,
      appointment_date: date?.toLocaleDateString('en-CA'),
      appointment_time: `${time}:00`,
      patient_notes: patientNotes || null,
      ai_summary: null,
      status: 'unconfirmed',
      updated_at: new Date().toISOString(),
    };

    createAppointment(newAppointment, {
      onSuccess: () => {
        setIsOpen((open) => !open);
        setTime('');
        setStep(1);
        navigate('/appointments');
      },
    });
  }

  // console.log(doctorId, time);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        {isPending || isFetchingDoctors || isGettingUser || isLoadingSlots ? (
          <Spinner fullScreen={false} />
        ) : !user || !doctors || userError || doctorsError ? (
          <ErrorFallback global errorMessage={doctorsError?.message || userError?.message} />
        ) : (
          <>
            {step === 1 && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-semibold text-emerald-800">
                    Choose doctor and time for {serviceName}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    disabled={(date) => checkDate(date)}
                    fixedWeeks
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Doctor</Label>
                  <Select value={doctorId} onValueChange={(value) => setDoctorId(value)}>
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Doctors</SelectLabel>
                        {doctors?.map((doctor) => (
                          <SelectItem value={doctor.id} key={doctor.id}>
                            {doctor.fullName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Appointment time</Label>
                  {generatingSlotsError ? (
                    <ErrorMessage error={`Error generating time slots. Please try again.`} />
                  ) : (
                    <Select value={time} onValueChange={(value) => setTime(value)}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select available time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {availableSlots?.map((slot) => (
                            <SelectItem value={slot} key={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <Button onClick={() => setStep(2)}>Next step &rarr;</Button>
              </>
            )}

            {step === 2 && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-semibold text-emerald-800">
                    Personal details for {serviceName}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-1.5">
                  <Label>Contact phone</Label>
                  <Input value={user?.phone || ''} disabled placeholder="Phone number is required" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="notes">Your notes (optional)</Label>
                  <textarea
                    id="notes"
                    ref={notesRef}
                    placeholder="Describe your symptoms or provide questions..."
                    rows={3}
                    className="h-32 w-full resize-none rounded-md border border-stone-200 bg-white px-2 py-2 text-sm tracking-wide shadow-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    disabled={!doctorId || !time || !user?.phone}
                    onClick={
                      user?.phone
                        ? handleCreateAppointment
                        : () => navigate('/profile', { state: { focusPhone: true } })
                    }
                  >
                    {user?.phone ? 'Confirm booking' : 'Go to profile settings'}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-transparent bg-emerald-50 text-emerald-800 hover:border hover:border-emerald-800 hover:bg-white hover:text-emerald-800"
                  >
                    &larr; Previous step
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </DialogContent>

      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">Book appointment</Button>
      </DialogTrigger>
    </Dialog>
  );
}
