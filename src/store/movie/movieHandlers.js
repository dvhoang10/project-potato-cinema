import { createAsyncThunk } from "@reduxjs/toolkit";
import { movieService } from "services/cybersoftServices/movieServices";

export const getMoviesList = createAsyncThunk(
  "movieSlice/getMoviesList",
  async ({ groupId, name }, { dispatch }) => {
    const result = await movieService.moviesList(groupId, name);
    return result.data.content;
  }
);
