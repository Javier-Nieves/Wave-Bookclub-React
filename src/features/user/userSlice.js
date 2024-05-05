import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
  loadingLogin: false,
  error: null,
  jwt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
