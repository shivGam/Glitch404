import Cookies from "universal-cookie";
const cookie = new Cookies();

const COOKIE_MAX_AGE = 60 * 60 * 24;

const COOKIE_EXTENDED_MAX_AGE = 60 * 60 * 24 * 5;

const setCookie = (key, value, extended = false) => {
  cookie.set(key, value, {
    maxAge: extended ? COOKIE_EXTENDED_MAX_AGE : COOKIE_MAX_AGE,
  });
};

const getCookie = (key) => {
  return cookie.get(key);
};

const destroyCookie = (key) => {
  cookie.remove(key);
};

const getUserAuthorizationToken = () => {
  return `Bearer ${getCookie("token")}`;
};

export { setCookie, getCookie, destroyCookie, getUserAuthorizationToken };
