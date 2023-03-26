import { Cinema, MovieCyberModel } from "models/models";
import { getMovieDetails, getMovieInfo, getMoviesList } from "./movieHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const movieSlice = createSlice({
  name: "movieSlice",
  initialState: {
    comingSoon: [],
    nowShowing: [],
    movieList: [
      {
        ...MovieCyberModel,
      },
    ],
    movieInfo: {
      ...MovieCyberModel,
    },
    movieDetails: {
      ...MovieCyberModel,
      heThongRapChieu: {
        ...Cinema,
      },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMoviesList.fulfilled, (state, action) => {
      state.movieList = action.payload;
      state.comingSoon = state.movieList.filter((movie) => movie.sapChieu);
      state.nowShowing = state.movieList.filter((movie) => movie.dangChieu);
    });
    builder.addCase(getMovieInfo.fulfilled, (state, action) => {
      state.movieInfo = action.payload;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, action) => {
      state.movieDetails = action.payload;
    });
  },
});

export default movieSlice.reducer;
