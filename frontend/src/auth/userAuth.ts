import CookieService from "../Services/CookieService";

export const isAuthenticated = () => {
  return CookieService.get("token") ? true : false;
};
