import { getMoviesList } from "store/movie/movieHandlers";
import { getDetailsPerson } from "store/people/peopleHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState: {
    loading: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMoviesList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getMoviesList.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const { setLoading, unSetLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
