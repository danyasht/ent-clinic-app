import { useLogout } from '@/features/authentication/useLogout';
import { Link, NavLink } from 'react-router-dom';
import Spinner from './Spinner';
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

  if (isGettingUser || isLoggingOut) return <Spinner />;
  if (!user) return null;

  const { profileId, role } = user;

  // FIXME: use hook for private routes, not URL params

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

  function getLinkClass({ isActive }) {
    return `block px-4 py-3 rounded transition-colors font-semibold ${isActive ? 'bg-emerald-900 text-emerald-50' : 'hover:bg-emerald-700'}`;
  }

  return (
    <aside className="w-72 bg-emerald-800 text-emerald-50 flex flex-col gap-4">
      <div className="flex items-center justify-left p-6 border-b border-emerald-700 h-16 ">
        <h1 className="text-2xl font-bold">ENT Clinic</h1>
      </div>

      <nav className="flex-1 p-4 space-y-5">
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

      <div className="p-4 border-t border-emerald-700">
        <Link
          to="/"
          className="cursor-pointer block px-4 py-2 text-md text-emerald-100 hover:text-white transition-colors"
        >
          Back to main page
        </Link>
        <button
          disabled={isLoggingOut}
          onClick={() => logout()}
          className="cursor-pointer w-full text-start px-4 py-2 block text-md text-emerald-100 hover:text-white transition-colors"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
