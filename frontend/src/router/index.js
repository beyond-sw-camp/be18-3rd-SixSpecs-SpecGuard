import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'

// 기업 로그인/회원가입
import CompanyLogin from '../views/company/CompanyLogin.vue'
import CompanySignupChoice from'../views/company/CompanySignupChoice.vue'
import CompanySignupInfo from '../views/company/CompanySignupInfo.vue'
import CompanySignupCondition from '../views/company/CompanySignupCondition.vue'

// 기업 쉘
import CompanyShell from '../views/company/CompanyShell.vue'
import CompanyDashboard from '../views/company/CompanyDashboard.vue'
import CompanyCreatePostBasic from '../views/company/CompanyCreatePostBasic.vue'
import CompanyCreatePostDetail from '../views/company/CompanyCreatePostDetail.vue'
import CompanySetEvaluationWeight from '../views/company/CompanySetEvaluationWeight.vue'
import CompanyEvaluationWeightList from '../views/company/CompanyEvaluationWeightList.vue'
import CompanyTemplateDetail from '../views/company/CompanyTemplateDetail.vue'
import CompanyApplicantDetail from '../views/company/CompanyApplicantDetail.vue'
import CompanyModifyPostBasic from '../views/company/CompanyModifyPostBasic.vue'

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
  { path: '/company/login', name: 'CompanyLogin', component: CompanyLogin },
  { path: '/company/signup/choice', name: 'CompanySignupChoice', component: CompanySignupChoice },
  { path: '/company/signup/info', name: 'CompanySignupInfo', component: CompanySignupInfo },
  { path: '/company/signup/condition', name: 'CompanySignupCondition', component: CompanySignupCondition},

  // 지원자 회원가입
  { path: '/applicant/login', name: 'ApplicantLogin', component: ApplicantLogin },
  { path: '/applicant/signup', name: 'ApplicantSignup', component: ApplicantSignup },
  { path: '/applicant/verify', name: 'ApplicantVerify', component: ApplicantVerify},

  // 기업 쉘
  { path: '/c/:companySlug',
    component: CompanyShell,
    props: true,
    children: [
      { path: '', redirect: {name: 'CompanyDashboard'}},
      { path: 'dashboard', name: 'CompanyDashboard', component: CompanyDashboard, props: true },
      { path: 'create/post/basic', name: 'CompanyCreatePostBasic', component: CompanyCreatePostBasic, props: true },
      { path: 'create/post/detail/:templateId', name: 'CompanyCreatePostDetail', component: CompanyCreatePostDetail, props: true },
      { path: 'evaluation/list', name: 'CompanyEvaluationWeightList', component: CompanyEvaluationWeightList, props: true },
      { path: 'post/:companyTemplateId/weight', name: 'CompanySetEvaluationWeight', component: CompanySetEvaluationWeight, props: true },
      { path: 'post/:companyTemplateId/detail', name:'CompanyTemplateDetail', component:CompanyTemplateDetail, props: true },
      { path: 'post/:companyTemplateId/applicant/:resumeId', name: 'CompanyApplicantDetail', component:CompanyApplicantDetail, props: true },
      { path: 'modify/post/:companyTemplateId/edit/basic', name: 'CompanyModifyPostBasic', component: CompanyModifyPostBasic, props: true }
    ],
  },

  // 지원자 쉘
  { path: '/r/:applicantSlug',
    component: ApplicantShell,
    props: true,
    children: [
      { path: '', redirect: {name: 'ResumeBasicInfo'}},
      { path: 'basic-info', name: 'ResumeBasicInfo', component: ResumeBasicInfo, props: true },
      { path: 'academic-info', name: 'ResumeAcademicInfo', component: ResumeAcademicInfo, props: true },
      { path: 'certificate-info', name: 'ResumeCertificateInfo', component: ResumeCertificateInfo, props: true },
      { path: 'essay', name: 'ResumeEssay', component: ResumeEssay, props: true },
      { path: 'submit', name: 'ResumeSubmit', component: ResumeSubmit, props: true }
    ]
  },
  // 임시
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: MainPage }
]

const router = createRouter({ history: createWebHistory(), routes })

export default router