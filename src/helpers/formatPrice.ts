export function formatPrice(price: number) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'UAH',
  }).format(price);

  return formatted;
}
