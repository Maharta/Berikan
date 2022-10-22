import { createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
}

const initialAuthState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      const { payload } = action;
      state.user = payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
