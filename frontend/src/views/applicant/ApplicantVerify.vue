<!-- EmailVerifyPopup.vue -->
<template>
    <div class="fixed inset-0 bg-black/60">
        <div class="w-full h-full bg-white">
        <!-- Header -->
        <div class="flex items-center justify-between px-8 py-4 border-b">
            <h1 class="text-2xl sm:text-3xl font-extrabold">이메일 인증</h1>
        </div>

        <!-- Body -->
        <div class="px-8 py-8">
            <!-- Row: email + request -->
            <div class="grid grid-cols-12 gap-4 items-center">
            <div class="col-span-9">
                <input
                v-model.trim="email"
                type="email"
                placeholder="이메일을 입력하세요"
                class="w-full h-14 rounded-md border border-slate-300 px-5 text-lg outline-none"
                />
            </div>
            <div class="col-span-3 flex justify-end">
                <button
                class="h-14 w-full sm:w-auto px-6 rounded-xl border-2 border-sky-400 text-sky-600 font-semibold bg-white disabled:opacity-50"
                type="button"
                :disabled="ui.sending || !isEmail(email) || status==='VERIFIED'"
                @click="requestCode">
                >
                {{ ui.sending ? '요청 중' : '인증번호요청' }}
                </button>
            </div>

            <!-- Row: code + confirm -->
            <div class="col-span-9">
                <input
                v-model.trim="code"
                type="text" inputmode="numeric" pattern="\d*" maxlength="6"
                placeholder="인증번호를 입력하세요"
                class="w-full h-14 rounded-md border border-slate-300 px-5 text-lg outline-none"
                />
            </div>
            <div class="col-span-3 flex justify-end">
                <button
                class="h-14 w-full sm:w-auto px-6 rounded-xl border-2 border-emerald-400 text-emerald-600 font-semibold bg-white disabled:opacity-50"
                type="button"
                :disabled="ui.confirming || status!=='SENT' || !/^\d{6}$/.test(code)"
                @click="confirmCode">
                >
                {{ ui.confirming ? '확인 중' : '인증하기' }}
                </button>
            </div>
            </div>

            <!-- Row: timer + text -->
            <div class="mt-8 grid grid-cols-12 gap-6 items-center" v-if="t > 0">
            <div class="col-span-3 flex items-center gap-4">
                <svg viewBox="0 0 100 100" class="w-28 h-28">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="3"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#fbbf24" stroke-width="4"
                        :style="ringStyle" transform="rotate(-90 50 50)"/>
                <line x1="50" y1="50" x2="50" y2="20" stroke="#111827" stroke-width="2" :transform="handTransform"/>
                </svg>
            </div>
            <div class="col-span-9">
                <p class="font-semibold">인증 만료까지 남은시간</p>
                <p class="text-lg mt-1">{{ leftText }}</p>
                <p class="mt-4 text-slate-700">메일로 받은 인증번호를 입력해 주세요.</p>
            </div>
            </div>

            <!-- CTA -->
            <div class="mt-10">
            <button
                class="w-full h-16 rounded-xl text-white text-2xl font-extrabold"
                :class="status==='VERIFIED' ? 'bg-emerald-600' : 'bg-[#4F8EF7]'"
                type="button" @click="handleCtaClick">
                {{ status==='VERIFIED' ? '인증완료' : '인증 대기중' }}
            </button>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, reactive, watch } from 'vue'

const API = `${(import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/,'')}/api/v1`
const STORAGE_KEY = 'specguard.applicant.email.verified'
const VERIFY_TTL = 300

const emit = defineEmits(['close', 'verified'])

const status = ref('IDLE') // IDLE | SENT | VERIFIED
const email = ref('')
const code  = ref('')
const ui = reactive({ sending:false, confirming:false })

const total = VERIFY_TTL
const t = ref(0)
let id = null

function tick(){ if (t.value > 0) t.value -= 1; else clearTimer() }
function startTimer(){ clearTimer(); t.value = total; id = setInterval(tick, 1000) }
function clearTimer(){ if (id){ clearInterval(id); id = null } }

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v ?? '')

const C = 2 * Math.PI * 45
const ratio = computed(() => (t.value <= 0 ? 1 : 1 - t.value / total))
const ringStyle = computed(() => ({ strokeDasharray: `${C}`, strokeDashoffset: `${C * ratio.value}` }))
const handTransform = computed(() => `rotate(${360 * ratio.value - 90} 50 50)`)
const leftText = computed(() => {
const mm = String(Math.floor(t.value / 60)).padStart(2,'0')
const ss = String(t.value % 60).padStart(2,'0')
const Tm = String(Math.floor(total/60)).padStart(2,'0')
const Ts = String(total%60).padStart(2,'0')
return `${mm}:${ss} / ${Tm}:${Ts}`
})

async function requestCode() {
    if (!isEmail(email.value)) { alert('이메일 형식이 올바르지 않습니다.'); return }
    ui.sending = true
    console.log("requestCode email:", email.value)
    console.log("API:", API)
    
    try {
        const r = await fetch(`${API}/verify/applicant/request`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ email: email.value }) // 회원가입 단계: resumeId 없음
        })
        if (!r.ok) throw new Error('request-failed')
        status.value = 'SENT'
        startTimer()
        alert('인증번호를 이메일로 발송했습니다.')
    } catch (e) {
        status.value = 'IDLE'
        console.error(e); alert('인증번호 발송 실패')
    } finally {
        ui.sending = false
    }
}

async function confirmCode() {
    if (status.value!=='SENT') return
    if (!/^\d{6}$/.test(code.value)) { alert('6자리 인증번호를 입력하세요.'); return }
    ui.confirming = true
    try {
        const r = await fetch(`${API}/verify/applicant/confirm`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ email: email.value, code: code.value })
        })
        if (!r.ok) throw new Error('confirm-failed')
        status.value = 'VERIFIED'
        clearTimer()
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ email: email.value, verified: true, ts: Date.now() }))
        emit('verified', { email: email.value, verified: true })
        alert('인증 완료')
    } catch (e) {
        status.value = 'SENT'
        console.error(e); alert('인증 실패. 코드와 이메일을 확인하세요.')
    } finally {
        ui.confirming = false
    }
}

// 이메일 변경 시 리셋
watch(email, () => {
    status.value = 'IDLE'
    code.value = ''
    clearTimer()
    t.value = 0
    sessionStorage.removeItem(STORAGE_KEY)
})

function onEsc(e){ if (e.key === 'Escape') close() }
function close(){ emit('close') }

function handleCtaClick() {
  if (status.value === 'VERIFIED') {
    console.log("handleCtaClick.")
    window.parent.postMessage({ type: 'EMAIL_VERIFIED' }, '*')
  }
}

onMounted(() => {
    try {
        const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
        if (saved?.verified && saved.email && (Date.now() - (saved.ts||0)) < VERIFY_TTL*1000) {
        email.value = saved.email
        status.value = 'VERIFIED'
        t.value = 0
        } else {
        sessionStorage.removeItem(STORAGE_KEY)
        }
    } catch { sessionStorage.removeItem(STORAGE_KEY) }
    window.addEventListener('keydown', onEsc)
})

onBeforeUnmount(() => { clearTimer(); window.removeEventListener('keydown', onEsc) })
</script>
