import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getToken = (): string => cookies.get("mri_token");

export const setToken = (token: string) => {
  cookies.set("mri_token", token, { path: "/" });
};

export const removeToken = () =>
  cookies.remove("mri_token", { path: "/" });
