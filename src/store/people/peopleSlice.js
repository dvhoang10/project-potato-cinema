import { PersonModel } from "models/models";
import { getActorsList, getDetailsPerson } from "./peopleHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const peopleSlice = createSlice({
  name: "peopleSlice",
  initialState: {
    actor: [],
    person: {
      adult: false,
      also_known_as: [],
      biography: "",
      birthday: "",
      deathday: "",
      gender: 0,
      homepage: "",
      id: 0,
      imdb_id: "",
      known_for_department: "",
      name: "",
      place_of_birth: "",
      popularity: 0,
      profile_path: "",
    },
    acting: [],
    totalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getActorsList.fulfilled, (state, { payload }) => {
      state.actor = payload.results;
      state.totalPages = payload.total_pages;
    });
    builder.addCase(getDetailsPerson.fulfilled, (state, { payload }) => {
      state.person = payload.person;
      state.acting = payload.acting;
    });
  },
});

export default peopleSlice.reducer;
