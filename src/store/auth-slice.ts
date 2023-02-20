import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { toast } from "react-toastify";
import { CustomError, login, register } from "./auth-thunks";

interface AuthState {
  user: User | null | undefined;
  isLoading: boolean;
  error?: CustomError;
}

const initialAuthState: AuthState = {
  user: undefined,
  isLoading: false,
  error: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setLoggedInUser: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
    },
    resetError: (state) => {
      state.error = undefined;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // No need to set extraReducers to set user state, onAuthStateChanged in store.ts already handled that.
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      if (state.error?.message === "Firebase: Error (auth/wrong-password).") {
        toast.error("Password yang anda ketikkan belum benar.", {
          toastId: "Login-Error",
        });
      } else {
        toast.error(state.error?.message, {
          toastId: "Login-Error",
        });
      }
      state.error = undefined;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      toast.error(state.error?.message, {
        toastId: "Login-Error",
      });
      state.error = undefined;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
