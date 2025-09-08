import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import CompanyLogin from '../views/company/CompanyLogin.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/company/login', name: CompanyLogin, component: CompanyLogin },
]



export default createRouter({
  history: createWebHistory(),
  routes,
})