<template>
    <main class="mx-auto max-w-6xl px-6 py-12">
        <form @submit.prevent="nextStep">
        <section class="rounded-[28px] bg-amber-400/90 p-8 md:p-10 shadow-sm ring-1 ring-black/5">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

            <!-- 좌측(2칸): 폼 -->
            <div class="md:col-span-2">
                <div class="space-y-6">
                <!-- 계정 정보 -->
                <h2 class="text-2xl font-extrabold tracking-tight">계정 정보</h2>

                <div class="space-y-2">
                <label class="block text-sm font-semibold">이름 *</label>
                <input class="w-full max-w-md rounded-md border bg-slate-100 px-4 py-2 outline-none" v-model.trim="form.username" required />
                <p v-if="errors.username" class="text-xs text-red-600">{{ errors.username }}</p>
                </div>

                <div class="space-y-2">
                <label class="block text-sm font-semibold">전화번호 *</label>
                <input class="w-full max-w-md rounded-md border bg-slate-100 px-4 py-2 outline-none"
                        v-model.trim="form.phone" inputmode="tel" required :readonly="true" />
                        <p v-if="errors.phone" class="mt-1 text-xs text-red-600">{{ errors.phone }}</p>
                </div>

                <div class="space-y-2">
                <label class="mt-5 block text-sm font-semibold">이메일 *</label>
                <div class="mt-2 flex gap-3 max-w-md">
                    <input v-model.trim="form.email" type="email" required :readonly="true"
                        class="flex-1 rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                    <button type="button" @click="verifyEmail" :disabled="ui.sending"
                            class="shrink-0 rounded-md bg-slate-800 px-4 py-2 text-white font-semibold hover:bg-slate-700 disabled:bg-slate-400">
                    {{ ui.sending ? '요청 중' : '인증 번호 요청' }}
                    </button>
                </div>
                </div>
                <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>

                <!-- 인증번호 -->
                <div class="space-y-2">
                <label class="mt-5 block text-sm font-semibold">인증번호</label>
                <div class="mt-2 grid grid-cols-[1fr_auto] items-center gap-3 max-w-md">
                <input
                    v-model.trim="form.code"
                    type="text"
                    inputmode="numeric"
                    pattern="\d*"
                    maxlength="6"
                    autocomplete="one-time-code"
                    class="w-28 rounded-md border border-slate-300 bg-slate-100 px-2 py-2 outline-none"
                />
                <div class="flex gap-2">
                    <button
                    type="button"
                    @click="confirmCode"
                    :disabled="ui.confirming"
                    class="shrink-0 rounded-md bg-slate-800 px-4 py-2 text-white font-semibold hover:bg-slate-700 disabled:bg-slate-400"
                    >
                    {{ ui.confirming ? '확인 중' : '인증 하기' }}
                    </button>
                    <button
                    type="button"
                    @click="openPwdModal"
                    :disabled="!emailVerified"
                    class="shrink-0 rounded-md ring-1 ring-slate-300 bg-white px-4 py-2 font-semibold hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                    비밀번호 변경
                    </button>
                </div>
                </div>
                </div>
                </div>
                <!-- 모달은 루트로 텔레포트 -->
                <teleport to="body">
                <div v-if="showPwdModal" class="fixed inset-0 z-50 flex items-center justify-center">
                    <div class="absolute inset-0 bg-black/40" @click="closePwdModal"></div>
                    <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                    <h3 class="text-lg font-bold">비밀번호 변경</h3>
                    <div class="mt-4 grid gap-3">
                        <input v-model.trim="pwd.old" type="password" placeholder="현재 비밀번호"
                            class="rounded-md border border-slate-300 bg-slate-50 px-4 py-2 outline-none" />
                        <input v-model.trim="pwd.next" type="password" placeholder="새 비밀번호(8~64자, 영문+숫자)"
                            class="rounded-md border border-slate-300 bg-slate-50 px-4 py-2 outline-none" />
                        <p v-if="errors.passwordChange" class="text-xs text-red-600">{{ errors.passwordChange }}</p>
                    </div>
                    <div class="mt-5 flex justify-end gap-2">
                        <button type="button" @click="closePwdModal"
                                class="rounded-md px-4 py-2 font-semibold ring-1 ring-slate-300 bg-white hover:bg-slate-100">취소</button>
                        <button type="button" @click="changePassword" :disabled="ui.changingPwd"
                                class="rounded-md px-4 py-2 font-semibold text-white bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400">
                        {{ ui.changingPwd ? '변경 중' : '변경하기' }}
                        </button>
                    </div>
                    </div>
                </div>
                </teleport>

                <!-- 기업/담당자 정보 -->
                <div>
                    <br>
                <h2 class="text-2xl font-extrabold tracking-tight">기업 정보</h2>

                <label class="mt-6 block text-sm font-semibold">기업명 *</label>
                <input v-model.trim="form.companyName" required :readonly="true"
                        class="mt-2 w-full max-w-md rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <label class="mt-5 block text-sm font-semibold">사업자 번호(10자리) *</label>
                <input v-model.trim="form.bizRegNo" inputmode="numeric" required :readonly="true"
                        class="mt-2 w-full max-w-md rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <h3 class="mt-6 text-xl font-extrabold">담당자 정보</h3>

                <label class="mt-4 block text-sm font-semibold">담당자 명 *</label>
                <input v-model.trim="form.managerName" required :readonly="true"
                        class="mt-2 w-full max-w-md rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <label class="mt-5 block text-sm font-semibold">대표 연락처 *</label>
                <input v-model.trim="form.managerPhone" inputmode="tel" required
                        class="mt-2 w-full max-w-md rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <label class="mt-5 block text-sm font-semibold">연락 가능한 이메일 *</label>
                <input v-model.trim="form.managerEmail" type="email" required
                        class="mt-2 w-full max-w-md rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                </div>

                <br>
                <!-- 버튼 영역 -->
                <div class="md:col-span-2 flex items-center justify-between">
                <button type="button"
                        :disabled="!canProceed"
                        @click="onDelete"
                        class="rounded-md px-6 py-2 font-semibold text-white bg-red-600 disabled:cursor-not-allowed
                            disabled:bg-slate-400 bg-slate-800 hover:bg-red-500">
                    계정탈퇴
                </button>

                <div class="flex gap-3">
                    <button type="button"
                            @click="onCancel"
                            class="rounded-md px-6 py-2 font-semibold text-slate-800 ring-1 ring-slate-300 bg-white hover:bg-slate-100">
                    취소
                    </button>
                    <button type="submit"
                            :disabled="!canProceed"
                            class="rounded-md px-6 py-2 font-semibold text-white disabled:cursor-not-allowed
                                disabled:bg-slate-400 bg-slate-800 hover:bg-slate-700">
                    수정하기
                    </button>
                </div>
                </div>
            </div>

            <!-- 우측(1칸): 매니저 리스트 -->
            <aside class="md:col-span-1">
                <div class="rounded-2xl bg-white/80 ring-1 ring-black/5 p-4 md:p-5 sticky top-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-bold">초대한 매니저</h3>
                    <span class="text-sm text-slate-500">{{ employees.length }}명</span>
                </div>

                <ul class="mt-4 space-y-3 max-h-[520px] overflow-auto pr-1">
                    <li v-for="emp in employees" :key="emp.id" class="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <div class="flex items-center justify-between">
                        <span class="font-semibold truncate">{{ emp.name || '이름 없음' }}</span>
                        <span class="text-xs rounded px-2 py-0.5 ring-1 ring-slate-200"
                            :class="emp.role === 'MANAGER' ? 'bg-amber-100' : 'bg-slate-100'">
                        {{ emp.role }}
                        </span>
                    </div>
                    <p class="text-xs text-slate-600 mt-0.5 truncate">{{ emp.email }}</p>
                    <p v-if="emp.phone" class="text-xs text-slate-500 truncate">{{ emp.phone }}</p>
                    </li>

                    <li v-if="employees.length === 0" class="text-sm text-slate-500">
                    초대한 매니저가 없습니다.
                    </li>
                </ul>
                </div>
            </aside>

            </div>
        </section>
        </form>
    </main>
