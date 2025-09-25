import api from "./axios";

export const signup = (payload) => api.post("/auth/signup/company", payload);

export const login = (email, password) =>
    api.post(
    "/auth/login",
    { email, password },                     // ← JSON 바디
    { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

export const logout = () => api.post("/auth/logout");