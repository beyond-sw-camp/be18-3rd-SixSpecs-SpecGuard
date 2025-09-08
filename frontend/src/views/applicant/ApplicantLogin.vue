<!-- ApplicantLogin.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <!-- Top Bar -->
        <header class="bg-[#2c3e50] text-white">
        <div class="mx-auto max-w-6xl px-6 py-4">
            <div class="flex items-end gap-3">
                <div class="text-3xl font-extrabold tracking-widest">SPECGUARD</div>
                <div class="mt-1 h-1 w-28 bg-white/80"></div>
            </div>
            <p class="sr-only">이력 검증 시스템</p>
        </div>
        </header>

        <!-- Main -->
        <main class="mx-auto max-w-6xl px-6 py-10">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
            <!-- Left: Login -->
            <section class="md:col-span-6">
            <form
                class="rounded-3xl bg-amber-400/90 p-8 shadow"
                @submit.prevent="onSubmit"
            >
                <h2 class="text-2xl font-extrabold mb-6">로그인</h2>

                <label for="userid" class="block text-sm font-semibold mb-2">아이디</label>
                <input
                id="userid"
                v-model.trim="userId"
                type="text"
                placeholder="아이디를 입력해주세요."
                class="w-full h-12 rounded-md border border-slate-300 px-4 bg-white/70 placeholder-slate-500"
                />

                <label for="password" class="block text-sm font-semibold mt-5 mb-2">비밀번호</label>
                <input
                id="password"
                v-model.trim="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                class="w-full h-12 rounded-md border border-slate-300 px-4 bg-white/70 placeholder-slate-500"
                />

                <button
                type="submit"
                class="mt-6 w-full h-12 rounded-md bg-[#2c3e50] text-white font-semibold"
                >
                로그인
                </button>

                <div class="mt-6 flex items-center justify-between text-sm text-white/90">
                <div class="space-x-4">
                    <RouterLink to="/find-id" class="underline underline-offset-2">아이디 찾기</RouterLink>
                    <RouterLink to="/reset-password" class="underline underline-offset-2">비밀번호 찾기</RouterLink>
                </div>
                <RouterLink to="/signup" class="underline underline-offset-2">회원 가입</RouterLink>
                </div>
            </form>
            </section>

            <!-- Divider (mobile) -->
            <div class="md:hidden h-px bg-slate-300"></div>

            <!-- Right: Search + Job list -->
            <section class="md:col-span-6 md:pl-8 md:border-l md:border-slate-300">
            <!-- Search -->
            <div class="flex items-center gap-3">
                <input
                v-model.trim="q"
                type="text"
                placeholder="검색 내용을 입력하세요."
                class="w-full h-12 rounded-md border border-slate-300 px-4 placeholder-slate-400"
                @keyup.enter="onSearch"
                />
                <button
                class="shrink-0 h-12 px-4 rounded-md bg-white border border-slate-300 hover:bg-slate-50"
                @click="onSearch"
                type="button"
                >
                검색
                </button>
            </div>

            <!-- 채용 공고 리스트 (더미) -->
            <ul class="mt-6 space-y-6">
                <li v-for="job in filteredJobs" :key="job.title">
                <a href="#" class="block">
                    <h3 class="text-lg font-extrabold text-slate-700">{{ job.title }}</h3>
                    <p class="text-slate-500 text-sm mt-1">{{ job.period }}</p>
                </a>
                </li>
            </ul>
            </section>
        </div>
        </main>

        <!-- Footer spacer -->
        <div class="h-10"></div>
    </div>
    </template>

    <script setup>
    import { ref, computed } from 'vue'
    import { useRouter, RouterLink } from 'vue-router'

    const router = useRouter()
    const userId = ref('')
    const password = ref('')
    const q = ref('')

    const jobs = ref([
    { title: 'BackEnd 경력', period: '2025/07/05 ~ 2025/09/10' },
    { title: '데이터 분석 전문가 (계약직)', period: '2025/09/06 ~ 2025/10/01' },
    { title: '급여/복리후생 담당 계약직 채용', period: '2025/09/01 ~ 2025/09/30' },
    { title: '설비담당 엔지니어 모집 (울산)', period: '2025/08/17 ~ 2025/09/30' },
    ])

    const filteredJobs = computed(() => {
    if (!q.value) return jobs.value
    const term = q.value.toLowerCase()
    return jobs.value.filter(j => j.title.toLowerCase().includes(term))
    })

    function onSubmit() {
    // TODO: 실제 로그인 API 연동
    // 예: await api.post('/api/v1/auth/login', { userId: userId.value, password: password.value })
    // 성공 시 라우팅
    router.push('/dashboard')
}

function onSearch() {
  // 현재는 클라이언트 필터만 수행
  // 서버 검색 필요하면 API 연동
}
</script>

<!-- Tailwind은 프로젝트에 설정되어 있다고 가정. 개별 스타일 불필요 -->
<style scoped></style>
