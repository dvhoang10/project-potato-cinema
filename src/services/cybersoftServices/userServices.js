import { httpCybersoftServices } from "services/configURL";

export const userService = {
  userLogin: (data) => {
    return httpCybersoftServices.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
  userRegister: (data) => {
    return httpCybersoftServices.post("/api/QuanLyNguoiDung/DangKy", data);
  },
  userInfo: (data) => {
    return httpCybersoftServices.post(
      // `/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${data}`
      `/api/QuanLyNguoiDung/ThongTinTaiKhoan`
    );
  },
  userUpdate: (data) => {
    return httpCybersoftServices.put(
      `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      data
    );
  },
  userUpdateWithAdmin: (data) => {
    return httpCybersoftServices.post(
      `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      data
    );
  },
  usersList: (groupId, keyword) => {
    if (keyword) {
      return httpCybersoftServices.get(
        `/api/QuanLyNguoiDung/TimKiemNguoiDung?maNhom=${groupId}&tuKhoa=${keyword}`
      );
    }
    return httpCybersoftServices.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDung?maNhom=${groupId}`
    );
  },
  userDelete: (data) => {
    return httpCybersoftServices.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${data}`
    );
  },
};
