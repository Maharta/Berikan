import { Outlet } from "react-router-dom";

function AuthRouteWrapper() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default AuthRouteWrapper;
