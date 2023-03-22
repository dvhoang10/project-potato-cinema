import { combineReducers } from "@reduxjs/toolkit";
import loadingSlice from "./loading/loadingSlice";
import modalVideoSlice from "./modelVideo/modalVideoSlice";
import movieSlice from "./movie/movieSlice";
import userSlice from "./user/userSlice";

export const reducers = combineReducers({
  user: userSlice,
  modalVideo: modalVideoSlice,
  movie: movieSlice,
  loading: loadingSlice,
});
