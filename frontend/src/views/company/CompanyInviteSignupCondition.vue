<template>
    <div class="min-h-screen bg-white text-slate-900">
        <!-- Topbar -->
        <header class="bg-slate-800 text-white">
        <div class="mx-auto max-w-6xl h-16 px-6 flex items-center">
            <div class="flex items-end gap-3">
                <span class="text-2xl font-extrabold tracking-tight">SPECGUARD</span>
                <span class="ml-3 text-[11px] leading-none text-slate-300">이력 검증 시스템</span>
            </div>
        </div>
        </header>

        <main class="mx-auto max-w-6xl px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <!-- 약관 동의 -->
            <section class="rounded-[28px] bg-amber-400/90 p-8 shadow-sm ring-2 ring-sky-600">
            <h2 class="text-2xl font-extrabold">약관 동의</h2>

            <label class="mt-6 flex items-center gap-3">
                <input type="checkbox" v-model="all" @change="toggleAll" class="h-4 w-4" />
                <span class="font-medium">전체동의</span>
            </label>

            <div class="mt-6 space-y-5">
                <div class="flex items-center justify-between">
                <label class="flex items-center gap-3">
                    <input type="checkbox" v-model="terms" @change="syncAll" class="h-4 w-4" />
                    <span>기업회원 이용약관에 동의 <span class="text-red-600">(필수)</span></span>
                </label>
                <button class="text-slate-700/70 underline">상세보기</button>
                </div>

                <div class="flex items-center justify-between">
                <label class="flex items-center gap-3">
                    <input type="checkbox" v-model="privacy" @change="syncAll" class="h-4 w-4" />
                    <span>개인정보 수집 및 이용에 동의 <span class="text-red-600">(필수)</span></span>
                </label>
                <button class="text-slate-700/70 underline">상세보기</button>
                </div>

                <label class="flex items-center gap-3">
                <input type="checkbox" v-model="mktEmail" @change="syncAll" class="h-4 w-4" />
                <span>마케팅 정보 수신 동의 - 이메일</span>
                </label>

                <label class="flex items-center gap-3">
                <input type="checkbox" v-model="mktSms" @change="syncAll" class="h-4 w-4" />
                <span>마케팅 정보 수신 동의 - SMS/MMS</span>
                </label>
            </div>

            <div class="mt-8 flex items-center justify-between gap-4">
                <p class="text-xs text-slate-800/80">
                기업정보 입력 후 관리자 승인 완료되면 공고를 등록할 수 있습니다. 승인까지는 최대 3일(영업일 기준) 소요됩니다.
                </p>
                <button
                type="button"
                :disabled="!requiredOk"
                @click="goNext"
                class="rounded-md px-4 py-2 font-semibold text-white transition"
                :class="requiredOk ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-400 cursor-not-allowed'"
                >
                회원 가입
                </button>
            </div>
            </section>

            <!-- 소개/브랜드 -->
            <aside class="pl-0 md:pl-10 md:border-l md:border-slate-300">
            <h3 class="text-2xl font-extrabold tracking-tight">
                <span class="text-amber-500">SPECGUARD</span> 기업회원 서비스
            </h3>

            <h2 class="mt-8 text-4xl md:text-5xl font-extrabold leading-tight">
                당신이 상상한 만큼<br />채용 오퍼레이션이 쉬워집니다.
            </h2>

            <p class="mt-6 text-slate-600">
                채용 프로세스에 필요한 모든 것을 원하는 대로 자동화할 수 있는 채용 관리 솔루션, SpecGuard
            </p>

            <div class="mt-10">
                <p class="text-amber-600 font-semibold">---- SPECGUARD와 함께하고 있는 기업들 ----</p>
                <ul class="mt-6 flex flex-wrap gap-3">
                <li class="rounded-md bg-slate-100 px-3 py-2 text-slate-700 shadow">coupang</li>
                <li class="rounded-md bg-slate-100 px-3 py-2 text-slate-700 shadow">NAVER</li>
                <li class="rounded-md bg-slate-100 px-3 py-2 text-slate-700 shadow">배달의민족</li>
                <li class="rounded-md bg-slate-100 px-3 py-2 text-slate-700 shadow">요기요</li>
                <li class="rounded-md bg-slate-100 px-3 py-2 text-slate-700 shadow">LOTTE</li>
                <li class="rounded-md bg-slate-100 px-3 py-2 text-slate-700 shadow">ShinhanCard</li>
                <li class="rounded-md bg-slate-100 px-3 py-2 text-slate-700 shadow">Daum</li>
                <li class="rounded-md bg-slate-100 px-3 py-2 text-slate-700 shadow">11번가</li>
                </ul>
            </div>
            </aside>
        </div>
        </main>
    </div>
</template>

<script setup>
import { reactive, computed, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/api/axios'

const router = useRouter()
const route = useRoute()
const token = String(route.query.token || '')

const s = reactive({
    all: false,
    terms: false,     // (필수)
    privacy: false,   // (필수)
    mktEmail: false,
    mktSms: false,
})
const { all, terms, privacy, mktEmail, mktSms } = toRefs(s)

// 전체동의 
function toggleAll() {
    s.terms = s.all
    s.privacy = s.all
    s.mktEmail = s.all
    s.mktSms = s.all
}

// 개별 체크 변경 시 전체동의 상태 동기화
function syncAll() {
    s.all = s.terms && s.privacy && s.mktEmail && s.mktSms
}

// (필수) 2개 이상 체크 시 활성화
const requiredOk = computed(() => {
    const checked = [s.terms, s.privacy].filter(Boolean).length
    return checked >= 2
})

const onlyDigits = s => (s||'').replace(/[^\d]/g,'')
    .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'') // 악센트 제거
    .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')

const mapToInvitePayload = (f, s) => ({
  token,                                  // ✅ 초대 토큰 필수
  email: (f.email||'').trim().toLowerCase(),
  password: f.password,
  name: (f.username||'').trim(),
  phone: onlyDigits(f.phone),
  // 선택: 초대 응답에 role을 미리 저장해 둔 경우 함께 전달
  ...(f.role ? { role: f.role } : {}),
  // 선택: 약관 동의 상태 기록
  consents: {
    terms: !!s.terms,
    privacy: !!s.privacy,
    mktEmail: !!s.mktEmail,
    mktSms: !!s.mktSms,
  },
})


async function goNext() {
  if (!requiredOk.value) return
  if (!token) { alert('초대 토큰이 없습니다. 링크를 다시 확인하세요.'); return }

  const raw = sessionStorage.getItem('specguard.signup.form')
  if (!raw) { alert('가입 정보가 없습니다. 처음부터 진행하세요.'); return }
  const form = JSON.parse(raw)

  const payload = mapToInvitePayload(form, s)
  try {
    const { data } = await api.post('/auth/signup/invite', payload)
    sessionStorage.removeItem('specguard.signup.form')

    const slug = data?.companySlug
    if (slug) router.push({ name: 'CompanyDashboard', params: { companySlug: slug } })
    else router.push('/company/login')
  } catch (e) {
    console.log('[SG] invite.signup.error:', e.response?.status, e.response?.data || e.message)
    alert(`회원가입 실패: ${e.response?.data?.message || e.message}`)
  }
}


</script>
