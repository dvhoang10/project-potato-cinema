import { createAsyncThunk } from "@reduxjs/toolkit";
import { cinemaService } from "services/cybersoftServices/cinemaServices";
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

export const getMovieInfo = createAsyncThunk(
  "movieSlice/getMovieInfo",
  async (data) => {
    const result = await movieService.movieInfo(data);
    return result.data.content;
  }
);

export const getMovieDetails = createAsyncThunk(
  "movieSlice/getMovieDetails",
  async (data) => {
    const result = await cinemaService.showTimeInfo(data);
    return result.data.content;
  }
);

export const updateMovieInfo = createAsyncThunk(
  "movieSlice/updateMovieInfo",
  async (data) => {
    const result = await movieService.movieUpdateInfo(data);
    return result.data.content;
  }
);
