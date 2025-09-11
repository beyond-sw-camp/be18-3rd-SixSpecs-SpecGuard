import api from "./axios";

export const signup = (payload) => api.post("auth/signup/company", payload);
export const login = (email, password) => api.post("auth/login", { email, password });
export const logout = () => api.post("auth/logout");