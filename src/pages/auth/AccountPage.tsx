import { logout } from "../../store/auth-thunks";

const AccountPage = () => {
  const logoutHandler = () => {
    logout();
  };

  return <button onClick={logoutHandler}>Logout</button>;
};

export default AccountPage;
