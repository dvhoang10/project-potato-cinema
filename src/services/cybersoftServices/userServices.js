import { httpCybersoftServices } from "services/configURL";

export const userService = {
  userLogin: (data) => {
    return httpCybersoftServices.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
};
