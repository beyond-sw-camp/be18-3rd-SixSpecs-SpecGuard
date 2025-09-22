import { defineStore } from 'pinia'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const useResumeStore = defineStore('resume', {
  state: () => ({
    resume: null,
    template: null,
  }),
  actions: {
    async fetchResumeAndTemplate() {
      try {
        if (!this.resume) {
          const res = await axios.get(`${API}/api/v1/resumes`, { withCredentials: true })
          this.resume = res.data
        }
        if (!this.template) {
          const tplRes = await axios.get(`${API}/api/v1/resumes/templates`, { withCredentials: true })
          this.template = tplRes.data
        }
      } catch (e) {
        console.error('resume 또는 template 로딩 실패:', e)
      }
      return { resume: this.resume, template: this.template }
    },

    canAccess() {
      return this.resume && this.resume.status !== 'PENDING'
    }
  }
})