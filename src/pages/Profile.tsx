import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/Spinner';
import { useUser } from '@/features/authentication/useUser';
import { BadgeCheck, Calendar, Mail } from 'lucide-react';

export default function Profile() {
  const { isLoading, user, error } = useUser();

  if (isLoading) return <Spinner />;

  const {
    full_name: fullName,
    role,
    date_of_birth: dateOfBirth,
    phone,
    email,
  } = user;

  return (
    <Card className="w-78">
      <CardHeader>
        <CardTitle>{`Your profile, ${fullName}`}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="flex justify-start items-center gap-2">
          <Mail />
          <span>
            <b>Email:</b> {email}
          </span>
        </div>

        <div className="flex justify-start items-center gap-2">
          <BadgeCheck />
          <span>
            <b>Role:</b> {role === 'patient' ? 'Patient' : 'Doctor'}
          </span>
        </div>

        <div className="flex justify-start items-center gap-2">
          <Calendar />
          <span>
            <b>Date of birth:</b>{' '}
            {dateOfBirth ? dateOfBirth : 'Not specified yet'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
