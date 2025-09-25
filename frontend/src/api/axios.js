// src/api/axios.js
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import refreshApi from "@/api/refresh";
import router from "@/router";

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true, // Refresh 쿠키 전송 허용
});

/** 퍼블릭(무토큰) 경로 */
const PUBLIC_PATTERNS = [
  /^\/auth\/(login|signup|token|verify|invite)/,
  /^\/verify(\/|$)/,
  /^\/invite(\/|$)/,
];
const isPublic = (u = "") => {
  try { u = new URL(u, "http://dummy").pathname; }
  catch (e) { u = String(u || ""); }
  return PUBLIC_PATTERNS.some((re) => re.test(u));
};

/** 요청 인터셉터: 퍼블릭 제외하고 토큰 첨부 */
api.interceptors.request.use((cfg) => {
  const pub = isPublic(cfg.url || "");
  const store = useAuthStore();
  const t = store.accessToken || localStorage.getItem("accessToken");
  if (!pub && t) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${t}`;
  }
  if (!pub && store?.companySlug) {
    cfg.headers = cfg.headers || {};
    cfg.headers["X-Company-Slug"] = store.companySlug;
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

    if (isPublic(cfg.url || "") || cfg._skipGlobalError) {
      return Promise.reject(error);
    }

    // 네트워크 에러 등
    if (!error.response) return Promise.reject(error);

    const { status, data } = error.response;


    // 401만 전역 처리 (토큰 만료시 refresh)
    if (status === 401) {
      console.warn(
        '[401]',
        cfg.method?.toUpperCase(),
        cfg.url,
        { params: cfg.params, data: cfg.data }
      )
      if (data?.code === "ACCESS_TOKEN_EXPIRED" && !cfg._retry) {
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
      // refresh 실패 또는 기타 401 → 로그인으로
      router.push({ path: "/login", query: { error: data?.code || "UNAUTHORIZED", message: data?.message } });
      return Promise.reject(error);
    }

    // 초대/검증 관련 특별 코드만 라우팅
    const { code, message } = data || {};
    if (code === "EMAIL_MISMATCH") {
      router.push({ path: "/signup/invite", query: { error: code, message } });
      return Promise.reject(error);
    }
    if (code === "EXPIRED_TOKEN") {
      router.push({ path: "/invite/expired", query: { error: code, message } });
      return Promise.reject(error);
    }
    if (code === "ALREADY_REGISTERED") {
      router.push({ path: "/login", query: { error: code, message } });
      return Promise.reject(error);
    }
    if (code === "INVALID_TOKEN") {
      router.push({ path: "/error", query: { error: code, message } });
      return Promise.reject(error);
    }

    // 나머지(404/409/500 등)는 라우팅하지 않고 컴포넌트로 전달
    return Promise.reject(error);
  }
);

export default api;
