import { createAsyncThunk } from "@reduxjs/toolkit";
import { tmdbServices } from "services/tmdbServices/tmdbServices";
import { TMDB_KEY } from "utils/config";

export const getActorsList = createAsyncThunk(
  "peopleSlice/getActorsList",
  async (page) => {
    const results = await tmdbServices.getTMDB(
      `person/popular?api_key=${TMDB_KEY}&language=en-US&page=${page}`
    );
    return results.data;
  }
);
