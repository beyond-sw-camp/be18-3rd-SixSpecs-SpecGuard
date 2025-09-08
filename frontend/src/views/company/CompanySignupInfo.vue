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

        <!-- Form card -->
        <main class="mx-auto max-w-6xl px-6 py-12">
        <section class="rounded-[28px] bg-amber-400/90 p-10 shadow-sm ring-1 ring-black/5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <!-- 계정 정보 -->
            <div>
                <h2 class="text-2xl font-extrabold tracking-tight">계정 정보</h2>

                <label class="mt-6 block text-sm font-semibold">아이디</label>
                <input v-model="form.username" type="text" placeholder="아이디를 입력해주세요."
                    class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <label class="mt-5 block text-sm font-semibold">비밀번호</label>
                <input v-model="form.password" type="password" placeholder="비밀번호를 입력해주세요."
                    class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <label class="mt-5 block text-sm font-semibold">전화번호</label>
                <input v-model="form.phone" type="tel" placeholder="전화번호를 입력해주세요."
                    class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <label class="mt-5 block text-sm font-semibold">이메일</label>
                <div class="mt-2 flex gap-3">
                <input v-model="form.email" type="email" placeholder="이메일을 입력해주세요."
                        class="flex-1 rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                <button type="button" @click="verifyEmail"
                        class="shrink-0 rounded-md bg-slate-800 px-4 py-2 text-white font-semibold hover:bg-slate-700">
                    인증 확인
                </button>
                </div>
            </div>

            <!-- 기업/담당자 정보 -->
            <div>
                <h2 class="text-2xl font-extrabold tracking-tight">기업 정보</h2>

                <label class="mt-6 block text-sm font-semibold">기업명</label>
                <input v-model="form.companyName" type="text" placeholder="기업명을 입력해주세요."
                    class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <label class="mt-5 block text-sm font-semibold">사업자 번호</label>
                <input v-model="form.bizRegNo" type="text" placeholder="사업자번호를 입력해주세요."
                    class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <h3 class="mt-6 text-xl font-extrabold">담당자 정보</h3>

                <label class="mt-4 block text-sm font-semibold">담당자 명</label>
                <input v-model="form.managerName" type="text" placeholder="담당자명을 입력해주세요."
                    class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <label class="mt-5 block text-sm font-semibold">대표 연락처</label>
                <input v-model="form.managerPhone" type="tel" placeholder="대표연락처를 입력해주세요."
                    class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>

                <label class="mt-5 block text-sm font-semibold">연락 가능한 이메일</label>
                <input v-model="form.managerEmail" type="email" placeholder="연락 가능한 이메일을 입력해주세요."
                    class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
            </div>

            <!-- next -->
            <div class="md:col-span-2 flex justify-end">
                <button type="button" @click="nextStep"
                        class="rounded-md bg-slate-800 px-6 py-2 text-white font-semibold hover:bg-slate-700">
                다음
                </button>
            </div>
            </div>
        </section>
        </main>
    </div>
    </template>

    <script setup>
    import { reactive } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const form = reactive({
    username: '', password: '', phone: '', email: '',
    companyName: '', bizRegNo: '',
    managerName: '', managerPhone: '', managerEmail: ''
    })

    function verifyEmail() {
    // TODO: 이메일 인증 로직 연결
    alert(`인증 메일 발송: ${form.email || '입력 없음'}`)
    }

    function nextStep() {
    // TODO: 서버 전송 또는 다음 단계 라우팅
    router.push('/company/signup/condition')
    console.log('submit payload', { ...form })
    }
</script>

<style scoped>
/* 필요 시 추가 */
</style>