</template>

<script setup>
import { reactive, computed, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/axios'
import { onBeforeRouteUpdate } from 'vue-router'
onBeforeRouteUpdate(() => { emailVerified.value = false; form.code = '' })

const API = `${(import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/,'')}/api/v1`

const auth = useAuthStore()
const companySlug = computed(() => auth.companySlug)

const router = useRouter()
const form = reactive({
    username:'', password:'', phone:'', email:'',
    companyName:'', bizRegNo:'', managerName:'',
    managerPhone:'', managerEmail:'', code:''
})
const ui = reactive({ sending:false, confirming:false })
const errors = reactive({})

const emailVerified = ref(false)
const employees = ref([])

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isPhone = v => /^[0-9\-+()\s]{7,20}$/.test(v)
const isBizNo = v => /^\d{10}$/.test(v)

form.email = form.email.trim().toLowerCase()
form.code  = (form.code ?? '').trim().replace(/\D/g,'')

const isValid = computed(() =>
form.companyName && isBizNo(form.bizRegNo) &&
form.managerName && isPhone(form.managerPhone) && isEmail(form.managerEmail)
)
const canProceed = computed(() => isValid.value && emailVerified.value)

    // 인증번호 요청
    async function verifyEmail() {
        if (!isEmail(form.email)) { errors.email='이메일 형식이 올바르지 않습니다.'; return }
        ui.sending = true
        try {
            const r = await fetch(`${API}/verify/company/request`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email: form.email }) })
            if (!r.ok) throw new Error()
            alert('인증번호를 이메일로 발송했습니다.')
        } catch (e) {
            console.error(e); alert('인증번호 발송 실패')
        } finally { ui.sending=false }
    }

    // 인증번호 검증
    async function confirmCode() {
        if (!/^\d{6,10}$/.test(form.code)) { alert('인증번호를 확인하세요.'); return }
        ui.confirming = true
        try {
            const r = await fetch(`${API}/verify/company/confirm`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email: form.email, code: form.code }) })
            if (!r.ok) throw new Error()
            emailVerified.value = true
            alert('이메일 인증이 완료되었습니다.')
        } catch (e) {
            console.error(e); alert('인증 실패. 코드와 이메일을 확인하세요.')
        } finally { ui.confirming=false }
    }


