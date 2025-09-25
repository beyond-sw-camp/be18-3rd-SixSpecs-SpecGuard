<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <header class="bg-slate-800 text-white">
        <div class="mx-auto max-w-6xl h-16 px-6 flex items-center justify-between">
            <div class="flex items-end gap-3">
        
    <!--<RouterLink 
    :to="`/c/${companySlug}/dashboard`" 
    class="text-2xl font-extrabold tracking-tight hover:text-amber-400 transition-colors"
    >
    SPECGUARD
    </RouterLink>
    -->
    <!--로그인 안된 상태에서, SPECGUARD 클릭하면 메인 홈으로 감-->
    <RouterLink 
    to="/" 
    class="text-2xl font-extrabold tracking-tight hover:text-amber-400 transition-colors"
    >
    SPECGUARD
    </RouterLink>

            <span class="text-[11px] leading-none text-slate-300 mb-1">이력 검증 시스템</span>
            </div>
        </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-12">
        <div class="grid grid-cols-12 gap-10 items-start">
            <section class="col-span-12 md:col-span-6">
            <h1 class="text-3xl font-extrabold tracking-tight">SPECGUARD <span class="sr-only">기업회원 로그인</span></h1>

            <form class="mt-6 rounded-3xl bg-amber-400/90 p-8 shadow-sm ring-1 ring-black/5" @submit.prevent="doLogin">
                <label class="block text-sm font-semibold text-slate-900">아이디</label>
                <input v-model.trim="email" type="email" placeholder="아이디를 입력해주세요."
                    class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none" required />

                <label class="mt-5 block text-sm font-semibold text-slate-900">비밀번호</label>
                <input v-model="password" type="password" placeholder="비밀번호를 입력해주세요."
                    class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none" required />

                <button :disabled="submitting"
                        class="mt-6 w-full rounded-md bg-slate-800 py-2 text-white font-semibold hover:bg-slate-700 disabled:opacity-60">
                {{ submitting ? '로그인 중…' : '기업 회원 로그인' }}
                </button>

                <p v-if="errorMsg" class="mt-3 text-sm text-rose-700">{{ errorMsg }}</p>

                <p class="mt-6 text-center text-sm">SNS 계정으로 간편하게 시작하기</p>
                <div class="mt-3 grid grid-cols-2 gap-3">
                <button @click="goGoogle" type="button" class="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium ring-1 ring-slate-200 shadow-sm">
                    <img alt="Google" class="h-4 w-4" src="https://www.svgrepo.com/show/475656/google-color.svg" />
                    Continue with Google
                </button>
                <button @click="goNaver" type="button" class="inline-flex items-center justify-center gap-2 rounded-md bg-[#03C75A] px-3 py-2 text-sm font-medium text-white shadow-sm">
                    <!--네이버 이모지 삽입-->
                    <img alt="Naver" class="h-4 w-4" src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA4MTBfMjkg%2FMDAxNTAyMzQ1NjgxMTcx.HN5OduMJB4wLP2Ryov53lcBW-UhIkXLXZdd_SRReFAgg.mL_h394FDyN7gsATSeFOYSoDYWMPnuLPSfcLkquAIdMg.PNG.baroniter%2Fnaver_pay_img_04.png&type=sc960_832" />
                    Continue with Naver
                </button>
                </div>

                <div class="mt-6 grid grid-cols-3 text-center text-sm text-slate-800/90">
                <a href="#" class="hover:underline">아이디 찾기</a>
                <a href="#" class="hover:underline">비밀번호 찾기</a>
                <RouterLink to="/company/signup/choice" class="hover:underline">회원 가입</RouterLink>
                </div>
            </form>
            </section>

            <div class="col-span-12 md:col-span-1 hidden md:flex justify-center">
            <div class="h-full w-px bg-slate-300"></div>
            </div>

            <aside class="col-span-12 md:col-span-5">
            <h2 class="text-3xl font-extrabold tracking-tight">
                <span class="text-amber-500">SPECGUARD</span>기업회원 서비스
            </h2>
            <!-- 설명 섹션 그대로 유지 -->
            <ul class="mt-8 space-y-8">
            <li class="flex items-start gap-4">
                <svg class="w-9 h-9 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h10M4 17h7" />
                </svg>
                <div>
                <h3 class="font-extrabold text-lg">채용 워크플로우 자동화</h3>
                <p class="text-slate-600 text-sm mt-1">복잡한 프로세스 관리를 편리하게 해보세요</p>
                </div>
            </li>
            <li class="flex items-start gap-4">
                <!--<svg class="w-9 h-9 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h12" />
                </svg>
            -->
                <!--'AI' 글자로 보이게 만들기-->
                <span class="w-9 h-9 flex items-center justify-center text-slate-600 font-bold text-lg">
                    AI
                </span>

                <div>
                <h3 class="font-extrabold text-lg">AI 요약 및 정합성 분석</h3>
                <p class="text-slate-600 text-sm mt-1">이력서, 자소서 서류 검사를 자동화해드립니다</p>
                </div>
            </li>
            <li class="flex items-start gap-4">
                <!--<svg class="w-9 h-9 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-3-3h-2m-4 5H6a2 2 0 01-2-2V7a2 2 0 012-2h8a2 2 0 012 2v11a2 2 0 01-2 2z" />
                </svg>-->

                <!--사람 이모지로 변경-->
                <svg class="w-9 h-9 text-slate-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
                </svg>


                <div>
                <h3 class="font-extrabold text-lg">지원자 통합 관리</h3>
                <p class="text-slate-600 text-sm mt-1">모든 지원자를 효율적으로 관리해보세요</p>
                </div>
            </li>
            <li class="flex items-start gap-4">

    <!--기업 로그인 화면에서 메일 아이콘 깨진 거, 수정-->
    <svg xmlns="http://www.w3.org/2000/svg" 
     fill="none" 
     viewBox="0 0 24 24" 
     stroke-width="1.5" 
     stroke="currentColor" 
     class="w-9 h-9 text-slate-600">
  <path stroke-linecap="round" 
        stroke-linejoin="round" 
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91A2.25 2.25 0 012.25 7V6.75" />
    </svg>


                <div>
                <h3 class="font-extrabold text-lg">지원자 연락</h3>
                <p class="text-slate-600 text-sm mt-1">지원자의 합/불 여부를 메일로 발송해드립니다</p>
                </div>
            </li>
            </ul>
            </aside>
        </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()


const companySlug = computed(() => auth.companySlug)

const notice = computed(() =>
  route.query.msg === 'oauth_signup_ok' ? 'SNS 가입이 완료되었습니다. 로그인해 주세요.' : ''
)

const email = ref('')
const password = ref('')
const submitting = ref(false)
const errorMsg = ref('')


onMounted(() => {
  if (auth.isLoggedIn && companySlug.value) {
    router.replace({ name: 'CompanyDashboard', params: { companySlug: companySlug.value } })
  }
})

const goNaver = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/naver";
};

const goGoogle = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};


async function doLogin() {
    errorMsg.value = ''
    submitting.value = true
    try {
        await auth.login(email.value, password.value)            // 스토어 사용
        router.push({ name: 'CompanyDashboard', params: { companySlug: auth.companySlug } })
    } catch (e) {
        errorMsg.value = e?.response?.data?.message || e?.message || '로그인 실패'
    } finally {
        submitting.value = false
    }
}
</script>
