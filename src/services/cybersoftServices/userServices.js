import { httpCybersoftServices } from "services/configURL";

export const userService = {
  userLogin: (data) => {
    return httpCybersoftServices.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
  userRegister: (data) => {
    return httpCybersoftServices.post("/api/QuanLyNguoiDung/DangKy", data);
  },
  userInfo: () => {
    return httpCybersoftServices.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  },
  userUpdate: (data) => {
    return httpCybersoftServices.put(
      `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      data
    );
  },
};
