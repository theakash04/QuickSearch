import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/AuthContext";
import Loading from "./Loading";

interface AuthGuardProps {
  children: React.ReactNode;
  isProtected: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ isProtected, children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (isProtected) {
    if (!user) {
      return (
        <Navigate to="/login" replace state={{ from: location.pathname }} />
      );
    }
    return <>{children}</>;
  }

  if (!isProtected) {
    if (user && (location.pathname === "/" || location.pathname === "/login")) {
      return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default AuthGuard;
