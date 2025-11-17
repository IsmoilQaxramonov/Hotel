import { http } from "../../../services";

export const loginUser = (username: string, password: string) => {
  return http.post("/auth/login/", { username, password });
};

export const logoutUser = () => {
    return http.post("/auth/logout/");
}

export const handleLogout = () => {
    logoutUser()
}