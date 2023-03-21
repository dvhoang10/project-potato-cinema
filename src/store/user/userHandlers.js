import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "services/cybersoftServices/userServices";

export const fecthUserLogin = createAsyncThunk(
  "userSlice/fecthUserLogin",
  async (data) => {
    const result = await userService.userLogin(data);
    return result.data.content;
  }
);

export const registerUser = createAsyncThunk(
  "userSlice/registerUser",
  async (data) => {
    const result = await userService.userRegister(data);
    return result;
  }
);
