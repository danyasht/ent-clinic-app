import ServiceCard from '@/components/custom/ServiceCard';
import Spinner from '@/components/custom/Spinner';
import { useDoctors } from '@/features/profiles/useDoctors';
import { useServices } from '@/features/services/useServices';

export default function BookAppointment() {
  const { isFetchingServices, services, servicesError } = useServices();

  const { isFetchingDoctors, doctors, doctorsError } = useDoctors();

  if (isFetchingServices || isFetchingDoctors) return <Spinner />;
  if (!services || !doctors) return null;

  // console.log(services);

  return (
    <div>
      <h1 className="font-bold text-lg mb-5 text-emerald-800">
        Select the service you need
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard service={service} key={service.serviceId} />
        ))}
      </section>
    </div>
  );
}
