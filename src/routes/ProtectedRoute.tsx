import Spinner from "@/components/custom/Spinner";
import { useUser } from "@/features/authentication/useUser";
import type React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isGettingUser, user, isAuthenticated } = useUser();

  if (isGettingUser) return <Spinner />;

  if (!isAuthenticated && !isGettingUser)
    return <Navigate to="/login" replace />;

  return children;
}
