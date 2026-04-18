export function formatDate(date: Date | string | null) {
  if (!date) return '';

  const toFormat = new Date(date);

  const formatted = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(toFormat);

  return formatted;
}

export function formatISODate(date: Date | string | null) {
  if (!date) return;

  const toFormat = new Date(date);

  const formatted = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }).format(toFormat);

  return formatted;
}
