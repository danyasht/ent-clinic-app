export function checkDate(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6 || date < new Date(new Date().setHours(0, 0, 0, 0));
}
