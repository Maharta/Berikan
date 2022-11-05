import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: JSX.Element;
  redirectPath?: string;
  isAllowed: boolean;
}

const ProtectedRoute = ({
  children,
  redirectPath = "/home",
  isAllowed,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
