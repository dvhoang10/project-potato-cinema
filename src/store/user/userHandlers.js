import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "services/cybersoftServices/userServices";

export const fecthUserLogin = createAsyncThunk(
  "userSlice/fecthUserLogin",
  async (data) => {
    const result = await userService.userLogin(data);
    return result.data.content;
  }
);
