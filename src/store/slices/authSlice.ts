import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  lastLogin: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  lastLogin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.lastLogin = new Date().toISOString();
      sessionStorage.setItem("sessionUser", action.payload);
      sessionStorage.setItem("lastLoginTime", state.lastLogin);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.lastLogin = null;
      sessionStorage.clear();
    },
    loadSession(state) {
      const user = sessionStorage.getItem("sessionUser");
      const lastLogin = sessionStorage.getItem("lastLoginTime");
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
        state.lastLogin = lastLogin;
      }
    },
  },
});

export const { login, logout, loadSession } = authSlice.actions;
export default authSlice.reducer;
