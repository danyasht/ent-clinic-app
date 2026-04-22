import React, { useState } from 'react';
import Label from './Label';
import { Input } from '../ui/Input';
import { useDoctorSchedule } from '@/features/schedule/useDoctorSchedule';
import Spinner from './Spinner';
import ErrorFallback from './ErrorFallback';
import { timeToMins } from '@/helpers/generateTimeSlots';
import ErrorMessage from './ErrorMessage';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Schedule {
  workStartTime: string;
  workEndTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  slotInterval: number;
  bufferTime: number;
}

export default function DoctorProfileScheduleSettings({ schedule }: { schedule: Schedule }) {
  const { workStartTime, workEndTime, lunchStartTime, lunchEndTime, slotInterval, bufferTime = 10 } = schedule;

  const [newBufferTime, setNewBufferTime] = useState(bufferTime);

  const [newLunchStart, setNewLunchStart] = useState('');
  const [newLunchEnd, setNewLunchEnd] = useState('');

  console.log(schedule);

  const newLunchDuration = timeToMins(newLunchEnd) - timeToMins(newLunchStart);

  return (
    <div className="flex h-full flex-col gap-6 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
      <h1 className="h-10 border-b border-stone-100 text-lg font-semibold text-stone-800">My schedule</h1>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex min-h-6 items-center gap-2">
            <Label>Enter amount of buffer time</Label>
          </div>
          <Select value={newBufferTime.toString()} onValueChange={(value) => setNewBufferTime(Number(value))}>
            <SelectTrigger className="w-1/3 cursor-pointer">
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

        {/*TODO rework this component + implement update logic*/}

        {/* <div className="flex flex-col gap-1.5">
          <Label htmlFor="dob">Enter your date of birth</Label>
          <Input
            id="dob"
            type="date"
            value={dobInput}
            onChange={(e) => setDobInput(e.target.value)}
            onBlur={() => setDobInput(dateOfBirth || '')}
          />
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <Button className="w-fit" onClick={handleSaveAddInfo} disabled={!hasAddInfoChanges || isSavingAddInfo}>
            Save details
          </Button>
          {!hasAddInfoChanges && (
            <p className="w-fit rounded-md bg-emerald-100 px-2 py-0.5 text-sm font-semibold text-emerald-600">
              Start typing to enable button
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
}
