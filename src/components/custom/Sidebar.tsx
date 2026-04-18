import { useLogout } from '@/features/authentication/useLogout';
import { Link, NavLink } from 'react-router-dom';
import {
  CalendarDays,
  LayoutDashboard,
  Stethoscope,
  User,
  Users,
} from 'lucide-react';
import { useUser } from '@/features/authentication/useUser';

export default function Sidebar() {
  const { isLoggingOut, logout, logoutError } = useLogout();

  const { isGettingUser, user, isAuthenticated, userError } = useUser();

  if (!user) return null;

  const { profileId, role } = user;

  const patientLinks = [
    { name: 'My profile', icon: <User />, to: '/profile' },
    { name: 'Main dashboard', icon: <LayoutDashboard />, to: '/dashboard' },
    {
      name: 'My appointments',
      icon: <CalendarDays />,
      to: `/appointments`,
    },
    { name: 'Book appointment', icon: <Stethoscope />, to: '/book' },
  ];

  const doctorLinks = [
    { name: 'My profile', icon: <User />, to: '/profile' },
    { name: 'Main dashboard', icon: <LayoutDashboard />, to: `/dashboard` },
    { name: 'My patients', icon: <Users />, to: '/patients' },
  ];

  function getLinkClass({ isActive }: { isActive: boolean }) {
    return `block px-4 py-3 rounded transition-colors font-semibold ${isActive ? 'bg-emerald-900 text-emerald-50' : 'hover:bg-emerald-700'}`;
  }

  return (
    <aside className="flex w-72 flex-col gap-4 bg-emerald-800 text-emerald-50">
      <div className="justify-left flex h-16 items-center border-b border-emerald-700 p-6">
        <h1 className="text-2xl font-bold">ENT Clinic</h1>
      </div>

      <nav className="flex-1 space-y-5 p-4">
        {role === 'patient' &&
          patientLinks.map((link) => (
            <NavLink to={link.to} key={link.to} className={getLinkClass}>
              <div className="flex items-center justify-start gap-3">
                {link.icon}
                {link.name}
              </div>
            </NavLink>
          ))}

        {role === 'doctor' &&
          doctorLinks.map((link) => (
            <NavLink to={link.to} key={link.to} className={getLinkClass}>
              <div className="flex items-center justify-start gap-3">
                {link.icon}
                {link.name}
              </div>
            </NavLink>
          ))}
      </nav>

      <div className="border-t border-emerald-700 p-4">
        <Link
          to="/"
          className="text-md block cursor-pointer px-4 py-2 text-emerald-100 transition-colors hover:text-white"
        >
          Back to main page
        </Link>
        <button
          disabled={isLoggingOut}
          onClick={() => logout()}
          className="text-md block w-full cursor-pointer px-4 py-2 text-start text-emerald-100 transition-colors hover:text-white"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
