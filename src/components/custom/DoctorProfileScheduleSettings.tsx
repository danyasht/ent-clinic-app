import React, { useState } from 'react';
import Label from './Label';
import { Input } from '../ui/Input';
import { timeToMins } from '@/helpers/generateTimeSlots';
import ErrorMessage from './ErrorMessage';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/Button';
import { useUpdateDoctorSchedule } from '@/features/schedule/useUpdateDoctorSchedule';

interface Schedule {
  doctorId: string;
  workStartTime: string;
  workEndTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  slotInterval: number;
  bufferTime: number;
}

export default function DoctorProfileScheduleSettings({ schedule }: { schedule: Schedule }) {
  const {
    doctorId,
    workStartTime,
    workEndTime,
    lunchStartTime,
    lunchEndTime,
    slotInterval,
    bufferTime = 10,
  } = schedule;

  const { isUpdatingSchedule, updateSchedule } = useUpdateDoctorSchedule();

  const [newBufferTime, setNewBufferTime] = useState(bufferTime);
  const [newSlotInterval, setNewSlotInterval] = useState(slotInterval);

  const [newWorkStart, setNewWorkStart] = useState(workStartTime);
  const [newWorkEnd, setNewWorkEnd] = useState(workEndTime);

  const [newLunchStart, setNewLunchStart] = useState(lunchStartTime);
  const [newLunchEnd, setNewLunchEnd] = useState(lunchEndTime);

  const hasWorkTimeChanges =
    workStartTime !== newWorkStart ||
    workEndTime !== newWorkEnd ||
    lunchStartTime !== newLunchStart ||
    lunchEndTime !== newLunchEnd;

  const hasIntervalBufferChanges = slotInterval !== newSlotInterval || bufferTime !== newBufferTime;

  const hasChanges = hasWorkTimeChanges || hasIntervalBufferChanges;

  // console.log(hasWorkTimeChanges);

  const isNewWorkStartTimeValid = newWorkStart >= '09:00' && newWorkStart <= '11:00';
  const isNewWorkEndTimeValid = newWorkEnd >= '17:00' && newWorkEnd <= '19:00';

  const newLunchDuration = timeToMins(newLunchEnd) - timeToMins(newLunchStart);
  const isLunchValid = newLunchDuration > 0 && newLunchDuration <= 90;

  const isIntervalValid = newSlotInterval > 10 && newSlotInterval < 20;

  const isValid = isNewWorkStartTimeValid && isNewWorkEndTimeValid && isLunchValid && isIntervalValid;

  let tipMessage = null;

  if (!hasChanges) {
    tipMessage = (
      <p className="w-fit rounded-md bg-emerald-100 px-2 py-0.5 text-sm font-semibold text-emerald-600">
        Start typing to enable button
      </p>
    );
  } else if (!isNewWorkStartTimeValid) {
    tipMessage = <ErrorMessage error="Work start must be between 09:00 and 11:00" />;
  } else if (!isNewWorkEndTimeValid) {
    tipMessage = <ErrorMessage error="Work end must be between 17:00 and 19:00" />;
  } else if (!isLunchValid) {
    tipMessage = <ErrorMessage error="Lunch duration must be between 1 and 90 mins" />;
  } else if (!isIntervalValid) {
    tipMessage = <ErrorMessage error="Interval must be between 10 and 20 mins" />;
  }

  function handleUpdateWorkPreferences() {
    updateSchedule({
      doctorId: doctorId,
      workStart: newWorkStart,
      workEnd: newWorkEnd,
      lunchStart: newLunchStart,
      lunchEnd: newLunchEnd,
      bufferTime: newBufferTime,
      slotInterval: newSlotInterval,
    });
  }

  console.log(newSlotInterval);

  return (
    <div className="flex h-full flex-col gap-6 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
      <h1 className="h-10 border-b border-stone-100 text-lg font-semibold text-stone-800">My schedule</h1>

      {/*TODO rework this component + implement update logic*/}

      <div className="grid grid-cols-2 items-center gap-2.5">
        <div className="flex flex-col gap-1.5">
          <div className="flex min-h-6 items-center gap-2">
            <Label>Enter amount of buffer time</Label>
          </div>

          <Select value={newBufferTime.toString()} onValueChange={(value) => setNewBufferTime(Number(value))}>
            <SelectTrigger className="w-fit cursor-pointer">
              <SelectValue placeholder="Select buffer time" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">No buffer (0 minutes)</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="new-interval">Enter new interval time</Label>
          <Input
            id="new-interval"
            type="number"
            value={newSlotInterval}
            onChange={(e) => setNewSlotInterval(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lunch-start">Enter new lunch start time</Label>
          <Input
            id="lunch-start"
            type="time"
            value={newLunchStart}
            onChange={(e) => setNewLunchStart(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lunch-end">Enter new lunch end time</Label>
          <Input id="lunch-end" type="time" value={newLunchEnd} onChange={(e) => setNewLunchEnd(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="work-start">Enter new work start time</Label>
          <Input id="work-start" type="time" value={newWorkStart} onChange={(e) => setNewWorkStart(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="work-end">Enter new work end time</Label>
          <Input id="work-end" type="time" value={newWorkEnd} onChange={(e) => setNewWorkEnd(e.target.value)} />
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2">
        <Button
          className="w-fit"
          onClick={handleUpdateWorkPreferences}
          disabled={!hasChanges || !isValid || isUpdatingSchedule}
        >
          Save work time preferences
        </Button>
        {tipMessage}
      </div>
    </div>
  );
}
