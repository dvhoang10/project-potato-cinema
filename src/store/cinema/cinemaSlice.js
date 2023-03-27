import { getCinemasList, getMovieShowtime } from "./cinemaHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const cinemaSlice = createSlice({
  name: "cinemaSlice",
  initialState: {
    cinemaList: [],
    movieShowtime: {},
    seat: [],
    seatIsBooking: [],
  },
  reducers: {
    setSeatIsBooking: (state, { payload }) => {
      const seatUpdate = [...state.seatIsBooking];
      const index = seatUpdate.findIndex(
        (seat) => seat.maGhe === payload.seatIsSelected.maGhe
      );
      if (index === -1) {
        seatUpdate.push(payload.seatIsSelected);
      } else seatUpdate.splice(index, 1);
      return {
        ...state,
        seatIsBooking: seatUpdate,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCinemasList.fulfilled, (state, action) => {
        state.cinemaList = action.payload;
      })
      .addCase(getMovieShowtime.fulfilled, (state, { payload }) => {
        state.movieShowtime = payload.movieShowtime;
        state.seat = payload.seat;
        state.seatIsBooking = payload.seatIsBooking;
      });
  },
});

export const { setSeatIsBooking } = cinemaSlice.actions;

export default cinemaSlice.reducer;
