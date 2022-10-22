import { configureStore } from "@reduxjs/toolkit";
import { supabase } from "../helpers/supabaseClient";
import authReducer, { authActions } from "./auth-slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    store.dispatch(
      authActions.login({
        user: session.user,
      })
    );
  } else {
    store.dispatch(authActions.logout());
  }
});

export default store;

export type AppDispatch = typeof store.dispatch; // you can use this Dispatch type in your thunks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
