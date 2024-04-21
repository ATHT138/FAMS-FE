import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../features/user-management/user.slice";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;
}
