import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice.js";
// import userLoginReducer from "../features/usersLogin/userLoginSlice.js";
import authReducer from "../redux/authSlice.js";
export const store = configureStore({
  reducer: {
    post: postsReducer,
    // user: userLoginReducer,
    user: authReducer,
  },
});


