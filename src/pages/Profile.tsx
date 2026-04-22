import { useUser } from '@/features/authentication/useUser';

import ProfilePreferences from '@/components/custom/ProfilePreferences';
import ProfilePrimaryInfo from '@/components/custom/ProfilePrimaryInfo';
import Spinner from '@/components/custom/Spinner';
import ProfilePassword from '@/components/custom/ProfilePassword';
import ProfileAdditionalInfo from '@/components/custom/ProfileAdditionalInfo';
import ErrorFallback from '@/components/custom/ErrorFallback';
import DoctorProfileScheduleSettings from '@/components/custom/DoctorProfileScheduleSettings';
import { useDoctorSchedule } from '@/features/schedule/useDoctorSchedule';

export default function Profile() {
  const { isGettingUser, user } = useUser();

  const { isFetchingSchedule, schedule, scheduleError } = useDoctorSchedule();

  if (isGettingUser) return <Spinner fullScreen />;

  if (!user) return <ErrorFallback errorMessage="User not found" />;

  if (!schedule) return <ErrorFallback errorMessage={scheduleError?.message} />;

  return (
    <section className="mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
        <ProfilePrimaryInfo user={user} />
        <ProfilePassword />
        {user.role === 'patient' && <ProfilePreferences user={user} />}
        {user.role === 'doctor' && <DoctorProfileScheduleSettings schedule={schedule} />}
        <ProfileAdditionalInfo user={user} />
      </div>
    </section>
  );
}
