import axios from "axios";
import Cookies from "universal-cookie";
import { destroyCookie, setCookie } from "../../utils/cookies";
import { API_URL } from "../../utils/constants";

const cookie = new Cookies();
const COOKIE_MAX_AGE = 60 * 60 * 24;
const COOKIE_EXTENDED_MAX_AGE = 60 * 60 * 24 * 5;

const register = async (userData) => {
  const response = await axios.post(API_URL + "/api/users/", userData);

  if (response.data) {
    setCookie("user", response.data);
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "/api/users/login", userData);

  if (response.data) {
    setCookie("user", response.data);
  }

  return response.data;
};

const forgotPassword = async (userData) => {
  const response = await axios.patch(
    API_URL + "/api/users/updatePassword",
    userData
  );

  if (response.data) {
    setCookie("user", response.data);
  }

  return response.data;
};

const logout = async () => {
  destroyCookie("user");
};

const authService = { register, logout, login, forgotPassword };

export default authService;
