import ErrorFallback from '@/components/custom/ErrorFallback';
import FilterSelect from '@/components/custom/FilterSelect';
import PatientAppointmentRow from '@/components/custom/PatientAppointmentRow';
import Spinner from '@/components/custom/Spinner';
import { Button } from '@/components/ui/Button';
import { usePatientAppointments } from '@/features/appointments/usePatientAppointments';
import { useToggleSortFilterBy } from '@/hooks/useToggleSortFilterBy';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PatientAppointments() {
  const [searchParams] = useSearchParams();

  const { isFetchingUserAppointments, userAppointments, userAppointmentsError } = usePatientAppointments();

  const toggleSortFilterBy = useToggleSortFilterBy();

  const sortBy = searchParams.get('sortBy') || 'appointmentDate-desc';

  const navigate = useNavigate();

  const selectSortItems = [
    { value: 'appointmentDate-desc', label: 'Date (Newest first)' },
    { value: 'appointmentDate-asc', label: 'Date (Oldest first)' },
  ];

  if (isFetchingUserAppointments) return <Spinner fullScreen />;

  if (!userAppointments?.length)
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3">
        <h3 className="text-xl font-normal">
          You don't have any appointments yet, book one by clicking the button below!
        </h3>
        <Button variant="default" onClick={() => navigate('/book')}>
          Book your first appointment
        </Button>
      </div>
    );

  if (userAppointmentsError) return <ErrorFallback global errorMessage={userAppointmentsError.message} />;

  // console.log(userAppointments);

  return (
    <div>
      <div className="flex justify-end p-4">
        <FilterSelect
          sortFilterBy={sortBy}
          onChange={(value) => toggleSortFilterBy('sortBy', value)}
          placeholder="Sort by"
          items={selectSortItems}
        />
      </div>

      <div role="table" className="flex flex-col rounded-md bg-white p-4">
        <header className="sticky top-0 z-10 grid h-14 grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_100px] items-center gap-4 rounded-md border-b bg-stone-50 px-3 font-semibold text-stone-700">
          <div className="text-center">Service</div>
          <div className="text-center">Doctor</div>
          <div className="text-center">Status</div>
          <div className="text-center">Time</div>
          <div className="text-center">Date</div>
        </header>

        <div className="flex flex-col">
          {userAppointments?.map((appointment) => (
            <PatientAppointmentRow appointment={appointment} key={appointment.appointmentId} />
          ))}
        </div>
      </div>
    </div>
  );
}
