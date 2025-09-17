// src/api/axios.js
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import refreshApi from "@/api/refresh";
import router from "@/router";

/** 퍼블릭(무토큰) 경로 */
const PUBLIC_PATTERNS = [
  /^\/auth\/(login|signup|token|verify|invite)/,
  /^\/verify(\/|$)/,
  /^\/invite(\/|$)/,
];
const isPublic = (u = "") => {
  try { u = new URL(u, "http://dummy").pathname; }
  catch (_e) { u = String(u || ""); }
  return PUBLIC_PATTERNS.some((re) => re.test(u));
};

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: false, // 일반 API는 쿠키 불필요
});

/** 요청 인터셉터: 퍼블릭 제외하고 토큰 첨부 */
api.interceptors.request.use((cfg) => {
  const pub = isPublic(cfg.url || "");
  const store = useAuthStore();
  const t = store.accessToken || localStorage.getItem("accessToken");
  if (!pub && t) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${t}`;
  }
  if (import.meta.env.DEV) {
    console.debug("[api:req]", (cfg.method || "").toUpperCase(), cfg.url, "public?", pub, "auth?", !!t);
  }
  return cfg;
});

/** 응답 인터셉터 */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const cfg = error.config || {};

    // 퍼블릭 엔드포인트는 refresh/라우팅 모두 스킵
    if (isPublic(cfg.url || "")) {
      return Promise.reject(error);
    }

    // 네트워크 에러 등
    if (!error.response) return Promise.reject(error);

    // 401 + 만료코드 → Refresh 시도
    if (
      error.response.status === 401 &&
      error.response.data?.code === "ACCESS_TOKEN_EXPIRED" &&
      !cfg._retry
    ) {
      cfg._retry = true;
      try {
        const r = await refreshApi.post("/auth/token/refresh"); // withCredentials:true 인스턴스
        const newToken = r.headers["authorization"]?.replace(/^Bearer\s+/i, "");
        if (newToken) {
          const store = useAuthStore();
          store.accessToken = newToken;
          localStorage.setItem("accessToken", newToken);
          cfg.headers = cfg.headers || {};
          cfg.headers.Authorization = `Bearer ${newToken}`;
          return api(cfg); // 재시도
        }
      } catch {
        useAuthStore().logout();
      }
    }

    // 팀 라우팅 규칙
    const { code, message } = error.response.data || {};
    switch (code) {
      case "EMAIL_MISMATCH":
        router.push({ path: "/signup/invite", query: { error: code, message } }); break;
      case "EXPIRED_TOKEN":
        router.push({ path: "/invite/expired", query: { error: code, message } }); break;
      case "ALREADY_REGISTERED":
        router.push({ path: "/login", query: { error: code, message } }); break;
      case "INVALID_TOKEN":
        router.push({ path: "/error", query: { error: code, message } }); break;
      default:
        if (message) router.push({ path: "/error", query: { message } });
    }
    return Promise.reject(error);
  }
);

export default api;
