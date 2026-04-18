import { useUser } from '@/features/authentication/useUser';

import ProfilePreferences from '@/components/custom/ProfilePreferences';
import ProfilePrimaryInfo from '@/components/custom/ProfilePrimaryInfo';
import Spinner from '@/components/custom/Spinner';
import ProfilePassword from '@/components/custom/ProfilePassword';
import ProfileAdditionalInfo from '@/components/custom/ProfileAdditionalInfo';
import DetailBackNav from '@/components/custom/DetailBackNav';

export default function Profile() {
  const { isGettingUser, user, userError, isAuthenticated } = useUser();

  if (isGettingUser) return <Spinner fullScreen />;

  if (!user) return null;

  return (
    <section className="mx-auto max-w-6xl">
      <DetailBackNav description="Profile details" className="mx-4" />

      <div className="grid grid-cols-1 px-4 md:grid-cols-2 md:gap-3">
        <ProfilePrimaryInfo user={user} />
        <ProfilePassword />
        {user.role === 'patient' && <ProfilePreferences user={user} />}
        <ProfileAdditionalInfo user={user} />
      </div>
    </section>
  );
}
