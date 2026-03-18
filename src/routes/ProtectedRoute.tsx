import Spinner from '@/components/ui/Spinner';
import { useUser } from '@/features/authentication/useUser';
import type React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, user, isAuthenticated } = useUser();

  if (isLoading) return <Spinner />;

  if (!isAuthenticated && !isLoading) return <Navigate to="/login" replace />;

  return children;
}
