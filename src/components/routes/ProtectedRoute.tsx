import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: JSX.Element;
  redirectPath?: string;
  isAllowed: boolean;
}

function ProtectedRoute({
  children,
  redirectPath = "/home",
  isAllowed,
}: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
}

export default ProtectedRoute;
