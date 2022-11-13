import { Outlet } from "react-router-dom";

const AuthRouteWrapper = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AuthRouteWrapper;
