import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { login, register } from "./auth-thunks";

interface AuthState {
  user: User | null | undefined;
  isLoading: boolean;
  error?: string;
}

const initialAuthState: AuthState = {
  user: undefined,
  isLoading: false,
  error: "",
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
      state.error = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
