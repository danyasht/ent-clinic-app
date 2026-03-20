import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/ui/Spinner';
import { useUser } from '@/features/authentication/useUser';
import { BadgeCheck, Calendar, Mail } from 'lucide-react';

export default function Profile() {
  const { isGettingUser, user, userError, isAuthenticated } = useUser();

  if (isGettingUser) return <Spinner />;
  if (!user) return null;

  const { profileId, fullName, role, email, dateOfBirth } = user;

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
