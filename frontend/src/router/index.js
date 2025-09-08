import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import CompanyLogin from '../views/company/CompanyLogin.vue'
import CompanySignupChoice from'../views/company/CompanySignupChoice.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/company/login', name: CompanyLogin, component: CompanyLogin },
  { path: '/company/signup/choice', name: CompanySignupChoice, component: CompanySignupChoice },
]



export default createRouter({
  history: createWebHistory(),
  routes,
})