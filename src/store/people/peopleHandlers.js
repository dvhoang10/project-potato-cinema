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

export const getDetailsPerson = createAsyncThunk(
  "peopleSlice/getDetailsPerson",
  async (id) => {
    const person = await tmdbServices.getTMDB(
      `person/${id}?api_key=${TMDB_KEY}&language=en-US`
    );
    const acting = await tmdbServices.getTMDB(
      `person/${id}/movie_credits?api_key=${TMDB_KEY}&language=en-US`
    );
    const results = {
      person: person.data,
      acting: acting.data.cast,
    };
    return results;
  }
);
