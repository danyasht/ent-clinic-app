import DoctorDashboard from '@/components/custom/DoctorDashboard';
import PatientDashboard from '@/components/custom/PatientDasboard';
import { useUser } from '@/features/authentication/useUser';

export default function Dashboard() {
  const { user } = useUser();

  return <div>{user?.role === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />}</div>;
}
