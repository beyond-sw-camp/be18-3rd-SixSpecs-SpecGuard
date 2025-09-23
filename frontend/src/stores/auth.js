import { defineStore } from "pinia";
import api from "@/api/axios";
import refreshApi from "@/api/refresh";
import { login as loginApi, logout as logoutApi } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

function extractToken(res) {
    const h = res.headers?.authorization || res.headers?.Authorization;
    return h?.replace(/^Bearer\s+/i, "") || res.data?.accessToken || null;
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: localStorage.getItem("accessToken") || null,
        user: JSON.parse(localStorage.getItem("user") || "null"),
        companySlug: localStorage.getItem("companySlug") || null,
    }),
    getters: {
        // 로그인 상태
        isLoggedIn: (state) => !!state.accessToken && !!state.user
    },
    actions: {
        // local login
        async login(email, password) {
        const res = await loginApi(email, password);
        const token = extractToken(res);
        if (!token) throw new Error("로그인 응답에 accessToken 없음");

        this.accessToken = token;
        localStorage.setItem("accessToken", token);

        let payload;
        try { payload = jwtDecode(token); }
        catch { throw new Error("JWT 디코드 실패"); }

        this.companySlug = payload.companySlug;
        localStorage.setItem("companySlug", this.companySlug);

        const me = await api.get(`/company/${this.companySlug}/users/me`);
        this.user = me.data;
        localStorage.setItem("user", JSON.stringify(this.user));
    },

    async loginWithOAuth2() {
        const res = await api.post("/auth/token"); // refresh 쿠키 사용
        const token = extractToken(res);
        if (!token) throw new Error("OAuth2 로그인 실패: AccessToken 없음");

        this.accessToken = token;
        localStorage.setItem("accessToken", token);

        let payload;
        try { payload = jwtDecode(token); }
        catch { throw new Error("JWT 디코드 실패"); }

        this.companySlug = payload.companySlug;
        localStorage.setItem("companySlug", this.companySlug);

        const me = await api.get(`/company/${this.companySlug}/users/me`);
        this.user = me.data;
        localStorage.setItem("user", JSON.stringify(this.user));
    },

    async refreshToken() {
        try {
        const res = await refreshApi.post("/auth/token/refresh");
        const token = extractToken(res);
        if (!token) throw new Error("새로운 액세스 토큰을 받지 못했습니다.");

        this.accessToken = token;
        localStorage.setItem("accessToken", token);

        const payload = jwtDecode(token);
        this.companySlug = payload.companySlug;
        localStorage.setItem("companySlug", this.companySlug);

        return token;
        } catch (err) {
        this.logout();
        throw err;
        }
    },

    async logout() {
        try { await logoutApi(); } catch (e) { console.error("서버 로그아웃 실패:", e); }
        this.accessToken = null;
        this.user = null;
        this.companySlug = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("companySlug");
    },
    },
});
