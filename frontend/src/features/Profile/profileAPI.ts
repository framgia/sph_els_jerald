import axios from "../../axios/api";

export const fetchSelfProfile = () => {
  return axios.get("/api/users/profile");
};
