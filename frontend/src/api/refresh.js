import axios from "axios";

// ✅ refresh 전용 인스턴스 (Authorization 헤더 안 붙음)
const refreshApi = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true, // refresh_token 쿠키 전송
});

export default refreshApi;