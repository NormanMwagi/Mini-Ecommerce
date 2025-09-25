import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");

const initialState = {
    token: tokenFromStorage || null,
    user: tokenFromStorage ? { username: "demoUser" } : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
         login: (state, action) => {
      // Mock: accept any username/password
      const { username } = action.payload;
      const mockToken = "mock-jwt-token-123456";

      state.token = mockToken;
      state.user = { username };

      localStorage.setItem("token", mockToken);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;