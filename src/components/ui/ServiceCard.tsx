import { Clock, Wallet } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './card';
import { formatPrice } from '@/helpers/formatPrice';
import BookingModal from './BookingModal';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Card>
      <CardHeader>{service.name}</CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span>
            <Clock />
          </span>
          <p>{service.duration} min</p>
        </div>

        <div className="flex items-center gap-2">
          <span>
            <Wallet />
          </span>
          <p>{formatPrice(service.price)}</p>
        </div>
      </CardContent>

      <CardFooter>
        <BookingModal service={service} />
      </CardFooter>
    </Card>
  );
}