watch(() => form.email, () => { emailVerified.value = false; form.code=''; })

onMounted(async () => {
    emailVerified.value = false
    form.code = ''
    await loadMe()
})

function validateAll() {
errors.username = form.username ? '' : '이름를 입력하세요.'
errors.password = form.password ? '' : '비밀번호를 입력하세요.'
errors.phone = isPhone(form.phone) ? '' : '전화번호 형식이 올바르지 않습니다.'
errors.email = isEmail(form.email) ? '' : '이메일 형식이 올바르지 않습니다.'
errors.companyName = form.companyName ? '' : '기업명을 입력하세요.'
errors.bizRegNo = isBizNo(form.bizRegNo) ? '' : '사업자번호 10자리를 입력하세요.'
errors.managerName = form.managerName ? '' : '담당자명을 입력하세요.'
errors.managerPhone = isPhone(form.managerPhone) ? '' : '대표 연락처 형식이 올바르지 않습니다.'
errors.managerEmail = isEmail(form.managerEmail) ? '' : '이메일 형식이 올바르지 않습니다.'
// 하나라도 메시지가 있으면 false
return Object.values(errors).every(v => !v)
}

// me 조회로 기본값 세팅 + employees 세팅
async function loadMe() {
  if (!companySlug.value) return
  try {
    const { data } = await api.get(`/company/${companySlug.value}/users/me`)
    // 계정
    form.username = data?.user?.name ?? ''
    form.email    = data?.user?.email ?? ''
    form.phone    = data?.user?.phone ?? ''
    // 회사
    form.companyName  = data?.company?.name ?? ''
    form.bizRegNo     = data?.company?.businessNumber ?? ''
    form.managerName  = data?.company?.managerName ?? ''
    form.managerPhone = data?.company?.contactMobile ?? ''
    form.managerEmail = data?.company?.contactEmail ?? ''
    // 매니저 리스트
    employees.value   = Array.isArray(data?.employees) ? data.employees : []
  } catch (e) {
    console.debug('me 조회 실패', e?.response?.status, e?.message)
  }
}

