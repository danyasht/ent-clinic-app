export function formatDate(date: Date) {
  const formatted = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  }).format(date);

  return formatted;
}
