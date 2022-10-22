import { supabase } from "../helpers/supabaseClient";
import { authActions } from "./auth-slice";
import { AppDispatch } from "./store";

export const loginThunk = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      dispatch(
        authActions.login({
          user: data?.session?.user,
        })
      );
      return data?.session?.user;
    } catch (error) {
      alert(error);
    }
  };
};

export const logoutThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      dispatch(authActions.logout());
    } catch (error) {
      alert(error);
    }
  };
};
