import { Outlet, Link } from 'react-router-dom';
import { Hospital } from 'lucide-react';
import Footer from '@/components/custom/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen font-sans">
      <header className="flex items-center justify-between border border-stone-200 px-8 py-4">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 border-b-2 border-emerald-800 pb-1 text-2xl font-bold text-emerald-800 transition-colors hover:border-transparent"
        >
          <Hospital className="h-8 w-8 text-emerald-800" />
          <span className="text-2xl font-bold text-emerald-800">ENT Clinic</span>
        </Link>
        <Link to="/login">Login</Link>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
