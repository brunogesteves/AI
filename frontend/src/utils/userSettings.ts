import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { IUserProps } from "./types";

export const userSettings = () => {
  const token = Cookies.get("token");
  if (token) {
    const info: IUserProps = jwtDecode(token);
    return info;
  }
};
