const { createSlice } = require("@reduxjs/toolkit");

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState: {
    loading: true,
  },
  reducers: {
    setLoading: (state) => ({
      ...state,
      loading: true,
    }),
    unSetLoading: (state) => ({
      ...state,
      loading: false,
    }),
  },
});

export const { setLoading, unSetLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
