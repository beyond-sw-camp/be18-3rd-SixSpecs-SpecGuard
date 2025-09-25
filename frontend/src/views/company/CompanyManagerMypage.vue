<template>
    <main class="mx-auto max-w-6xl px-6 py-12">
        <form @submit.prevent="nextStep">
        <section class="rounded-[28px] bg-amber-400/90 p-10 shadow-sm ring-1 ring-black/5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

            <!-- 계정 정보 -->
            <div>
                <h2 class="text-2xl font-extrabold tracking-tight">계정 정보</h2>

                <label class="mt-6 block text-sm font-semibold">이름 *</label>
                <input v-model.trim="form.username" required
                class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <p v-if="errors.username" class="mt-1 text-xs text-red-600">{{ errors.username }}</p>


                <label class="mt-5 block text-sm font-semibold">전화번호 *</label>
                <input v-model.trim="form.phone" inputmode="tel"
                class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <p v-if="errors.phone" class="mt-1 text-xs text-red-600">{{ errors.phone }}</p>

                <label class="mt-5 block text-sm font-semibold">이메일 *</label>
                <div class="mt-2 flex gap-3">
                    <input v-model.trim="form.email" type="email" required 
                        :readonly="true"
                        class="flex-1 rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                    <button type="button" @click="verifyEmail" :disabled="ui.sending"
                            class="shrink-0 rounded-md bg-slate-800 px-4 py-2 text-white font-semibold hover:bg-slate-700 disabled:bg-slate-400">
                        {{ ui.sending ? '요청 중' : '인증 번호 요청' }}
                    </button>
                </div>
                <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
                
                <label class="mt-5 block text-sm font-semibold">인증번호</label>
                <div class="mt-2 flex gap-3">
                    <input v-model.trim="form.code"
                            type="text" inputmode="numeric" pattern="\d*" maxlength="6" required
                            autocomplete="one-time-code"
                            class="w-28 rounded-md border border-slate-300 bg-slate-100 px-2 py-2 outline-none"/>
                    <button type="button" @click="confirmCode" :disabled="ui.confirming"
                            class="shrink-0 rounded-md bg-slate-800 px-4 py-2 text-white font-semibold hover:bg-slate-700 disabled:bg-slate-400">
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

            <!-- next -->
            <!-- 버튼 영역 -->
                <div class="md:col-span-2 flex items-center justify-between">
                <button type="button"
                        :disabled="!emailVerified"
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
                            :disabled="!emailVerified"
                            class="rounded-md px-6 py-2 font-semibold text-white disabled:cursor-not-allowed
                                disabled:bg-slate-400 bg-slate-800 hover:bg-slate-700">
                    수정하기
                    </button>
                </div>
                </div>
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
    username:'', password:'', phone:'', email:'', code:''
})
const ui = reactive({ sending:false, confirming:false })
const errors = reactive({})

const emailVerified = ref(false)

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isPhone = v => /^[0-9\-+()\s]{7,20}$/.test(v)

form.email = form.email.trim().toLowerCase()
form.code  = (form.code ?? '').trim().replace(/\D/g,'')

const isValid = computed(() => !!form.username && isPhone(form.phone) && isEmail(form.email))
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
        try {
            const wasTrue = emailVerified.value
            const ok = await loadEmailStatus()
            if (!ok && wasTrue) emailVerified.value = true
        } catch {}
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
errors.phone = isPhone(form.phone) ? '' : '전화번호 형식이 올바르지 않습니다.'
errors.email = isEmail(form.email) ? '' : '이메일 형식이 올바르지 않습니다.'
// 하나라도 메시지가 있으면 false
return Object.values(errors).every(v => !v)
}

async function loadMe() {
  if (!companySlug.value) return
  try {
    const { data } = await api.get(`/company/${companySlug.value}/users/me`)
    // 계정
    form.username = data?.user?.name ?? ''
    form.email    = data?.user?.email ?? ''
    form.phone    = data?.user?.phone ?? ''
  } catch (e) {
    console.debug('me 조회 실패', e?.response?.status, e?.message)
  }
}

// function sanitize(v) { return typeof v === 'string' ? v.trim() : v }

async function nextStep() {
    if (emailVerified.value === false) { errors.email = '이메일 인증이 필요합니다.'; return }
    if (!validateAll()) return
    const payload = {
        name: String(form.username || '').trim(),
        phone: String(form.phone || '').trim(),
    }
    try {
        const { data } = await api.patch('/me', payload)
        form.username = data?.name ?? form.username
        form.phone    = data?.phone ?? form.phone
        alert('회원정보가 수정되었습니다.')
    } catch (e) {
        console.error('ME PATCH 실패', e?.response?.status, e?.response?.data || e?.message)
        alert(e?.response?.data?.message || '수정에 실패했습니다.')
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
    if (!confirm('계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return

    try {
        await api.delete(`/me`)
        alert('계정이 성공적으로 삭제되었습니다.')
        try { auth.logout?.() } catch {}
        router.push({ name: 'CompanyLogin' })
    } catch (e) {
        const status = e?.response?.status
        const msg = e?.response?.data?.message || '삭제 실패'
        if (status === 403) alert('권한이 없습니다. OWNER만 삭제할 수 있습니다.')
        else alert(msg)
    }
}

// async function loadEmailStatus() {
//     if (!isEmail(form.email)) { emailVerified.value = false; return }
//         try {
//             const r = await fetch(`${API}/verify/company/status?email=${encodeURIComponent(form.email)}`)
//             const json = r.ok ? await r.json() : {}
//             const v = json?.verified
//             const ok = r.ok && (v === true || v === 'true' || v === 1 || v === '1')
//             emailVerified.value = ok
//             return ok
//         } catch {
//             emailVerified.value = false
//             return false
//         }
// }

// watch(() => form.email, (nv, ov) => {
//   if (nv !== ov) { emailVerified.value = false; form.code = '' }
// // })

// onMounted(async () => {
// if (token) {
//     try {
//     const { data } = await api.get(`/auth/signup/invite/check?token=${token}`)
//     if (data?.email) {
//         form.email = String(data.email).trim().toLowerCase()
//         prefilled.email = true
//         await loadEmailStatus()
//     }
//     } catch (e) { console.error('invite check 실패', e) }
// }
// await loadMe()
// })
// // me 조회






function onCancel() {
    router.back()
}
console.log('API=', API)
</script>
