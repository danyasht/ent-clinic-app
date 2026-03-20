import { Clock, Wallet } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './card';
import { formatPrice } from '@/helpers/formatPrice';
import BookingModal from './BookingModal';

interface Service {
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  serviceDescription: string;
}

export default function ServiceCard({ service }: { service: Service }) {
  const {
    serviceId,
    serviceName,
    serviceDuration,
    servicePrice,
    serviceDescription,
  } = service;

  return (
    <Card>
      <CardHeader>{serviceName}</CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span>
            <Clock />
          </span>
          <p>{serviceDuration} min</p>
        </div>

        <div className="flex items-center gap-2">
          <span>
            <Wallet />
          </span>
          <p>{formatPrice(servicePrice)}</p>
        </div>
      </CardContent>

      <CardFooter>
        <BookingModal service={service} />
      </CardFooter>
    </Card>
  );
}
