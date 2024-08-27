import { createSlice } from "@reduxjs/toolkit";

const profileDetails = createSlice({
  name: "profileDetails",
  initialState: {
    userName: null,
    about: null,
    category: null,
    email: null,
    profileImage: null,
    userId: null,
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    getUserName: (state) => {
      return state.userName;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    getEmail: (state) => {
      return state.email;
    },
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    getAbout: (state) => {
      return state.about;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    getCategory: (state) => {
      return state.category;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    getProfileImage: (state) => {
      return state.profileImage;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    getUserId: (state) => {
      return state.userId;
    },
  },
});

export const {
  setUserName,
  getUserName,
  setEmail,
  getEmail,
  setAbout,
  getAbout,
  setCategory,
  getCategory,
  setProfileImage,
  getProfileImage,
  setUserId,
  getUserId,
} = profileDetails.actions;
export default profileDetails.reducer;
