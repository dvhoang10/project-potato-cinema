import { createAsyncThunk } from "@reduxjs/toolkit";
import { cinemaService } from "services/cybersoftServices/cinemaServices";

export const getCinemasList = createAsyncThunk(
  "cinemaSlice/getCinemasList",
  async () => {
    const result = await cinemaService.cinemaList();
    return result.data.content;
  }
);

export const addShowTime = createAsyncThunk(
  "cinemaSlice/addShowtime",
  async (data) => {
    const result = await cinemaService.showTimeAddNew(data);
    return result.data.content;
  }
);

export const getShowtimeinfo = createAsyncThunk(
  "cinemaSlice/getShowtimeInfo",
  async (data) => {
    const result = await cinemaService.showTimeInfo(data);
    return result.data.content;
  }
);

export const getMovieShowtime = createAsyncThunk(
  "cinemaSlice/getMovieShowtime",
  async (data) => {
    const result = await cinemaService.movieShowtime(data);
    return {
      movieShowtime: result.data.content.thongTinPhim,
      seat: result.data.content.danhSachGhe,
      seatIsBooking: [],
    };
  }
);

export const postBookingInfo = createAsyncThunk(
  "cinemaSlice/postBookingInfo",
  async (data) => {
    const result = await cinemaService.movieBooking(data);
    return result.data.content;
  }
);
