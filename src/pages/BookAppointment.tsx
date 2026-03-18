import ServiceCard from '@/components/ui/ServiceCard';
import Spinner from '@/components/ui/Spinner';
import { useDoctors } from '@/features/profiles/useDoctors';
import { useServices } from '@/features/services/useServices';

export default function BookAppointment() {
  const {
    isLoading: isGettingServices,
    services,
    error: servicesError,
  } = useServices();

  const {
    isLoading: isGettingDoctors,
    doctors,
    error: doctorsError,
  } = useDoctors();

  if (isGettingServices || isGettingDoctors) return <Spinner />;

  // console.log(services);

  return (
    <div>
      <h1 className="font-bold text-lg mb-5 text-emerald-800">
        Select the service you need
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </section>
    </div>
  );
}
