<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <main class="mx-auto max-w-5xl bg-white shadow-sm mt-10 mb-20 p-8 sm:p-12">
        <!-- Title -->
        <h1 class="text-4xl font-extrabold text-center">지원자 회원가입</h1>
        <div class="mt-6 h-1 bg-black"></div>

        <!-- Consent banner -->
        <div class="mt-6">
            <div class="grid grid-cols-12 items-center gap-4">
            <div class="col-span-5 sm:col-span-3 text-slate-700 font-semibold">개인정보 수집 이용 동의</div>
            <div class="col-span-7 sm:col-span-9 text-slate-700">필수 항목에 동의해 주세요.</div>
            </div>
            <div class="mt-3 h-1 bg-indigo-900"></div>
        </div>

        <!-- Form -->
        <form class="mt-8 space-y-8" @submit.prevent="onSubmit">
            <!-- Name -->
            <div>
            <div class="grid grid-cols-12 items-center gap-4">
                <label for="name" class="col-span-5 sm:col-span-3 text-slate-700 font-semibold">성명</label>
                <div class="col-span-7 sm:col-span-9">
                <input
                    id="name"
                    v-model.trim="form.name"
                    type="text"
                    placeholder="공백 없이 입력하세요"
                    class="w-full rounded-md border border-slate-300 px-4 py-2"
                />
                </div>
            </div>
            <div class="mt-3 h-px bg-slate-200"></div>
            </div>

            <!-- Phone -->
            <div>
            <div class="grid grid-cols-12 items-center gap-4">
                <label class="col-span-5 sm:col-span-3 text-slate-700 font-semibold">휴대전화</label>
                <div class="col-span-7 sm:col-span-9 flex items-center gap-3">
                <input v-model.trim="form.phone1" type="text" class="w-20 rounded-md border border-slate-300 px-3 py-2 text-center" maxlength="3" placeholder="010"/>
                <span>-</span>
                <input v-model.trim="form.phone2" type="text" class="w-24 rounded-md border border-slate-300 px-3 py-2 text-center" maxlength="4" placeholder="1234"/>
                <span>-</span>
                <input v-model.trim="form.phone3" type="text" class="w-24 rounded-md border border-slate-300 px-3 py-2 text-center" maxlength="4" placeholder="5678"/>
                </div>
            </div>
            <p class="mt-2 ml-0 sm:ml-40 text-sm text-slate-500">전형결과와 알림에 사용되오니 반드시 연결가능한 번호로 입력하세요</p>
            <div class="mt-3 h-px bg-slate-200"></div>
            </div>

            <!-- Email -->
            <div>
            <div class="grid grid-cols-12 items-start gap-4">
                <label class="col-span-5 sm:col-span-3 text-slate-700 font-semibold pt-2">이메일</label>
                <div class="col-span-7 sm:col-span-9 w-full space-y-3">
                <input v-model.trim="form.email" type="email" placeholder="이메일을 입력해주세요" class="w-full rounded-md border border-slate-300 px-4 py-2"/>
                <input v-model.trim="form.email2" type="email" placeholder="이메일 확인을 위해 다시 한번 입력해주세요" class="w-full rounded-md border border-slate-300 px-4 py-2"/>
                <p class="text-sm text-slate-500">비밀번호 찾기 및 전형결과 알림에 이용되오니 자주 사용하는 메일 주소를 입력해주세요.</p>
                </div>
            </div>
            <div class="mt-3 h-px bg-slate-200"></div>
            </div>

            <!-- Password -->
            <div>
            <div class="grid grid-cols-12 items-start gap-4">
                <label class="col-span-5 sm:col-span-3 text-slate-700 font-semibold pt-2">비밀번호</label>
                <div class="col-span-7 sm:col-span-9 w-full space-y-3">
                <input v-model.trim="form.password" type="password" placeholder="비밀번호를 입력해주세요" class="w-full rounded-md border border-slate-300 px-4 py-2"/>
                <input v-model.trim="form.password2" type="password" placeholder="비밀번호 확인을 위해 다시 한번 입력해주세요" class="w-full rounded-md border border-slate-300 px-4 py-2"/>
                <p class="text-sm text-slate-500">8~9자 영문 대문자/소문자/특수문자/숫자 중 3종류, 혹은 10자 이상의 영문/숫자/특수문자 중 2종류를 사용하세요</p>
                </div>
            </div>
            <div class="mt-3 h-px bg-slate-200"></div>
            </div>

            <!-- Phone verify -->
            <div>
            <div class="grid grid-cols-12 items-center gap-4">
                <label class="col-span-5 sm:col-span-3 text-slate-700 font-semibold">본인 확인</label>
                <div class="col-span-7 sm:col-span-9">
                <button
                    type="button"
                    class="rounded-md bg-slate-800 px-4 py-2 text-white font-semibold"
                    @click="openPhoneModal"
                >
                    이메일 인증
                </button>
                </div>
            </div>
            <div class="mt-6 h-px bg-slate-200"></div>
            </div>

            <!-- Action buttons -->
            <div class="flex justify-end gap-3 pt-2">
            <button type="button" class="rounded-md border border-slate-300 px-5 py-2" @click="onCancel">취소</button>
            <button type="button" class="rounded-md bg-amber-500 px-6 py-2 text-white font-semibold" @click="onSubmit">가입하기</button>
            </div>
        </form>
        </main>

        <!-- Verify Modal (iframe 방식) -->
        <div v-if="showPhoneModal" class="fixed inset-0 z-50 flex items-center justify-center" tabindex="0">
        <div class="absolute inset-0 bg-black/50" @click="closePhoneModal"></div>
        <div class="relative w-[960px] max-w-[96vw]">
            <div class="rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div class="flex justify-end p-3 border-b">
                <button class="p-2 rounded-md hover:bg-slate-100" aria-label="닫기" @click="closePhoneModal">✕</button>
            </div>
            <iframe :src="phoneFrameSrc" class="w-full h-[720px] border-0"></iframe>
            </div>
        </div>
        </div>
    </div>
    </template>

    <script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { useRouter } from 'vue-router'
    import { useRoute } from 'vue-router'
    import { useResumeStore } from '@/stores/resumeStore'
    import axios from 'axios'
    
    const API = import.meta.env.VITE_API_URL
    const resumeStore =  useResumeStore();

    const route = useRoute()
    const router = useRouter()
    const STORAGE_KEY = 'specguard.applicant.email.verified'

    
    const form = ref({
        name: '',
        phone1: '010',
        phone2: '',
        phone3: '',
        email: '',
        email2: '',
        password: '',
        password2: '',
    })
    
    const applicantEmailVerified = ref(false)
    const showPhoneModal = ref(false)
    const phoneFrameSrc = ref('')

    const companySlug = route.params.companySlug
    const applicantSlug = route.params.applicantSlug

    // --- 모달 열기/닫기 ---
    function openPhoneModal() {
        phoneFrameSrc.value = "verify"
        showPhoneModal.value = true
        document.body.classList.add('overflow-hidden')
    }

    function closePhoneModal() {
        showPhoneModal.value = false
        phoneFrameSrc.value = ''
        document.body.classList.remove('overflow-hidden')
        restoreEmailFromSession()
    }

    // --- 세션 복구 ---
    function restoreEmailFromSession() {
        try {
            const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
            applicantEmailVerified.value = !!saved?.verified
            if (saved?.email) form.value.email = saved.email
        } catch {
            sessionStorage.removeItem(STORAGE_KEY)
        }
    }

    // --- 취소 ---
    function onCancel() {
        if (window.history.length > 1) window.history.back()
        else router.push('/')
    }

    // --- ESC 키 처리 ---
    function handleEsc(e) {
        if (e.key === 'Escape' && showPhoneModal.value) closePhoneModal()
    }

    // --- iframe 메시지 처리 ---
    function onMessage(e) {
        if (e?.data?.type === 'EMAIL_VERIFIED') {
            applicantEmailVerified.value = true
            closePhoneModal()
        }
    }

    function validateForm() {
        if (!applicantEmailVerified.value) return alert('이메일 인증이 필요합니다.'), false
        if (!form.value.name) return alert('성명을 입력하세요.'), false
        if (!/^\d{3}$/.test(form.value.phone1) || !/^\d{3,4}$/.test(form.value.phone2) || !/^\d{4}$/.test(form.value.phone3))
            return alert('휴대전화 번호를 올바르게 입력하세요.'), false
        if (!form.value.email || !form.value.email2) return alert('이메일과 이메일 확인을 입력하세요.'), false
        if (form.value.email !== form.value.email2) return alert('이메일과 이메일 확인이 일치하지 않습니다.'), false
        if (!form.value.password || !form.value.password2) return alert('비밀번호와 비밀번호 확인을 입력하세요.'), false
        if (form.value.password !== form.value.password2) return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.'), false
        return true
    }

    async function onSubmit() {
        if (!validateForm()) return

        const phone = form.value.phone1 + form.value.phone2 + form.value.phone3

        try {
            const res = await axios.post(`${API}/api/v1/resumes`, {
                templateId: applicantSlug,
                name: form.value.name,
                phone,
                email: form.value.email,
                password: form.value.password
            });
            
            console.log("Signup response:", res.data);
            
            const loginRes = await axios.post(`${API}/api/v1/resumes/login`, {
                templateId: applicantSlug,
                email: form.value.email,
                password: form.value.password
            }, {withCredentials: true});

            console.log("Login response:", loginRes.data);

            resumeStore.resume = loginRes.data.resume // 또는 loginRes.data 바로 내려오는 경우

            router.push({ name: 'ResumeBasicInfo', params: { companySlug, applicantSlug } })

        } catch (error) {
            console.error("Login error:", error);
            alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        }
    }

    

    onMounted(() => {
        window.addEventListener('keydown', handleEsc)
        window.addEventListener('message', onMessage)
        // 새로고침 복구
        restoreEmailFromSession()
    })

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleEsc)
        window.removeEventListener('message', onMessage)
    })
</script>

<style scoped></style>
