import { formatPrice } from '@/helpers/formatPrice';

import type { Service } from '@/types';

import { Clock, Wallet } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

import BookingModal from './BookingModal';

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
