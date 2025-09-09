import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'

import CompanyLogin from '../views/company/CompanyLogin.vue'
import CompanySignupChoice from'../views/company/CompanySignupChoice.vue'
import CompanySignupInfo from '../views/company/CompanySignupInfo.vue'
import CompanySignupCondition from '@/views/company/CompanySignupCondition.vue'

import ApplicantLogin from '../views/applicant/ApplicantLogin.vue'
import ApplicantSignup from '../views/applicant/ApplicantSignup.vue'
import ApplicantVerify from '../views/applicant/ApplicantVerify.vue'

import ResumeBasicInfo from '../views/resume/ResumeBasicInfo.vue'
import ResumeAcademicInfo from '../views/resume/ResumeAcademicInfo.vue'
import ResumeCertificateInfo from '../views/resume/ResumeCertificateInfo.vue'
import ResumeEssay from '../views/resume/ResumeEssay.vue'
import ResumeSubmit from '../views/resume/ResumeSubmit.vue'



const routes = [
  { path: '/', component: MainPage },
  { path: '/company/login', name: CompanyLogin, component: CompanyLogin },
  { path: '/company/signup/choice', name: CompanySignupChoice, component: CompanySignupChoice },
  { path: '/company/signup/info', name: CompanySignupInfo, component: CompanySignupInfo },
  { path: '/company/signup/condition', name: CompanySignupCondition, component: CompanySignupCondition},

  { path: '/applicant/login', name: ApplicantLogin, component: ApplicantLogin },
  { path: '/applicant/signup', name: ApplicantSignup, component: ApplicantSignup },
  { path: '/applicant/verify', name: ApplicantVerify, component: ApplicantVerify},

  { path: '/resume/basic-info', name: ResumeBasicInfo, component: ResumeBasicInfo},
  { path: '/resume/academic-info', name: ResumeAcademicInfo, component: ResumeAcademicInfo},
  { path: '/resume/certificate-info', name: ResumeCertificateInfo, component: ResumeCertificateInfo},
  { path: '/resume/essay', name: ResumeEssay, component: ResumeEssay},
  { path: '/resume/submit', name: ResumeSubmit, component: ResumeSubmit}
]



export default createRouter({
  history: createWebHistory(),
  routes,
})