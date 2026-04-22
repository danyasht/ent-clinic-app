const baseClasses = 'inline-block px-3 py-0.5 text-base font-semibold rounded-full';

export function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Completed</span>;
    case 'cancelled':
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>Cancelled</span>;
    case 'confirmed':
      return <span className={`${baseClasses} bg-emerald-100 text-emerald-800`}>Confirmed</span>;
    case 'unconfirmed':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Unconfirmed</span>;
  }
}

export function getPaymentBadge(paymentStatus: boolean) {
  switch (paymentStatus) {
    case true:
      return <span className={`${baseClasses} bg-emerald-100 text-emerald-800`}>Paid</span>;
    case false:
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>No payment yet</span>;
  }
}
