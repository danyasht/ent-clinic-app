import { useUser } from '@/features/authentication/useUser';
import ProfilePreferences from '@/components/custom/ProfilePreferences';
import ProfilePrimaryInfo from '@/components/custom/ProfilePrimaryInfo';
import Spinner from '@/components/custom/Spinner';
import ProfilePassword from '@/components/custom/ProfilePassword';
import ProfileAdditionalInfo from '@/components/custom/ProfileAdditionalInfo';
import ErrorFallback from '@/components/custom/ErrorFallback';
import DoctorProfileScheduleSettings from '@/components/custom/DoctorProfileScheduleSettings';
import { useDoctorSchedule } from '@/features/schedule/useDoctorSchedule';
import ErrorMessage from '@/components/custom/ErrorMessage';

export default function Profile() {
  const { isGettingUser, user } = useUser();

  const isDoctor = user?.role === 'doctor';
  const doctorId = isDoctor ? user?.profileId : '';

  const { isFetchingSchedule, schedule, scheduleError } = useDoctorSchedule({
    doctorId,
    enabled: !!isDoctor && !!doctorId,
  });

  if (isGettingUser) return <Spinner fullScreen />;
  if (!user) return <ErrorFallback errorMessage="User not found" />;

  return (
    <section className="mx-auto p-4">
      {!schedule && isDoctor && (
        <ErrorMessage
          className="mb-4"
          error="Ask admin to set up your schedule, otherwise people won't be able to book appointments"
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
        <ProfilePrimaryInfo user={user} />
        <ProfilePassword />

        {user.role === 'patient' && <ProfilePreferences user={user} />}

        {user.role === 'doctor' &&
          (isFetchingSchedule ? (
            <Spinner />
          ) : scheduleError ? (
            <ErrorFallback errorMessage={scheduleError.message} />
          ) : (
            <DoctorProfileScheduleSettings
              schedule={
                schedule || {
                  doctorId,
                  workStartTime: '09:00',
                  workEndTime: '18:00',
                  lunchStartTime: '13:00',
                  lunchEndTime: '14:00',
                  slotInterval: 15,
                  bufferTime: 10,
                }
              }
            />
          ))}

        <ProfileAdditionalInfo user={user} />
      </div>
    </section>
  );
}
