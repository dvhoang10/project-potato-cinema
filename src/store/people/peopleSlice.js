import { PersonModel } from "models/models";
import { getActorsList, getDetailsPerson } from "./peopleHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const peopleSlice = createSlice({
  name: "peopleSlice",
  initialState: {
    actor: [],
    person: { ...PersonModel },
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
