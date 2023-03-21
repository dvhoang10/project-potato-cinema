import axios from "axios";
import { CYBERSOFT_TOKEN, CYBERSOFT_URL, USER_TOKEN } from "utils/config";
import { localStoreService } from "./localStoreService";

export const httpCybersoftServices = axios.create({
  baseURL: CYBERSOFT_URL,
  headers: {
    TokenCybersoft: CYBERSOFT_TOKEN,
    Authorization: "Bearer " + localStoreService.getItemLocal(USER_TOKEN),
  },
});
