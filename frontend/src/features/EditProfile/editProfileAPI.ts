import { AxiosError } from "axios";
import axios from "../../axios/api";
import { User } from "../../Types/User";

export const fetchSelfDetails = () => {
  return axios.get(`/api/users/details`);
};

export const updateSelfDetails = (data: User) => {
  return axios
    .patch(`/api/users/details/update`, data)
    .catch(function (error: AxiosError) {
      return error.response;
    });
};
