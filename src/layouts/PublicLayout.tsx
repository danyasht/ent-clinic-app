import { Outlet, Link } from 'react-router-dom';
import { Hospital } from 'lucide-react';

export default function PublicLayout() {
  return (
    <div className="min-h-screen font-sans ">
      <header className="border border-stone-200 px-8 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-2xl font-bold text-emerald-800 border-b-2 border-emerald-800 hover:border-transparent transition-colors pb-1"
        >
          <Hospital className="text-emerald-800 w-8 h-8" />
          <span className="text-2xl font-bold text-emerald-800">
            ENT Clinic
          </span>
        </Link>
        <Link to="/login">Login</Link>
      </header>

      <main className="px-8 py-4">
        <Outlet />
      </main>
    </div>
  );
}
