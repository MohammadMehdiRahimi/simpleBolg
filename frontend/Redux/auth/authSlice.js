import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userIn: false,
    changeProfile: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    getToken: (state) => {
      return state.token;
    },
    setUserIn: (state, action) => {
      state.userIn = action.payload;
    },
    getUserIn: (state, action) => {
      return state.userIn;
    },
    setChangeProfile: (state, action) => {
      state.changeProfile = action.payload;
    },
    getChangeProfile: (state, action) => {
      return state.changeProfile;
    },
  },
});

export const {
  setToken,
  getToken,
  setUserIn,
  getUserIn,
  setChangeProfile,
  getChangeProfile,
} = authSlice.actions;
export default authSlice.reducer;
