import { localStoreService } from "services/localStoreService";
import { USER_LOGIN, USER_TOKEN } from "utils/config";
import { fecthUserLogin } from "./userHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const user = localStoreService.getItemLocal(USER_LOGIN);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userLogin: user,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fecthUserLogin.fulfilled, (state, action) => {
      state.userLogin = action.payload;
      localStoreService.setItemLocal(USER_LOGIN, action.payload);
      localStoreService.setItemLocal(USER_TOKEN, action.payload.accessToken);
    });
  },
});

export default userSlice.reducer;
