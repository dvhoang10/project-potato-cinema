import { httpCybersoftServices } from "services/configURL";

export const movieService = {
  moviesList: (groupId, name) => {
    if (name) {
      return httpCybersoftServices.get(
        `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${groupId}&tenPhim=${name}`
      );
    }
    return httpCybersoftServices.get(
      `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${groupId}`
    );
  },
};
