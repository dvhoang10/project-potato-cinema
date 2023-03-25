import { GROUP_ID_MOVIE, GROUP_ID_USER } from "utils/config";

export const PersonModel = {
  adult: false,
  also_known_as: [],
  biography: "",
  birthday: "",
  deathday: "",
  gender: 0,
  homepage: "",
  id: 0,
  imdb_id: "",
  known_for_department: "",
  name: "",
  place_of_birth: "",
  popularity: 0,
  profile_path: "",
};

const Cinema = {
  cumRapChieu: [],
  logo: "",
  maHeThongRap: "",
  tenHeThongRap: "",
};

const Genres = {
  id: 0,
  name: "",
};

const Cast = {
  adult: false,
  cast_id: 0,
  character: "",
  credit_id: "",
  gender: 0,
  id: 0,
  known_for_department: "",
  name: "",
  order: 0,
  original_name: "",
  popularity: 0,
  profile_path: "",
};

export const MovieModel = {
  backdrop_path: "",
  runtime: 0,
  vote_average: 0,
  genres: { ...Genres },
  poster_path: "",
  release_date: "",
  title: "",
  tagline: "",
  overview: "",
  showtime: { ...Cinema },
  trailer: "",
  titleUrl: "",
  idMovie: 0,
  id: 0,
  cast: { ...Cast },
};

export const UserModel = {
  taiKhoan: "",
  email: "",
  soDT: "",
  hoTen: "",
  matKhau: "",
  maLoaiNguoiDung: "",
  maNhom: GROUP_ID_USER,
};

export const MovieCyberModel = {
  maPhim: 0,
  tenPhim: "",
  biDanh: "",
  trailer: "",
  hinhAnh: "",
  moTa: "",
  maNhom: GROUP_ID_MOVIE,
  ngayKhoiChieu: "",
  danhGia: 0,
  hot: false,
  dangChieu: false,
  sapChieu: false,
};
