interface parametersType {
  workStartTime: string;
  workEndTime: string;
  slotInterval: number;
  lunchStartTime?: string;
  lunchEndTime?: string;
}

function timeToMins(timeString: string) {
  const [hours, mins] = timeString.split(':');

  return +hours * 60 + +mins;
}

function minsToTime(totalMins: number) {
  const hours = Math.floor(totalMins / 60);
  const minutes = totalMins % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export function generateTimeSlots({
  workStartTime,
  workEndTime,
  slotInterval,
  lunchStartTime,
  lunchEndTime,
}: parametersType) {
  if (!workStartTime || !workEndTime) return [];

  let startTimeMins = timeToMins(workStartTime);
  const endTimeMins = timeToMins(workEndTime);

  const lunchStartMins = lunchStartTime ? timeToMins(lunchStartTime) : null;
  const lunchEndMins = lunchEndTime ? timeToMins(lunchEndTime) : null;

  const slots = [];

  while (startTimeMins <= endTimeMins) {
    const slot = minsToTime(startTimeMins);

    const isLunchTime =
      lunchStartMins !== null &&
      lunchEndMins !== null &&
      startTimeMins >= lunchStartMins &&
      startTimeMins < lunchEndMins;

    if (!isLunchTime) {
      slots.push(slot);
    }

    startTimeMins += slotInterval;
  }

  console.log(slots);

  return slots;
}
