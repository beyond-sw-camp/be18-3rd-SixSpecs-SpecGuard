import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export async function fetchResume() {
  const res = await axios.get(`${API}/api/v1/resumes`, { withCredentials: true });
  return res.data;
}

export async function saveEduExpLink(payload) {
  return axios.post(`${API}/api/v1/resumes/edu-exp-link`, payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
}

export async function saveTemplateResponse(payload) {
    return axios.post(`${API}/api/v1/resumes/template-responses`, payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
}

export async function saveSubmit() {
    return axios.post(`${API}/api/v1/resumes/submit`, {}, {withCredentials: true});
}
