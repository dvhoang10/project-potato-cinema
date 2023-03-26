import { getCinemasList } from "./cinemaHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const cinemaSlice = createSlice({
  name: "cinemaSlice",
  initialState: {
    cinemaList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCinemasList.fulfilled, (state, action) => {
      state.cinemaList = action.payload;
    });
  },
});

export default cinemaSlice.reducer;
