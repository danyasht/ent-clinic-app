export function checkDate(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6;
}
