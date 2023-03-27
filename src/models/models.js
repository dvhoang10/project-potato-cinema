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

export const Cinema = {
  cumRapChieu: [],
  logo: "",
  maHeThongRap: "",
  tenHeThongRap: "",
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

export const BookingModel = {
  maLichChieu: 0,
  danhSachVe: [],
  taiKhoanNguoiDung: "",
};
