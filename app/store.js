import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import vidReducer from "../features/videos/vidSlice";

export const store = configureStore({
  reducer: { auth: authReducer, vids: vidReducer },
});
