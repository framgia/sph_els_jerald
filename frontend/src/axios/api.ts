import CookieService from "../Services/CookieService";

import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CookieService.get("token")}`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
