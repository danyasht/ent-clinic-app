import ServiceCard from '@/components/custom/ServiceCard';
import Spinner from '@/components/custom/Spinner';
import { useDoctors } from '@/features/profiles/useDoctors';
import { useServices } from '@/features/services/useServices';

export default function BookAppointment() {
  const { isFetchingServices, services } = useServices();

  const { isFetchingDoctors, doctors } = useDoctors();

  if (!services || !doctors) return null;
  if (isFetchingServices || isFetchingDoctors) return <Spinner fullScreen />;

  // console.log(services);

  return (
    <div className="p-4">
      <h1 className="mb-5 text-lg font-bold text-emerald-800">Select the service you need</h1>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard service={service} key={service.serviceId} />
        ))}
      </section>
    </div>
  );
}
