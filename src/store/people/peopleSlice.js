import { getActorsList } from "./peopleHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const peopleSlice = createSlice({
  name: "peopleSlice",
  initialState: {
    actor: [],
    totalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getActorsList.fulfilled, (state, { payload }) => {
      state.actor = payload.results;
      state.totalPages = payload.total_pages;
    });
  },
});

export default peopleSlice.reducer;