function sanitize(v) { return typeof v === 'string' ? v.trim() : v }

function onCancel() {
  router.back()
}

async function nextStep() {
  if (!isValid.value || !companySlug.value) return;
const companyPayload = {
name:          sanitize(form.username),
managerName:   sanitize(form.managerName),
contactEmail:  sanitize(form.managerEmail),
contactMobile: sanitize(form.managerPhone),
managerPostion: sanitize(form.managerPosition)
}
// 빈 문자열 제거
Object.keys(companyPayload).forEach(k => {
if (!companyPayload[k]) delete companyPayload[k]
})

try {
// 1) 유저 이름 먼저
const uRes = await api.patch(`/company/${companySlug.value}`, companyPayload)
form.username = uRes.data?.name ?? companyPayload.name ?? form.username
} catch (e) {
console.error('USER PATCH 실패', e?.response?.status, e?.response?.data || e?.message);
alert('사용자 정보 수정 실패');
return;
}

try {
// 2) 회사 정보
const cRes = await api.patch(`/company/${companySlug.value}`, companyPayload)
const body = cRes.data ?? {}
form.companyName  = body.name         ?? companyPayload.name         ?? form.companyName
form.managerName  = body.managerName  ?? companyPayload.managerName  ?? form.managerName
form.managerEmail = body.contactEmail ?? companyPayload.contactEmail ?? form.managerEmail
form.managerPhone = body.contactMobile?? companyPayload.contactMobile?? form.managerPhone
form.managerPosition = body.managerPosition?? companyPayload.managerPosition?? form.managerPosition
alert('수정되었습니다.');
} catch (e) {
console.error('COMPANY PATCH 실패', e?.response?.status, e?.response?.data || e?.message);
alert('회사 정보 수정 실패');
}
}

const showPwdModal = ref(false)
const pwd = reactive({ old: '', next: '' })
ui.changingPwd = false
errors.passwordChange = ''

function openPwdModal() {
  if (!emailVerified.value) {
    alert('이메일 인증을 먼저 완료해주세요.')
    return
  }
  errors.passwordChange = ''
  pwd.old = ''; pwd.next = ''
  showPwdModal.value = true
}
function closePwdModal() {
  showPwdModal.value = false
  pwd.old = ''; pwd.next = ''
}

function validNewPwd(v) {
  return typeof v === 'string'
    && v.length >= 8 && v.length <= 64
    && /[A-Za-z]/.test(v) && /\d/.test(v)
}

async function changePassword() {
  errors.passwordChange = ''
  if (!pwd.old || !pwd.next) { errors.passwordChange = '현재/새 비밀번호를 입력하세요.'; return }
  if (pwd.old === pwd.next) { errors.passwordChange = '새 비밀번호가 현재 비밀번호와 같습니다.'; return }
  if (!validNewPwd(pwd.next)) { errors.passwordChange = '8~64자, 영문+숫자 포함'; return }

  ui.changingPwd = true
  try {
    await api.patch('/me/password', { oldPassword: pwd.old, newPassword: pwd.next })
    alert('비밀번호가 변경되었습니다.')
    closePwdModal()
  } catch (e) {
    const msg = e?.response?.data?.message || '변경 실패. 현재 비밀번호를 확인하세요.'
    errors.passwordChange = msg
  } finally {
    ui.changingPwd = false
  }
}

async function onDelete() {
    if (!emailVerified.value) { alert('이메일 인증을 먼저 완료해주세요.'); return }
    if (!companySlug.value)   { alert('회사 식별자가 없습니다.'); return }
    if (!confirm('회사를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return

    try {
        await api.delete(`/company/${companySlug.value}`)
        alert('회사가 성공적으로 삭제되었습니다.')
        try { auth.logout?.() } catch {}
        router.push({ name: 'CompanyLogin' })
    } catch (e) {
        const status = e?.response?.status
        const msg = e?.response?.data?.message || '삭제 실패'
        if (status === 403) alert('권한이 없습니다. OWNER만 삭제할 수 있습니다.')
        else alert(msg)
    }
}

console.log('API=', API)
</script>
