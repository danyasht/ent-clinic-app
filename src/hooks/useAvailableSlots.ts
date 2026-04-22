import { useBookedAppointments } from '@/features/appointments/useBookedAppointments';
import { useSchedule } from '@/features/schedule/useSchedule';
import { generateTimeSlots, timeToMins } from '@/helpers/generateTimeSlots';

interface Arguments {
  doctorId: string;
  formattedDate: string;
  serviceDuration: number;
}

export function useAvailableSlots({ doctorId, formattedDate, serviceDuration }: Arguments) {
  const { isFetchingSchedule, schedule, scheduleError } = useSchedule();

  console.log(schedule);

  const { isFetchingBookedAppointments, bookedAppointments, bookedAppointmentsError } = useBookedAppointments(
    doctorId,
    formattedDate,
  );

  const selectedDoctorSchedule = schedule?.find((schedule) => schedule.doctorId === doctorId);

  if (!selectedDoctorSchedule)
    return {
      isLoadingSlots: isFetchingSchedule || isFetchingBookedAppointments,
      availableSlots: [],
      scheduleError,
      bookedAppointmentsError,
    };

  const {
    workStartTime,
    workEndTime,
    lunchStartTime,
    lunchEndTime,
    slotInterval,
    bufferTime = 10,
  } = selectedDoctorSchedule || {};

  const timeSlots = generateTimeSlots({
    workStartTime,
    workEndTime,
    lunchStartTime,
    lunchEndTime,
    slotInterval,
  });

  const activeAppointments = bookedAppointments
    ? bookedAppointments
        .filter((appointment) => appointment.status !== 'cancelled' && appointment.status !== 'completed')
        .map((appointment) => ({
          start: timeToMins(appointment.appointmentTime),
          end: timeToMins(appointment.appointmentTime) + appointment.serviceDuration + bufferTime,
        }))
    : [];

  const availableSlots = timeSlots.filter((slot) => {
    const slotStart = timeToMins(slot);
    const slotEnd = slotStart + serviceDuration;

    if (slotEnd > timeToMins(workEndTime)) return false;

    const isOverlapping = activeAppointments.some((blocker) => slotStart < blocker.end && slotEnd > blocker.start);

    if (isOverlapping) return false;

    return true;
  });

  // console.log(availableSlots);

  return {
    isLoadingSlots: isFetchingBookedAppointments || isFetchingSchedule,
    availableSlots,
    scheduleError,
    bookedAppointmentsError,
  };
}
