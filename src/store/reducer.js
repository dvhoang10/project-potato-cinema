import { combineReducers } from "@reduxjs/toolkit";
import cinemaSlice from "./cinema/cinemaSlice";
import loadingSlice from "./loading/loadingSlice";
import modalVideoSlice from "./modelVideo/modalVideoSlice";
import movieSlice from "./movie/movieSlice";
import peopleSlice from "./people/peopleSlice";
import userSlice from "./user/userSlice";

export const reducers = combineReducers({
  user: userSlice,
  modalVideo: modalVideoSlice,
  movie: movieSlice,
  loading: loadingSlice,
  people: peopleSlice,
  cinema: cinemaSlice,
});
