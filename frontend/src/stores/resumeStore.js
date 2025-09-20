import { reactive } from 'vue'

export const resumeStore = reactive({
  template: null,
  resume: null // 서버에서 내려오는 이력서 데이터를 여기에 저장
})