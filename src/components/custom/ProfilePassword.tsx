import { useUpdatePassword } from '@/features/authentication/useUpdatePassword';
import Label from './Label';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ErrorMessage from './ErrorMessage';

export default function ProfilePassword() {
  const { isUpdatingPassword, updatePassword } = useUpdatePassword();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState({ newPwdErr: '', submitPwdErr: '' });

  const isPasswordValid = newPassword.length >= 6;
  const doPasswordsMatch = newPassword === confirmPassword;

  function handleUpdatePassword() {
    setIsSubmitted(true);

    if (!isPasswordValid)
      return setPasswordError((prev) => ({
        ...prev,
        newPwdErr: 'Password must contain at least 6 characters',
      }));

    if (!doPasswordsMatch)
      return setPasswordError((prev) => ({
        ...prev,
        submitPwdErr: 'Passwords must match',
      }));

    updatePassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError({ newPwdErr: '', submitPwdErr: '' });
  }

  return (
    <div className="flex h-full flex-col gap-6 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
      <h1 className="h-10 border-b border-stone-100 text-lg font-semibold text-stone-800">Security & passwords</h1>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex min-h-6 items-center gap-2">
            <Label htmlFor="new-pass">New password</Label>
            {isSubmitted && !isPasswordValid && passwordError.newPwdErr && (
              <ErrorMessage error={passwordError.newPwdErr} />
            )}
          </div>

          <div className="relative">
            <Input
              id="new-pass"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setPasswordError({ newPwdErr: '', submitPwdErr: '' });
                setNewPassword(e.target.value);
              }}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex min-h-6 items-center gap-2">
            <Label htmlFor="confirm-pass">Confirm password</Label>
            {isSubmitted && !doPasswordsMatch && passwordError.submitPwdErr && (
              <ErrorMessage error={passwordError.submitPwdErr} />
            )}
          </div>

          <Input
            id="confirm-pass"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => {
              setPasswordError({ newPwdErr: '', submitPwdErr: '' });
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <Button className="mt-auto w-fit" onClick={handleUpdatePassword} disabled={isUpdatingPassword}>
          Update password
        </Button>
      </div>
    </div>
  );
}
