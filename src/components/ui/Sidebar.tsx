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
    return `block px-4 py-2 rounded transition-colors ${isActive ? 'bg-emerald-900 text-white font-semibold' : 'hover:bg-emerald-700 text-emerald-100'}`;
  }

  return (
    <aside className="w-64 bg-emerald-800 text-white flex flex-col">
      <div className="flex items-center justify-left p-6 text-2xl font-bold border-b border-emerald-700 h-16 ">
        ENT Dashboard
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
          className="block px-4 py-2 text-sm text-emerald-200 hover:text-white"
        >
          Back to main page
        </Link>
        <button
          disabled={isLoggingOut}
          onClick={() => logout()}
          className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-emerald-200 hover:text-white transition-colors"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
