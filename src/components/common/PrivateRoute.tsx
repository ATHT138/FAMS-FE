import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../features/user-management/user.slice";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
