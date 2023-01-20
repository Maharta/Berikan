import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import authReducer, { authActions } from "./auth-slice";
import modalReducer from "./modal-slice";
import { auth } from "../firebase";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(authActions.setLoggedInUser(user.toJSON()));
  } else {
    store.dispatch(authActions.setLoggedInUser(null));
  }
});

export default store;

export type AppDispatch = typeof store.dispatch; // you can use this Dispatch type in your thunks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
