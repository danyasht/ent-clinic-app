import ErrorFallback from '@/components/custom/ErrorFallback';
import Spinner from '@/components/custom/Spinner';
import { useUser } from '@/features/authentication/useUser';
import type React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isGettingUser, user, isAuthenticated, userError } = useUser();

  if (isGettingUser) return <Spinner fullScreen />;

  if (userError) return <ErrorFallback global errorMessage={userError.message || 'Network error. Check connection'} />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user) return children;
}
