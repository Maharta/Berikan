import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authActions } from "./auth-slice";
import modalReducer from "./modal-slice";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("auth state change -> there is a user");
    store.dispatch(authActions.setLoggedInUser(user.toJSON()));
  } else {
    store.dispatch(authActions.setLoggedInUser(null));
  }
});

export default store;

export type AppDispatch = typeof store.dispatch; // you can use this Dispatch type in your thunks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
