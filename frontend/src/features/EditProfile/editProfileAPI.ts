import { AxiosError } from "axios";
import axios from "../../axios/api";

export const fetchSelfDetails = () => {
  return axios.get(`/api/users/details`);
};

export const updateSelfDetails = (data: {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: any;
}) => {
  const form = new FormData();
  form.append("firstName", data.firstName);
  form.append("middleName", data.middleName);
  form.append("lastName", data.lastName);
  form.append("email", data.email);
  form.append("password", data.password);
  if (data.avatar[0]) {
    form.append("avatar", data.avatar[0]);
  }
  return axios
    .post(`/api/users/details/update`, form)
    .catch(function (error: AxiosError) {
      return error.response;
    });
};
