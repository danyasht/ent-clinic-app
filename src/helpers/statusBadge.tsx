const baseClasses = 'inline-block px-2 py-1 text-sm font-semibold rounded-full';

export function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return (
        <span className={`${baseClasses} text-blue-800 bg-blue-100`}>
          Completed
        </span>
      );
    case 'cancelled':
      return (
        <span className={`${baseClasses} text-red-800 bg-red-100`}>
          Cancelled
        </span>
      );
    case 'confirmed':
      return (
        <span className={`${baseClasses} text-emerald-800 bg-emerald-100`}>
          Confirmed
        </span>
      );
    case 'unconfirmed':
      return (
        <span className={`${baseClasses} text-yellow-800 bg-yellow-100`}>
          Unconfirmed
        </span>
      );
  }
}

export function getPaymentBadge(paymentStatus: boolean) {
  switch (paymentStatus) {
    case true:
      return (
        <span className={`${baseClasses} text-emerald-800 bg-emerald-100`}>
          Paid
        </span>
      );
    case false:
      return (
        <span className={`${baseClasses} text-red-800 bg-red-100`}>
          No payment yet
        </span>
      );
  }
}
