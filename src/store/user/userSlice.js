import { UserModel } from "models/models";
import { localStoreService } from "services/localStoreService";
import { USER_LOGIN, USER_TOKEN } from "utils/config";
import { fecthUserLogin, getUserInfo } from "./userHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const user = localStoreService.getItemLocal(USER_LOGIN);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userLogin: user,
    accountInfo: { ...UserModel },
    ticket: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthUserLogin.fulfilled, (state, action) => {
        state.userLogin = action.payload;
        localStoreService.setItemLocal(USER_LOGIN, action.payload);
        localStoreService.setItemLocal(USER_TOKEN, action.payload.accessToken);
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.accountInfo = payload.accountInfo;
        state.ticket = payload.ticket;
      });
  },
});

export default userSlice.reducer;
