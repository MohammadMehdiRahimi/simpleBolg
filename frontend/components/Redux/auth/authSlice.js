import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    getToken: (state) => {
      return state.token;
    },
  },
});
export const { setToken, getToken } = authSlice.actions;
export default authSlice.reducer;
