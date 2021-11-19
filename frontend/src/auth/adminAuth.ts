import CookieService from "../Services/CookieService";

export const isAdminAuthenticated = () => {
  return CookieService.get("adminToken") ? true : false;
};
