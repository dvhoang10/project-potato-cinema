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
    console.log("🚀 ~ result:", result);
    return result.data.content;
  }
);
