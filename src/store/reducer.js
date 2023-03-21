import { combineReducers } from "@reduxjs/toolkit";
import modalVideoSlice from "./modelVideo/modalVideoSlice";
import userSlice from "./user/userSlice";

export const reducers = combineReducers({
  user: userSlice,
  modalVideo: modalVideoSlice,
});
