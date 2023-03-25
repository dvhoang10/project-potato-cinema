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
  "movieSlice/deleteMovie",
  async (data) => {
    const result = await movieService.movieDelete(data);
    return result.data.content;
  }
);

export const addMovie = createAsyncThunk(
  "movieSlice/addMovie",
  async (data) => {
    const result = await movieService.movieAddNew(data);
    return result.data.content;
  }
);
