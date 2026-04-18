import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import Label from './Label';
import { useSaveAddInfo } from '@/features/profiles/useSaveAddInfo';
import type { User } from '@/types';
import ErrorMessage from './ErrorMessage';
import { useLocation } from 'react-router-dom';

export default function ProfileAdditionalInfo({ user }: { user: User }) {
  const { profileId, phone, dateOfBirth } = user;

  const [phoneInput, setPhoneInput] = useState(phone || '');
  const [phoneError, setPhoneError] = useState('');
  const [dobInput, setDobInput] = useState(dateOfBirth || '');

  const location = useLocation();
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(
    function () {
      if (location.state?.focusPhone) {
        phoneRef.current?.focus();

        window.history.replaceState({}, document.title);
      }
    },
    [location.state],
  );

  const { isSavingAddInfo, saveAddInfo, saveAddInfoError } = useSaveAddInfo();

  const phoneValidationRegex = /^(\+38)?\s?\(?0\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

  const hasAddInfoChanges = phoneInput !== (phone || '') || dobInput !== (dateOfBirth || '');

  function handleSaveAddInfo() {
    if (!hasAddInfoChanges) return;

    const isValid = phoneInput === '' || phoneValidationRegex.test(phoneInput);
    if (!isValid) return setPhoneError('Enter valid phone number format');

    const payloadDate = dobInput === '' ? null : dobInput;
    const payloadPhone = phoneInput === '' ? null : phoneInput;

    saveAddInfo({
      profileId,
      phoneInput: payloadPhone,
      dobInput: payloadDate,
    });
    setPhoneError('');
  }

  return (
    <div className="flex h-full flex-col gap-6 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
      <h1 className="h-10 border-b border-stone-100 text-lg font-semibold text-stone-800">Additional information</h1>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex min-h-6 items-center gap-2">
            <Label htmlFor="phone-number">Enter your phone number</Label>
            {phoneError !== '' && <ErrorMessage error={phoneError} />}
          </div>
          <Input
            id="phone-number"
            ref={phoneRef}
            placeholder="+380"
            value={phoneInput}
            onChange={(e) => {
              setPhoneInput(e.target.value);
              if (phoneError) setPhoneError('');
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="dob">Enter your date of birth</Label>
          <Input id="dob" type="date" value={dobInput} onChange={(e) => setDobInput(e.target.value)} />
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
        </div>
      </div>
    </div>
  );
}
