import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'

// 기업 로그인/회원가입
import CompanyLogin from '../views/company/CompanyLogin.vue'
import CompanySignupChoice from'../views/company/CompanySignupChoice.vue'
import CompanySignupInfo from '../views/company/CompanySignupInfo.vue'
import CompanySignupCondition from '../views/company/CompanySignupCondition.vue'

// 기업 초대
import CompanyInviteChoice from '../views/company/CompanyInviteChoice.vue'
import CompanyInviteSignup from '../views/company/CompanyInviteSignup.vue'
import CompanyInviteSignupCondition from '../views/company/CompanyInviteSignupCondition.vue'

// 기업 쉘
import CompanyShell from '../views/company/CompanyShell.vue'
import CompanyDashboard from '../views/company/CompanyDashboard.vue'
import CompanyCreatePostBasic from '../views/company/CompanyCreatePostBasic.vue'
import CompanyCreatePostDetail from '../views/company/CompanyCreatePostDetail.vue'
import CompanySetEvaluationWeight from '../views/company/CompanySetEvaluationWeight.vue'
import CompanyEvaluationWeightList from '../views/company/CompanyEvaluationWeightList.vue'
import CompanyEvaluationWeightUpdate from '@/views/company/CompanyEvaluationWeightUpdate.vue'
import CompanyTemplateDetail from '../views/company/CompanyTemplateDetail.vue'
import CompanyApplicantDetail from '../views/company/CompanyApplicantDetail.vue'
import CompanyModifyPostBasic from '../views/company/CompanyModifyPostBasic.vue'
import CompanyModifyPostDetail from '../views/company/CompanyModifyPostDetail.vue'
import CompanyInvite from '../views/company/CompanyInvite.vue'
import CompanyOwnerMypage from '../views/company/CompanyOwnerMypage.vue'
import CompanyManagerMypage from '../views/company/CompanyManagerMypage.vue'

// oauth2
import Oauth2Redirect from "../views/company/Oauth2Redirect.vue";
import Oauth2Failure from "../views/company/Oauth2Failure.vue";

// 지원자 로그인/회원가입
import ApplicantShell from '../views/applicant/ApplicantShell.vue'
import ApplicantLogin from '../views/applicant/ApplicantLogin.vue'
import ApplicantSignup from '../views/applicant/ApplicantSignup.vue'
import ApplicantVerify from '../views/applicant/ApplicantVerify.vue'

// 지원자 쉘
import ResumeShell from '@/views/resume/ResumeShell.vue'
import ResumeBasicInfo from '../views/resume/ResumeBasicInfo.vue'
import ResumeAcademicInfo from '../views/resume/ResumeAcademicInfo.vue'
import ResumeCertificateInfo from '../views/resume/ResumeCertificateInfo.vue'
import ResumeEssay from '../views/resume/ResumeEssay.vue'
import ResumeSubmit from '../views/resume/ResumeSubmit.vue'



const isUuid = (v) =>
  typeof v === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)



const routes = [
  { path: '/', component: MainPage },

  // 기업 회원가입
  { path: '/company/login', name: 'CompanyLogin', component: CompanyLogin },
  { path: '/company/signup/choice', name: 'CompanySignupChoice', component: CompanySignupChoice },
  { path: '/company/signup/info', name: 'CompanySignupInfo', component: CompanySignupInfo },
  { path: '/company/signup/condition', name: 'CompanySignupCondition', component: CompanySignupCondition},

  // 기업 초대
  { path: '/signup/invite', name: 'CompanyInviteChoice', component: CompanyInviteChoice, props: route => ({ token: route.query.token })},
  { path: '/signup/invite/info', name: 'CompanyInviteSignup', component: CompanyInviteSignup, props: route => ({ token: route.query.token })},
  { path: '/signup/invite/condition', name: 'CompanyInviteSignupCondition', component: CompanyInviteSignupCondition, props: route => ({ token: route.query.token})},

  // oauth2
  { path: '/oauth2/redirect', name: 'Oauth2Redirect', component: Oauth2Redirect},
  { path: '/oauth2/failure', name: 'Oauth2Failure', component: Oauth2Failure},
  
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
      { path: 'evaluation/update', name: 'CompanyEvaluationWeightUpdate', component: CompanyEvaluationWeightUpdate, props: true },
      { path: 'post/:companyTemplateId/weight', name: 'CompanyCreateEvaluationWeight', component: CompanySetEvaluationWeight, props: true},
      { path: 'post/:companyTemplateId/weight/:profileId', name: 'CompanyEditEvaluationWeight', component: CompanySetEvaluationWeight, props: true},
      { path: 'post/:companyTemplateId/detail', name:'CompanyTemplateDetail', component:CompanyTemplateDetail, props: true },
      { path: 'post/:companyTemplateId/applicant/:resumeId', name: 'CompanyApplicantDetail', component:CompanyApplicantDetail, props: true },
      { path: 'modify/post/:companyTemplateId/edit/basic', name: 'CompanyModifyPostBasic', component: CompanyModifyPostBasic, props: true },
      { path: 'modify/post/:companyTemplateId/edit/detail', name: 'CompanyModifyPostDetail', component: CompanyModifyPostDetail, props: true},
      { path: 'invite', name: 'CompanyInvite', component: CompanyInvite, props: true },
      { path: 'mypage', name: 'CompanyOwnerMypage', component: CompanyOwnerMypage, props: true },
      { path: 'mypage/:managerSlug', name: 'CompanyManagerMypage', component: CompanyManagerMypage, props: true }
    ],
  },
  
  // 지원자 회원가입
{ path: '/:companySlug/applicant/login', name: 'ApplicantLogin', component: ApplicantLogin },

// 지원자 쉘
{ path:'/:companySlug/registerResume/:applicantSlug',
  component: ApplicantShell,
  props: true,
  children: [
    { path: '', redirect: to => ({ name: 'ApplicantSignup', params: { 
        companySlug: to.params.companySlug, 
        applicantSlug: to.params.applicantSlug 
    }}) },
    { path: 'signup', name: 'ApplicantSignup', component: ApplicantSignup, props: true },
    { path: 'verify', name: 'ApplicantVerify', component: ApplicantVerify},
    ]
  },

  {
  path:'/:companySlug/registerResume/:applicantSlug',
  component: ResumeShell,
  props: true,
  children: [
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