import { createAsyncThunk } from "@reduxjs/toolkit";
import { movieService } from "services/cybersoftServices/movieServices";

export const getMoviesList = createAsyncThunk(
  "movieSlice/getMoviesList",
  async ({ groupId, name }, { dispatch }) => {
    const result = await movieService.moviesList(groupId, name);
    return result.data.content;
  }
);

export const deleteMovie = createAsyncThunk(
  "moviesSlice/deleteMovie",
  async (data) => {
    const result = await movieService.movieDelete(data);
    console.log("🚀 ~ result:", result);
  }
);
