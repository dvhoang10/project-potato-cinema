import { getMoviesList } from "./movieHandlers";

const { createSlice } = require("@reduxjs/toolkit");

const movieSlice = createSlice({
  name: "movieSlice",
  initialState: {
    comingSoon: [],
    nowShowing: [],
    movieList: [
      {
        maPhim: 0,
        tenPhim: "",
        biDanh: "",
        trailer: "",
        hinhAnh: "",
        moTa: "",
        maNhom: "",
        ngayKhoiChieu: "",
        danhGia: 0,
        hot: false,
        dangChieu: false,
        sapChieu: false,
      },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMoviesList.fulfilled, (state, action) => {
      state.movieList = action.payload;
      state.comingSoon = state.movieList.filter((movie) => movie.sapChieu);
      state.nowShowing = state.movieList.filter((movie) => movie.dangChieu);
    });
  },
});

export default movieSlice.reducer;
