import Spinner from '@/components/ui/Spinner';
import { useAppointments } from '@/features/appointments/useAppointments';

export default function Appointments() {
  const {
    isFetchingUserAppointments,
    userAppointments,
    userAppointmentsError,
  } = useAppointments();

  if (isFetchingUserAppointments) return <Spinner />;

  console.log(userAppointments);

  // TODO create new component to show all appointments
  // TODO render all user's appointments inside newly created component
  return <div></div>;
}
