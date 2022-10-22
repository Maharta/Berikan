import { authActions } from "../../store/auth-slice";
import { useAppDispatch } from "../../store/store";

const AccountPage = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return <button onClick={logoutHandler}>Logout</button>;
};

export default AccountPage;
