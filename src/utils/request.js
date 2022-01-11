import axios from "axios";
import { get_local_storage } from "./storage";
const timeOut = 10000;
const baseUrl = "http://localhost:3002";
let token = "";
axios.defaults.headers.common["token"] = token;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: timeOut,
});

instance.interceptors.request.use(
  (config) => {
    token = get_local_storage("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default instance;
