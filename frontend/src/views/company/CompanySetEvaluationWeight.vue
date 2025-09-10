<!-- WeightSetting.vue -->
<template>
    <div class="min-h-screen bg-white text-slate-900">
        <!-- Topbar -->
        <header class="sticky top-0 z-30 bg-slate-800 text-white">
        <div class="mx-auto max-w-10xl h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div class="flex items-end gap-3">
            <span class="text-2xl font-extrabold tracking-tight">SPECGUARD</span>
            <span class="text-[11px] leading-none text-slate-300 mb-1">이력 검증 시스템</span>
            </div>
            <div class="flex items-center gap-6">
            <button class="rounded-md bg-amber-400 text-slate-900 px-4 py-1.5 text-sm font-semibold hover:bg-amber-300">
                초대 하기
            </button>
            <button class="p-1 hover:text-amber-300" aria-label="알림">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"/>
                </svg>
            </button>
            <button class="p-1 hover:text-amber-300" aria-label="계정">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
            </button>
            <button class="p-1 hover:text-amber-300" aria-label="공유">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 7h10M7 12h6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
            </button>
            </div>
        </div>
        </header>

        <div class="mx-auto max-w-10xl grid grid-cols-12 gap-6 px-4 sm:px-6 lg:px-8 py-6">
        <!-- ===== Sidebar (use as-is) ===== -->
        <transition name="fade-slide" mode="out-in">
            <!-- 펼친 상태 -->
            <aside v-if="sidebarOpen"
                class="col-span-12 sm:col-span-3 lg:col-span-2 sticky top-20">
            <div class="bg-amber-400/90 rounded-2xl p-4 flex flex-col gap-4
                        max-h=[calc(100svh-5rem)] overflow-auto">
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
                    <li><button class="hover:underline" @click="sidebarGo('CompanyDashboard')">채용공고 조회</button></li>
                    <li><button class="hover:underline" @click="sidebarGo('CompanyCreatePostBasic')">채용공고 생성</button></li>
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
        <!-- END PROVIDED SIDEBAR -->

        <!-- ===== Main ===== -->
        <main :class="sidebarOpen ? 'col-span-12 sm:col-span-9 lg:col-span-10' : 'col-span-12 lg:col-span-11'">
            <div class="border-2 border-sky-500 rounded-xl p-6">
            <div class="flex items-start justify-between">
                <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {{ companyTemplateName || '가중치 설정' }}
                </h1>
                <div class="flex items-center gap-3">
                <div class="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold">
                    현재 합계: {{ total.toFixed(2) }}
                </div>
                <div class="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold">
                    남은 비율: {{ remain.toFixed(2) }}
                </div>
                </div>
            </div>

            <!-- Section cards -->
            <section v-for="sec in orderedSections" :key="sec.key"
                    class="mt-6 rounded-2xl border border-slate-300 bg-white shadow-sm">
                <div class="p-5">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                    <span class="text-2xl">•</span>
                    <h2 class="text-2xl font-extrabold">{{ sec.title }}</h2>
                    <button
                        class="ml-3 rounded-full bg-slate-200 px-3 py-1 text-xs font-bold hover:bg-slate-300"
                        @click="saveGroup(sec.key)"
                    >
                        저장하기
                    </button>
                    </div>
                    <!-- 섹션별 총 합 표시 제거 -->
                </div>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- left metrics -->
                    <div class="space-y-5">
                    <div v-for="m in sec.left" :key="m.key" class="flex items-center gap-4">
                        <div class="w-28 shrink-0 text-sm">
                        <span class="inline-block w-2 h-2 bg-slate-700 mr-2"></span>{{ m.label }}
                        </div>
                        <input 
                            type="range"
                            min="0"
                            max="1"
                            step="0.001"
                            :value="m.v"
                            @input="onFreeSlide(m, $event)"
                            class="w-full accent-slate-800"/>
                        <div class="w-14 text-right text-sm">{{ m.v.toFixed(3) }}</div>
                    </div>
                    </div>
                    <!-- right metrics -->
                    <div class="space-y-5">
                    <div v-for="m in sec.right" :key="m.key" class="flex items-center gap-4">
                        <div class="w-32 shrink-0 text-sm">
                        <span class="inline-block w-2 h-2 bg-slate-700 mr-2"></span>{{ m.label }}
                        </div>
                        <input 
                            type="range"
                            min="0"
                            max="1"
                            step="0.001"
                            :value="m.v"
                            @input="onFreeSlide(m, $event)"
                            class="w-full accent-slate-800" />
                        <div class="w-14 text-right text-sm">{{ m.v.toFixed(3) }}</div>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            <!-- Save all -->
            <div class="flex justify-end mt-8">
                <button class="rounded-xl bg-slate-900 px-5 py-2 text-white font-semibold hover:bg-slate-800"
                        @click="saveAll">
                전체 저장
                </button>
            </div>
            </div>
        </main>
        </div>
    </div>
    </template>

    <script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { reactive, computed, ref, onMounted } from 'vue'


    
    

    /* sidebar basics */
    const userName = ref('OOO')
    const sidebarOpen = ref(true)
    const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value)
    const onReport = () => {}
    const route = useRoute()
    const router = useRouter()
    const companySlug = route.params.companySlug
    const postSlug = route.params.postSlug
    const { companyTemplateId } = route.params
    const companyTemplateName = ref('')
    const weight = ref(null)
    onMounted(async () => {
    try {
        // 1) 공고 제목 로딩
        const r1 = await fetch(`/api/company/post/${companyTemplateId}`)
        if (r1.ok) {
        const post = await r1.json()
        companyTemplateName.value = post.title ?? ''
        }

        // 2) 가중치 로딩 (경로 오타 수정: companiy -> company)
        const r2 = await fetch(`/api/company/post/${companyTemplateId}/weight`)
        if (r2.ok) weight.value = await r2.json()
    } catch (e) {
        console.error(e)
    }
    })

    function sidebarGo(name, extraParams = {}, query) {
    router.push({ name, params: { companySlug, ...extraParams }, query })
    }
    function onFreeSlide(metric, evt) {
    const next = Number(evt.target.value)
    const others = total.value - metric.v              // 현재 슬라이더를 제외한 합
    const cap = Math.max(0, 1 - others)                // 이 슬라이더가 가질 수 있는 최대치
    const newVal = Math.min(next, cap)                 // 초과 시 바로 캡
    metric.v = Number(newVal.toFixed(3))               // 표시용 반올림
    evt.target.value = metric.v                        // 썸 위치 동기화
    }

    // /* year badge */
    // const year = new Date().getFullYear()

    /* sections + metrics */
    const sections = reactive({
    github: {
        key: 'github',
        title: 'GitHub (개발활동)',
        left: [
        { key: 'repoCount', label: 'Repo 수', v: 0.10 },
        { key: 'commitFreq', label: 'Commit 빈도', v: 0.15 },
        ],
        right: [
        { key: 'topicMatch', label: 'Topic 매칭', v: 0.10 },
        { key: 'wordMatch',  label: '워드 매칭',  v: 0.05 },
        ],
    },
    notion: {
        key: 'notion',
        title: 'Notion(프로젝트 문서)',
        left: [
        { key: 'projectCount', label: '프로젝트 수', v: 0.083 },
        { key: 'docDetail',    label: '문서 상세도', v: 0.083 },
        ],
        right: [
        { key: 'skillMatch',   label: '기술 키워드 매칭', v: 0.083 },
        ],
    },
    velog: {
        key: 'velog',
        title: 'Velog (기술 블로그)',
        left: [
        { key: 'postCount',  label: '게시글 수', v: 0.067 },
        { key: 'recentAct',  label: '최신 활동', v: 0.067 },
        ],
        right: [
        { key: 'skillMatch', label: '기술 키워드 매칭', v: 0.067 },
        ],
    },
    basic: {
        key: 'basic',
        title: '기본 정보',
        left: [
        { key: 'expFit',  label: '경력 일치', v: 0.075 },
        ],
        right: [
        { key: 'certFit', label: '자격증 정합성', v: 0.075 },
        ],
    },
    })

    const orderedSections = computed(() => [
    sections.github, sections.notion, sections.velog, sections.basic,
    ])

    /* 전체 합계만 계산 */
    const allMetrics = computed(() =>
    orderedSections.value.flatMap(s => [...s.left, ...s.right])
    )

    const total = computed(() =>
    allMetrics.value.reduce((acc, m) => acc + (m.v || 0), 0)
    )
    const remain = computed(() => Math.max(0, 1 - total.value))

    /* persistence */
    async function saveGroup(key) {
    const sec = sections[key]
    const payload = {
        companySlug,
        postSlug,
        section: key,
        // 섹션 합계 제거
        weights: {
        ...Object.fromEntries(sec.left.map(m => [m.key, m.v])),
        ...Object.fromEntries(sec.right.map(m => [m.key, m.v])),
        },
    }
    try {
        await fetch(`/api/company/post/${companyTemplateId}/weight/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        })
    } catch (e) {
        console.error(e)
        alert('저장 실패')
    }
    }

    async function saveAll() {
    const payload = {
        companySlug,
        postSlug,
        total: total.value,
        remain: remain.value,
        sections: orderedSections.value.map(s => ({
        key: s.key,
        // 섹션 합계 제거
        weights: {
            ...Object.fromEntries(s.left.map(m => [m.key, m.v])),
            ...Object.fromEntries(s.right.map(m => [m.key, m.v])),
        },
        })),
    }
    try {
        await fetch(`/api/company/post/${companyTemplateId}/weight`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        })
    } catch (e) {
        console.error(e)
        alert('저장 실패')
    }
    }
    </script>

    <style scoped>
    .fade-slide-enter-active,
    .fade-slide-leave-active{
    transition: opacity .2s cubic-bezier(.22,.61,.36,1), transform .2s cubic-bezier(.22,.61,.36,1);
    will-change: transform, opacity;
    }
.fade-slide-enter-from{ opacity:0; transform:translateX(-6px) }
.fade-slide-leave-to{ opacity:0; transform:translateX(-6px) }
</style>
