import { useState } from 'react';
import Label from './Label';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useSavePreferences } from '@/features/profiles/useSavePreferences';
import type { User } from '@/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import ErrorMessage from './ErrorMessage';

export default function ProfilePreferences({ user }: { user: User }) {
  const { profileId, bloodType, allergies } = user;

  const [bloodTypeInput, setBloodTypeInput] = useState(bloodType || '');
  const [allergiesInput, setAllergiesInput] = useState(allergies?.join(', ') || '');

  const { isSavingPreferences, savePreferences } = useSavePreferences();

  const hasPreferencesChanges =
    bloodTypeInput !== (bloodType || '') || allergiesInput !== (allergies?.join(', ') || '');
  console.log(hasPreferencesChanges);

  // console.log(allergies?.join(','));
  // console.log(allergiesInput);

  const regex = /^[a-zA-Z]{4,}$/;

  function handleSavePreferences() {
    const allergiesTrimmed = allergiesInput
      .split(',')
      .map((el) => el.trim())
      .filter((el) => regex.test(el));

    const allergiesPayload = allergiesTrimmed.length > 0 ? allergiesTrimmed : null;

    // console.log(allergiesPayload);

    savePreferences({ profileId, bloodType: bloodTypeInput, allergies: allergiesPayload });
  }

  return (
    <div className="flex h-full flex-col gap-6 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
      <h1 className="h-10 border-b border-stone-100 text-lg font-semibold text-stone-800">Personal preferences</h1>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex min-h-6 items-center gap-2">
            <Label htmlFor="blood-type">Blood type</Label>
            {!bloodType && !bloodTypeInput && <ErrorMessage error="Blood type is required" />}
          </div>

          <Select value={bloodTypeInput} onValueChange={(value) => setBloodTypeInput(value)}>
            <SelectTrigger id="blood-type" className="w-full cursor-pointer">
              <SelectValue placeholder="Select your blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Blood types</SelectLabel>
                <SelectItem value="O+">O+ (First positive)</SelectItem>
                <SelectItem value="O-">O- (First negative)</SelectItem>
                <SelectItem value="A+">A+ (Second positive)</SelectItem>
                <SelectItem value="A-">A- (Second negative)</SelectItem>
                <SelectItem value="B+">B+ (Third positive)</SelectItem>
                <SelectItem value="B-">B- (Third negative)</SelectItem>
                <SelectItem value="AB+">AB+ (Fourth positive)</SelectItem>
                <SelectItem value="AB-">AB- (Fourth negative)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="allergies">Enter your allergies (comma separated)</Label>
          <Input
            type="text"
            pattern="[a-zA-Z]*"
            id="allergies"
            placeholder="e.g. Penicillin, Peanuts"
            value={allergiesInput}
            onChange={(e) => setAllergiesInput(e.target.value)}
          />
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <Button
            className="w-fit"
            onClick={handleSavePreferences}
            disabled={!hasPreferencesChanges || isSavingPreferences}
          >
            Save preferences
          </Button>
          {!hasPreferencesChanges && (
            <p className="w-fit rounded-md bg-emerald-100 px-2 py-0.5 text-sm font-semibold text-emerald-600">
              Start typing to enable button
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
