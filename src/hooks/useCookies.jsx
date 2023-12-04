import Cookies from "js-cookie";

function useCookies(cookieName) {
  const setCookie = (value, options) => {
    Cookies.set(cookieName, value, options);
  };

  const getCookie = () => {
    return Cookies.get(cookieName);
  };

  const removeCookie = () => {
    Cookies.remove(cookieName);
  };

  return { getCookie, setCookie, removeCookie };
}

export default useCookies;
