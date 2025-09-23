// src/api/applicantApi.js
import axios from "axios";
import router from "@/router";

const applicantApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, // 세션 쿠키 자동 포함
});

/** 응답 인터셉터 */
applicantApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const cfg = error.config || {};

    // 네트워크 에러 등
    if (!error.response) return Promise.reject(error);

    const { status, data } = error.response;

    // 세션 만료 또는 로그인 안 된 경우
    if (status === 401) {
        const message = data?.message;
        alert(message);

        const companySlug = router.currentRoute.value.params.companySlug;
        router.push({
        path: `/${companySlug}/applicant/login`,
        query: { error: "SESSION_EXPIRED" },
      });

      return new Promise(() => {}); 
    }

    return Promise.reject(error);
  }
);

export default applicantApi;
