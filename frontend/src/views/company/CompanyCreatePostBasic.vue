<!-- JobPostCreate.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <!-- Topbar -->
        <header class="sticky top-0 z-30 bg-slate-800 text-white">
        <div class="mx-auto max-w-10xl h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div class="flex items-end gap-3">
            <span class="text-2xl font-extrabold tracking-tight">SPECGUARD</span>
            <span class="text-[11px] leading-none text-slate-300 mb-1">이력 검증 시스템</span>
            </div>
            <div class="flex items-center gap-3">
            <button class="rounded-md bg-amber-400 text-slate-900 px-4 py-1.5 text-sm font-semibold hover:bg-amber-300">
                초대 하기
            </button>
            <div class="flex items-center gap-4">
                <svg class="w-6 h-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"/></svg>
                <svg class="w-6 h-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </div>
            </div>
        </div>
        </header>

        <!-- Layout -->
        <main class="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-12 gap-6">
            <!-- === Sidebar (사용자 제공 코드 그대로) === -->
            <transition name="fade-slide" mode="out-in">
            <!-- 펼친 상태 -->
            <aside v-if="sidebarOpen"
                    class="col-span-12 sm:col-span-3 lg:col-span-2 sticky top-20">
                <div class="bg-amber-400/90 rounded-2xl p-4 flex flex-col gap-4
                            max-h-[calc(100svh-5rem)] overflow-auto">
                <div class="flex items-center justify-between">
                    <button class="p-2" aria-label="메뉴">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    </button>
                    <button class="p-2 rotate-180" aria-label="사이드바 토글"
                            @click="toggleSidebar" :aria-pressed="sidebarOpen" :aria-expanded="sidebarOpen">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m15 19-7-7 7-7"/>
                    </svg>
                    </button>
                </div>

                <div class="rounded-xl bg-white/80 px-4 py-5 text-center text-2xl font-extrabold tracking-tight">
                    {{ userName }} 님
                </div>

                <div class="space-y-2">
                    <div class="flex items-center gap-2 text-slate-800">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-4.35-4.35M11 5a6 6 0 100 12 6 6 0 000-12z"/>
                    </svg>
                    검색
                    </div>
                    <div class="flex items-center gap-2 text-slate-800">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"/>
                    </svg>
                    알림
                    </div>
                </div>

                <hr class="border-slate-700/30 my-2">

                <details open class="group">
                    <summary class="list-none flex items-center justify-between rounded-lg bg-slate-900/10 px-3 py-2 font-semibold">
                    <span>공고 관리</span>
                    <svg class="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                    </summary>
                    <div class="mt-2 rounded-xl bg-white/80 p-3 shadow-sm">
                    <ul class="list-disc pl-5 text-sm leading-8">
                        <li><button class="hover:underline" @click="pageMove('CompanyDashboard')">채용공고 조회</button></li>
                        <li><button class="hover:underline" @click="pageMove('CompanyCreatePostBasic')">채용공고 생성</button></li>
                        <li><button class="hover:underline" @click="onReport('dashboard')">채용공고 수정</button></li>
                    </ul>
                    </div>
                </details>

                <details class="group">
                    <summary class="list-none flex items-center justify-between rounded-lg bg-slate-900/10 px-3 py-2 font-semibold">
                    <span>지원자 관리</span>
                    <svg class="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                    </summary>
                </details>

                <details class="group">
                    <summary class="list-none flex items-center justify-between rounded-lg bg-slate-900/10 px-3 py-2 font-semibold">
                    <span>통계 및 리포트</span>
                    <svg class="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                    </summary>
                    <div class="mt-2 rounded-xl bg-white/80 p-3 shadow-sm">
                    <ul class="list-disc pl-5 text-sm leading-8">
                        <li><button class="hover:underline" @click="onReport('dashboard')">대쉬보드</button></li>
                        <li><button class="hover:underline" @click="onReport('applicants')">지원자 목록</button></li>
                        <li><button class="hover:underline" @click="onReport('results')">합격/불합격 분석</button></li>
                    </ul>
                    </div>
                </details>

                <div class="mt-2 text-right text-sm text-slate-800/80">설정</div>
                </div>
            </aside>

            <!-- 접힘 상태: 얇은 레일 -->
            <aside v-else class="hidden sm:block lg:col-span-1 sm:col-span-1 col-span-12 sticky top-20">
                <div class="bg-amber-400/90 rounded-2xl w-12
                            max-h-[calc(100svh-5rem)] flex flex-col items-center py-3 gap-3">
                <button class="p-2" aria-label="사이드바 펼치기" @click="toggleSidebar">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </button>
                </div>
            </aside>
            </transition>
            <!-- === /Sidebar === -->

            <!-- Main content -->
            <section class="col-span-12 sm:col-span-9 lg:col-span-10">
            <!-- Filter row -->
            <div class="grid grid-cols-12 gap-4 items-end">
                <!-- <div class="col-span-12 sm:col-span-3"></div> -->

                <div class="col-span-12 sm:col-span-3">
                <label class="block text-sm font-bold mb-1">부서</label>
                <div class="flex items-center gap-2">
                    <select v-model="form.department" class="w-full rounded-md border border-slate-300 px-3 py-2">
                    <option value="" disabled>선택</option>
                    <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
                    </select>
                    <svg class="w-5 h-5 -ml-7 pointer-events-none opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
                </div>
                </div>

                <div class="col-span-12 sm:col-span-3">
                <label class="block text-sm font-bold mb-1">직무</label>
                <div class="flex items-center gap-2">
                    <select v-model="form.role" class="w-full rounded-md border border-slate-300 px-3 py-2">
                    <option value="" disabled>선택</option>
                    <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
                    </select>
                    <svg class="w-5 h-5 -ml-7 pointer-events-none opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
                </div>
                </div>

                <div class="col-span-12 sm:col-span-2">
                <label class="block text-sm font-bold mb-1">신입/경력</label>
                <div class="flex items-center gap-2">
                    <select v-model="form.careerType" class="w-full rounded-md border border-slate-300 px-3 py-2">
                    <option value="" disabled>선택</option>
                    <option>신입</option>
                    <option>경력</option>
                    </select>
                    <svg class="w-5 h-5 -ml-7 pointer-events-none opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
                </div>
                </div>

                <div class="col-span-12 sm:col-span-1">
                <label class="block text-sm font-bold mb-1">년차</label>
                <input type="number" min="0" v-model.number="form.years"
                        class="w-full rounded-md border border-slate-300 px-3 py-2"/>
                </div>

                <!-- <div class="col-span-12 sm:col-span-12 text-right">
                <button class="rounded-md bg-amber-400 px-5 py-2 font-semibold text-slate-900 hover:bg-amber-300">
                    자소서 문항 생성하기
                </button>
                </div> -->
            </div>

            <!-- Content grid -->
            <div class="mt-6 grid grid-cols-12 gap-6">
            <!-- Left: 제목/설명 -->
            <div class="col-span-12 md:col-span-3">
                <div class="space-y-3">
                <div>
                    <div class="text-sm font-bold mb-1">제목</div>
                    <input v-model="form.title" placeholder="개발자 채용 1"
                        class="w-full rounded-md border border-slate-300 px-3 py-2"/>
                </div>
                <div>
                    <div class="text-sm font-bold mb-1">설명</div>
                    <textarea v-model="form.description" rows="12"
                            class="w-full rounded-md border border-slate-300 px-3 py-2 resize-none"></textarea>
                </div>
                </div>
            </div>

            <!-- Middle: 분야 -->
            <div class="col-span-12 md:col-span-3">
                <div class="text-sm font-bold mb-2">분야</div>
                <div class="relative mb-3">
                <input v-model.trim="categoryQuery"
                        class="w-full h-9 rounded-full bg-slate-200/70 px-4 pr-12 text-sm outline-none"/>
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">검색</span>
                </div>

                <div class="rounded-xl border border-slate-300 p-3">
                <button type="button"
                        class="w-full relative rounded-full bg-slate-800 text-white font-extrabold tracking-tight py-2">
                    {{ categoryGroup }}
                    <svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/>
                    </svg>
                </button>

                <div class="mt-3 rounded-2xl bg-white px-4 py-3 max-h-80 overflow-auto space-y-3">
                    <button v-for="c in filteredCategories" :key="c"
                            @click="toggleChip('category', c)"
                            class="w-full py-2 rounded-full border text-center"
                            :class="selected.category.has(c) ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 border-transparent'">
                    {{ c }}
                    </button>
                </div>
                </div>
            </div>

            <!-- Middle-right: 직무 세부(분야와 동일 UI) -->
            <div class="col-span-12 md:col-span-3">
                <div class="text-sm font-bold mb-2">직무 세부</div>
                <div class="relative mb-3">
                <input v-model.trim="roleQuery"
                        class="w-full h-9 rounded-full bg-slate-200/70 px-4 pr-12 text-sm outline-none"/>
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">검색</span>
                </div>

                <div class="rounded-xl border border-slate-300 p-3">
                <button type="button"
                        class="w-full relative rounded-full bg-slate-800 text-white font-extrabold tracking-tight py-2">
                    {{ roleGroup }}
                    <svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/>
                    </svg>
                </button>

                <div class="mt-3 rounded-2xl bg-white px-4 py-3 max-h-80 overflow-auto space-y-3">
                    <button v-for="t in filteredRoleTags" :key="t"
                            @click="toggleChip('role', t)"
                            class="w-full py-2 rounded-full border text-center"
                            :class="selected.role.has(t) ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 border-transparent'">
                    {{ t }}
                    </button>
                </div>
                </div>
            </div>

            <!-- Right: 미리보기 (폭 축소) -->
            <div class="col-span-12 md:col-span-3">
                <div class="rounded-2xl bg-white p-5 shadow-sm sticky top-20">
                <div class="text-2xl font-extrabold mb-4">기본정보 요약</div>
                <div class="space-y-2 text-lg">
                    <div>{{ preview.title }}</div>
                    <div>{{ preview.department || '○○팀' }}</div>
                    <div>{{ preview.role || '○○○○직무' }}</div>
                    <div>{{ preview.years }}년차</div>
                </div>
                <div class="mt-6">
                    <button class="w-full rounded-md bg-slate-900 px-5 py-2 font-semibold text-white hover:bg-slate-800"
                    @click="pageMove('CompanyCreatePostDetail')">다음
                    </button>
                </div>
                </div>
            </div>
            </div>

            

            </section>
        </div>
        </main>
    </div>
    </template>

    <script setup>
    import { reactive, ref, computed } from 'vue'
    import { useRoute, useRouter,} from 'vue-router'

    const router = useRouter()
    const route = useRoute()
    const companySlug = route.params.companySlug

    function pageMove(name, extraParams = {}, query) {
    router.push({
        name,
        params: { companySlug, ...extraParams },
        query,
    })
    }

    const userName = '000'
    const sidebarOpen = ref(true)
    const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value)
    const onReport = () => {}

    const departments = ['IT', '제조', '영업', 'HR']

    const roleQuery = ref('')
    const roleGroup = '백엔드 개발'
    const roles = ['백엔드 개발', '프론트엔드', '데이터 분석', 'QA', 'ERP']
    const roleTags = ['프론트엔드 개발', '백엔드 개발', '데이터 분석', 'ERP', 'QA', '네트워크 엔지니어', 'HR']

    const filteredRoleTags = computed(() => {
    const q = roleQuery.value.toLowerCase()
    return roleTags.filter(t => t.toLowerCase().includes(q))
    })

    const categories = ['IT', '미디어, 광고', '판매, 유통', '제조, 생산, 화학', '금융, 은행', '서비스', '공공기관 / 공기업']
    const categoryQuery = ref('')
    const categoryGroup = 'IT'
    const filteredCategories = computed(() => {
    const q = categoryQuery.value.toLowerCase()
    return categories.filter(c => c.toLowerCase().includes(q))
    })

    const form = reactive({
    postName: '',
    department: '',
    role: '',
    careerType: '',
    years: 0,
    title: '개발 공채',
    description: '26년 2월까지 개발자 TO 1자리 수 모집해야 합니다.'
    })

    const selected = reactive({
    category: new Set(),
    role: new Set()
    })

    function toggleChip(type, value) {
    const s = selected[type]
    s.has(value) ? s.delete(value) : s.add(value)
    }

    const preview = computed(() => ({
    title: form.title || '주니어개발자 채용 ',
    department: form.department,
    role: form.role,
    years: Number.isFinite(form.years) ? form.years : 0
}))
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all .18s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(-6px); }
.fade-slide-leave-to   { opacity: 0; transform: translateX(-6px); }
</style>
