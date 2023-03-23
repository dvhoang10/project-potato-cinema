import axios from "axios";
import { TMDB_URL } from "utils/config";

export const tmdbServices = {
  getTMDB: (url) => {
    return axios({
      method: "GET",
      url: `${TMDB_URL}${url}`,
    });
  },
};
