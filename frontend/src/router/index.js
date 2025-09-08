import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'

import CompanyLogin from '../views/company/CompanyLogin.vue'
import CompanySignupChoice from'../views/company/CompanySignupChoice.vue'
import CompanySignupInfo from '../views/company/CompanySignupInfo.vue'
import CompanySignupCondition from '@/views/company/CompanySignupCondition.vue'

import ApplicantLogin from '../views/applicant/ApplicantLogin.vue'
import ApplicantSignup from '../views/applicant/ApplicantSignup.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/company/login', name: CompanyLogin, component: CompanyLogin },
  { path: '/company/signup/choice', name: CompanySignupChoice, component: CompanySignupChoice },
  { path: '/company/signup/info', name: CompanySignupInfo, component: CompanySignupInfo },
  { path: '/company/signup/condition', name: CompanySignupCondition, component: CompanySignupCondition},

  { path: '/applicant/login', name: ApplicantLogin, component: ApplicantLogin },
  { path: '/applicant/signup', name: ApplicantSignup, component: ApplicantSignup },
]



export default createRouter({
  history: createWebHistory(),
  routes,
})