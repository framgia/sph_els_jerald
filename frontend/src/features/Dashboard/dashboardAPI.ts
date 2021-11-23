import axios from "../../axios/api";

export const fetchSelfDashboard = () => {
  return axios.get("/api/users/dashboard");
};
