import Spinner from '@/components/custom/Spinner';
import { useUser } from '@/features/authentication/useUser';
import { Navigate, Outlet } from 'react-router-dom';

export default function DoctorRoute() {
  const { user, isGettingUser } = useUser();

  if (isGettingUser) return <Spinner fullScreen />;

  if (user?.role !== 'doctor') return <Navigate to="/login" replace />;

  return <Outlet />;
}
