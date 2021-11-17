import CookieService from "../Services/CookieService";

const axios = require("axios").default;

const TOKEN = CookieService.get("token");

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default instance;
