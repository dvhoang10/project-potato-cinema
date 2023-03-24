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

export const getUserInfo = createAsyncThunk(
  "userSlice/getUserInfo",
  async (data) => {
    const result = await userService.userInfo(data);
    return {
      accountInfo: result.data.content,
      ticket: result.data.content.thongTinDatVe.reverse(),
    };
  }
);

export const updateUserInfo = createAsyncThunk(
  "userSlice/updateUserInfo",
  async (data) => {
    const result = await userService.userUpdate(data);
    return {
      accountInfo: result.data.content,
      data,
    };
  }
);
