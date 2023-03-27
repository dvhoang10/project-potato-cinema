import { UserModel } from "models/models";
import { localStoreService } from "services/localStoreService";
import { USER_LOGIN, USER_TOKEN } from "utils/config";
import { fecthUserLogin, getUserInfo, getUsersList } from "./userHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const user = localStoreService.getItemLocal(USER_LOGIN);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userLogin: user,
    accountInfo: { ...UserModel },
    ticket: [],
    usersList: [
      {
        ...UserModel,
      },
    ],
    userInfo: { ...UserModel },
  },
  reducers: {
    userLogout: (state, action) => ({
      ...state,
      userLogin: "",
      accountInfo: {},
      ticket: [],
    }),
  },
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
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.usersList = action.payload;
      });
  },
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
