import { httpCybersoftServices } from "services/configURL";

export const cinemaService = {
  cinemaList: () => {
    return httpCybersoftServices.get(`api/QuanLyRap/LayThongTinHeThongRap`);
  },
  branchList: (id) => {
    return httpCybersoftServices.get(
      `api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`
    );
  },
  showTimeAddNew: (data) => {
    return httpCybersoftServices.post(`api/QuanLyDatVe/TaoLichChieu`, data);
  },
};
