import { BadgeCheck, Calendar, CircleUser, Mail, Phone } from 'lucide-react';
import ProfileDesriptionList from './ProfileDesriptionList';
import type { User } from '@/types';
import { formatDate } from '@/helpers/formatDate';

export default function ProfilePrimaryInfo({ user }: { user: User }) {
  const { fullName, role, dateOfBirth, email, phone } = user;

  const profileDescriptionArray = [
    { name: 'Full name:', icon: <CircleUser />, value: fullName },
    {
      name: 'Role:',
      icon: <BadgeCheck />,
      value: role === 'patient' ? 'Patient' : 'Doctor',
    },
    {
      name: 'Date of birth:',
      icon: <Calendar />,
      value: dateOfBirth ? formatDate(dateOfBirth) : 'Not specified yet',
    },
    { name: 'Email:', icon: <Mail />, value: email || 'clinic@hello.com' },
    { name: 'Phone number:', icon: <Phone />, value: phone || 'Provide your phone number to enable bookings' },
  ];

  return (
    <div className="flex h-full flex-col gap-6 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
      <h1 className="h-10 border-b border-stone-100 text-lg font-semibold text-stone-800">
        {'Profile primary information'}
      </h1>
      <div className="flex-1">
        <ProfileDesriptionList profileDetailsArray={profileDescriptionArray} />
      </div>
    </div>
  );
}
