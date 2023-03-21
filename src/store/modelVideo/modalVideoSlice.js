const { createSlice } = require("@reduxjs/toolkit");

const modalVideoSlice = createSlice({
  name: "modalVideoSlice",
  initialState: {
    status: {
      isOpen: false,
      videoId: "",
    },
  },
  reducers: {
    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setStatus } = modalVideoSlice.actions;

export default modalVideoSlice.reducer;
