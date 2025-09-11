import api from "@/api/axios";

export async function sendInvite(companySlug, payload) {
    return api.post(`/company/${companySlug}/invite`, payload); //  인터셉터 적용
}