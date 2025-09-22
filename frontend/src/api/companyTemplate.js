import api from './axios'

// 기본 정보로 템플릿 생성
export const createBasicTemplate = (payload) =>
    api.post('/companyTemplates/basic', payload)

// // (다음 단계용) 기간 업데이트
// export const updateTemplateDates = (id, body) =>
//     api.put(`/companyTemplates/${id}`, body)

// // (다음 단계용) 커스텀 필드 추가
// export const addCustomField = (id, body) =>
//     api.post(`/companyTemplates/${id}/customFields`, body)

export const signup = (payload) => api.post("auth/signup/company", payload);