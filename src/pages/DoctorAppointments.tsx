import Spinner from '../components/custom/Spinner';
import { useDoctorAppointments } from '@/features/appointments/useDoctorAppointments';
import DoctorAppointmentRow from '../components/custom/DoctorAppointmentRow';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import FilterSelect from '@/components/custom/FilterSelect';
import { useToggleSortFilterBy } from '@/hooks/useToggleSortFilterBy';

export default function DoctorAppointments() {
  // const inputRef = useRef<HTMLInputElement>(null);

  const { isFetchingDoctorAppointments, doctorAppointments } = useDoctorAppointments();

  const [searchParams, setSearchParams] = useSearchParams();

  const toggleSortFilterBy = useToggleSortFilterBy();

  const initialSearchValue = searchParams.get('serviceName') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearchValue);

  const debouncedSearch = useDebounce(searchQuery, 800);

  const sortBy = searchParams.get('sortBy') || 'appointmentDate-desc';
  const filterBy = searchParams.get('status') || 'all';

  // useEffect(function () {
  //   inputRef.current?.focus();
  // });

  useEffect(
    function () {
      setSearchParams((prevParams) => {
        if (debouncedSearch) {
          prevParams.set('serviceName', debouncedSearch);
        } else {
          prevParams.delete('serviceName');
        }

        return prevParams;
      });
    },
    [debouncedSearch, setSearchParams],
  );

  console.log(filterBy);

  const selectSortItems = [
    { value: 'appointmentDate-desc', label: 'Date (Newest first)' },
    { value: 'appointmentDate-asc', label: 'Date (Oldest first)' },
    { value: 'servicePrice-desc', label: 'Price (High to Low)' },
  ];

  const selectFilterItems = [
    { value: 'all', label: 'All statuses' },
    { value: 'confirmed', label: 'Status (Confirmed)' },
    { value: 'completed', label: 'Status (Completed)' },
    { value: 'unconfirmed', label: 'Status (Unconfirmed)' },
    { value: 'cancelled', label: 'Status (Cancelled)' },
  ];

  if (isFetchingDoctorAppointments) return <Spinner fullScreen />;

  return (
    <div>
      <div className="ml-auto flex w-2/3 items-center gap-2 p-4">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by a service name..."
          // ref={inputRef}
        />

        <FilterSelect
          sortFilterBy={sortBy}
          onChange={(value) => toggleSortFilterBy('sortBy', value)}
          placeholder="Sort by"
          items={selectSortItems}
        />

        <FilterSelect
          sortFilterBy={filterBy}
          onChange={(value) => toggleSortFilterBy('status', value)}
          placeholder="Filter by"
          items={selectFilterItems}
        />
      </div>

      <div role="table" className="flex flex-col rounded-md bg-white p-4">
        <header className="sticky top-0 z-10 grid h-14 grid-cols-[2fr_2fr_1fr_1.5fr_1fr_1.2fr_0.3fr] items-center gap-3 rounded-md border-b bg-stone-50 px-3 font-semibold text-stone-700">
          <div className="text-center">Service</div>
          <div className="text-center">Patient</div>
          <div className="text-center">Status</div>
          <div className="text-center">Paid</div>
          <div className="text-center">Time</div>
          <div className="text-center">Date</div>
          <div></div>
        </header>

        <div className="flex flex-col">
          {doctorAppointments?.map((appointment) => (
            <DoctorAppointmentRow appointment={appointment} key={appointment.appointmentId} />
          ))}
        </div>
      </div>
    </div>
  );
}
