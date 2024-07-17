import { createSlice } from "@reduxjs/toolkit";
import { checkauthApi } from "../../apiCalls/authCalls";

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = false;
    },
    checkauth(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

// Selector to get auth state
export const selectAuth = (state) => state.auth;

// Export actions and reducer
export const { login, logout, checkauth } = authSlice.actions;
export default authSlice.reducer;
