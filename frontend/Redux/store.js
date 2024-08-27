import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import profileReducer from "./profileDetails/profileSlice.js";
export const store = configureStore({
  reducer: { auth: authReducer, profileDetails: profileReducer },
});
