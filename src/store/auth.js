import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = { isAuthenticated: false, token: "" };

const authSlice = createSlice({
  name: "authorise",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
