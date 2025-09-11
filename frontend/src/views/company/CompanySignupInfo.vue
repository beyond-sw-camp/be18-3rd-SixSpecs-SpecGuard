<template>
    ...
    <main class="mx-auto max-w-6xl px-6 py-12">
        <!-- form으로 감싸기 -->
        <form @submit.prevent="nextStep">
        <section class="rounded-[28px] bg-amber-400/90 p-10 shadow-sm ring-1 ring-black/5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

            <!-- 계정 정보 -->
            <div>
                <h2 class="text-2xl font-extrabold tracking-tight">계정 정보</h2>

                <label class="mt-6 block text-sm font-semibold">아이디 *</label>
                <input v-model.trim="form.username" required
                class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <p v-if="errors.username" class="mt-1 text-xs text-red-600">{{ errors.username }}</p>

                <label class="mt-5 block text-sm font-semibold">비밀번호 *</label>
                <input v-model.trim="form.password" type="password" required
                class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <p v-if="errors.password" class="mt-1 text-xs text-red-600">{{ errors.password }}</p>

                <label class="mt-5 block text-sm font-semibold">전화번호 *</label>
                <input v-model.trim="form.phone" inputmode="tel" required
                class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <p v-if="errors.phone" class="mt-1 text-xs text-red-600">{{ errors.phone }}</p>

                <label class="mt-5 block text-sm font-semibold">이메일 *</label>
                <div class="mt-2 flex gap-3">
                <input v-model.trim="form.email" type="email" required
                    class="flex-1 rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <button type="button" @click="verifyEmail"
                    class="shrink-0 rounded-md bg-slate-800 px-4 py-2 text-white font-semibold hover:bg-slate-700">
                    인증 확인
                </button>
                </div>
                <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
            </div>

            <!-- 기업/담당자 정보 -->
            <div>
                <h2 class="text-2xl font-extrabold tracking-tight">기업 정보</h2>

                <label class="mt-6 block text-sm font-semibold">기업명 *</label>
                <input v-model.trim="form.companyName" required
                class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <p v-if="errors.companyName" class="mt-1 text-xs text-red-600">{{ errors.companyName }}</p>

                <label class="mt-5 block text-sm font-semibold">사업자 번호(10자리) *</label>
                <input v-model.trim="form.bizRegNo" inputmode="numeric" required
                class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <p v-if="errors.bizRegNo" class="mt-1 text-xs text-red-600">{{ errors.bizRegNo }}</p>

                <h3 class="mt-6 text-xl font-extrabold">담당자 정보</h3>

                <label class="mt-4 block text-sm font-semibold">담당자 명 *</label>
                <input v-model.trim="form.managerName" required
                class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <p v-if="errors.managerName" class="mt-1 text-xs text-red-600">{{ errors.managerName }}</p>

                <label class="mt-5 block text-sm font-semibold">대표 연락처 *</label>
                <input v-model.trim="form.managerPhone" inputmode="tel" required
                class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <p v-if="errors.managerPhone" class="mt-1 text-xs text-red-600">{{ errors.managerPhone }}</p>

                <label class="mt-5 block text-sm font-semibold">연락 가능한 이메일 *</label>
                <input v-model.trim="form.managerEmail" type="email" required
                class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <p v-if="errors.managerEmail" class="mt-1 text-xs text-red-600">{{ errors.managerEmail }}</p>
            </div>

            <!-- next -->
            <div class="md:col-span-2 flex justify-end">
                <button type="submit"
                :disabled="!isValid"
                class="rounded-md px-6 py-2 font-semibold text-white
                        transition disabled:cursor-not-allowed
                        disabled:bg-slate-400 bg-slate-800 hover:bg-slate-700">
                다음
                </button>
            </div>
            </div>
        </section>
        </form>
    </main>
    </template>

    <script setup>
    import { reactive, computed } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const form = reactive({
    username:'', password:'', phone:'', email:'',
    companyName:'', bizRegNo:'', managerName:'',
    managerPhone:'', managerEmail:''
    })
    const errors = reactive({})

    const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    const isPhone = v => /^[0-9\-+()\s]{7,20}$/.test(v)
    const isBizNo = v => /^\d{10}$/.test(v)

    const isValid = computed(() => {
    // 실시간 간단 검증
    return form.username && form.password && isPhone(form.phone) && isEmail(form.email) &&
            form.companyName && isBizNo(form.bizRegNo) &&
            form.managerName && isPhone(form.managerPhone) && isEmail(form.managerEmail)
    })

    function verifyEmail() {
    alert(`인증 메일 발송: ${form.email || '입력 없음'}`)
    }

    function validateAll() {
    errors.username = form.username ? '' : '아이디를 입력하세요.'
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

    function nextStep() {
    if (!validateAll()) return
    sessionStorage.setItem('specguard.signup.form', JSON.stringify({ ...form }))
    router.push('/company/signup/condition')
    }
</script>
