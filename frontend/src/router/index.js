import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'

// 기업 로그인/회원가입
import CompanyLogin from '../views/company/CompanyLogin.vue'
import CompanySignupChoice from'../views/company/CompanySignupChoice.vue'
import CompanySignupInfo from '../views/company/CompanySignupInfo.vue'
import CompanySignupCondition from '@/views/company/CompanySignupCondition.vue'

// 기업 쉘
import CompanyShell from '../views/company/CompanyShell.vue'
import CompanyDashboard from '@/views/company/CompanyDashboard.vue'

// 지원자 로그인/회원가입
import ApplicantLogin from '../views/applicant/ApplicantLogin.vue'
import ApplicantSignup from '../views/applicant/ApplicantSignup.vue'
import ApplicantVerify from '../views/applicant/ApplicantVerify.vue'

// 지원자 쉘
import ApplicantShell from '../views/applicant/ApplicantShell.vue'
import ResumeBasicInfo from '../views/resume/ResumeBasicInfo.vue'
import ResumeAcademicInfo from '../views/resume/ResumeAcademicInfo.vue'
import ResumeCertificateInfo from '../views/resume/ResumeCertificateInfo.vue'
import ResumeEssay from '../views/resume/ResumeEssay.vue'
import ResumeSubmit from '../views/resume/ResumeSubmit.vue'





const routes = [
  { path: '/', component: MainPage },

  // 기업 회원가입
  { path: '/company/login', name: CompanyLogin, component: CompanyLogin },
  { path: '/company/signup/choice', name: CompanySignupChoice, component: CompanySignupChoice },
  { path: '/company/signup/info', name: CompanySignupInfo, component: CompanySignupInfo },
  { path: '/company/signup/condition', name: CompanySignupCondition, component: CompanySignupCondition},

  // 지원자 회원가입
  { path: '/applicant/login', name: ApplicantLogin, component: ApplicantLogin },
  { path: '/applicant/signup', name: ApplicantSignup, component: ApplicantSignup },
  { path: '/applicant/verify', name: ApplicantVerify, component: ApplicantVerify},

  // 지원자 이력서
  // { path: '/resume/basic-info', name: ResumeBasicInfo, component: ResumeBasicInfo},
  // { path: '/resume/academic-info', name: ResumeAcademicInfo, component: ResumeAcademicInfo},
  // { path: '/resume/certificate-info', name: ResumeCertificateInfo, component: ResumeCertificateInfo},
  // { path: '/resume/essay', name: ResumeEssay, component: ResumeEssay},
  // { path: '/resume/submit', name: ResumeSubmit, component: ResumeSubmit},

  // 기업 쉘
  { path: '/c/:companySlug',
    component: CompanyShell,
    props: true,
    children: [
      { path: '', redirect: {name: CompanyDashboard}},
      { path: 'dashboard', name: CompanyDashboard, component: CompanyDashboard, props: true }
    ],
  },

  // 지원자 쉘
  { path: '/r/:applicantSlug',
    component: ApplicantShell,
    props: true,
    children: [
      { path: '', redirect: {name: ResumeBasicInfo}},
      { path: 'basic-info', name: ResumeBasicInfo, component: ResumeBasicInfo, props: true },
      { path: 'academic-info', name: ResumeAcademicInfo, component: ResumeAcademicInfo, props: true },
      { path: 'certificate-info', name: ResumeCertificateInfo, component: ResumeCertificateInfo, props: true },
      { path: 'essay', name: ResumeEssay, component: ResumeEssay, props: true },
      { path: 'submit', name: ResumeSubmit, component: ResumeSubmit, props: true }
    ]
  },
  // 임시
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: MainPage }
]

const router = createRouter({ history: createWebHistory(), routes })

export default router