<!-- WeightMixList.vue -->
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
            <button class="rounded-md bg-amber-400 text-slate-900 px-4 py-1.5 text-sm font-semibold hover:bg-amber-300">초대 하기</button>
            <button class="p-1 hover:text-amber-300" aria-label="알림">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"/></svg>
            </button>
            <button class="p-1 hover:text-amber-300" aria-label="계정">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </button>
            <button class="p-1 hover:text-amber-300" aria-label="공유">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 12h6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            </button>
            </div>
        </div>
        </header>

        <div class="mx-auto max-w-10xl grid grid-cols-12 gap-6 px-4 sm:px-6 lg:px-8 py-6">
        <!-- ===== Sidebar (use exactly as given) ===== -->
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                    </svg>
                </button>
                </div>

                <div class="rounded-xl bg-white/80 px-4 py-5 text-center text-2xl font-extrabold tracking-tight">
                {{ userName }} 님
                </div>

                <div class="space-y-2">
                <div class="flex items-center gap-2 text-slate-800">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 5a6 6 0 100 12 6 6 0 000-12z"/>
                    </svg>
                    검색
                </div>
                <div class="flex items-center gap-2 text-slate-800">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"/>
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
        <!-- ===== /Sidebar ===== -->

        <!-- ===== Main ===== -->
        <main :class="sidebarOpen ? 'col-span-12 sm:col-span-9 lg:col-span-10' : 'col-span-12 lg:col-span-11'">
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">정합성 가중치 관리</h1>

            <!-- search + filters -->
            <div class="flex items-center gap-3 mb-5">
            <div class="flex-1">
                <div class="h-10 rounded-full bg-slate-100 flex items-center px-4 gap-2">
                <input v-model.trim="keyword" placeholder="2025년 상반기 채용 공고"
                        class="bg-transparent outline-none w-full text-sm"/>
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 5a6 6 0 100 12 6 6 0 000-12z"/>
                </svg>
                </div>
            </div>
            </div>

            <div class="flex items-center gap-3 mb-6">
            <select v-model="period" class="rounded-md border-slate-300 text-sm px-3 py-2">
                <option>1개월</option><option>3개월</option><option>6개월</option><option>12개월</option><option>전체</option>
            </select>
            <input type="date" v-model="from" class="rounded-md border-slate-300 text-sm px-3 py-2"/>
            <input type="date" v-model="to" class="rounded-md border-slate-300 text-sm px-3 py-2"/>
            </div>

            <!-- list -->
            <section class="space-y-6">
            <article v-for="post in filtered" :key="post.id"
                    class="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div class="grid grid-cols-12 gap-4 p-5">
                <!-- left info -->
                <div class="col-span-12 md:col-span-7">
                    <div class="flex items-center gap-3">
                    <h3 class="text-2xl font-extrabold">{{ post.title }}</h3>
                    <button class="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold hover:bg-slate-300"
                            @click="goEdit(post)">수정하기</button>
                    </div>
                    <div class="mt-1 text-sm text-slate-600 flex items-center gap-8">
                    <div>이메일: {{ post.email }}</div>
                    <div>연락처: {{ post.phone }}</div>
                    </div>

                    <div class="mt-4 flex flex-wrap gap-3 text-sm">
                    <span class="rounded-full bg-slate-900 text-white px-3 py-1">Velog: {{ f(post.weights.velog) }}</span>
                    <span class="rounded-full bg-slate-200 px-3 py-1">Notion: {{ f(post.weights.notion) }}</span>
                    <span class="rounded-full bg-slate-900 text-white px-3 py-1">GitHub: {{ f(post.weights.github) }}</span>
                    <span class="rounded-full bg-slate-200 px-3 py-1">자격증: {{ f(post.weights.cert) }}</span>
                    </div>
                </div>

                <!-- chart -->
                <div class="col-span-12 md:col-span-3 flex items-center">
                    <div class="flex items-center gap-6 mx-auto">
                    <DonutPie :data="toChart(post.weights)"/>
                    <ul class="text-xs space-y-2">
                        <li class="flex items-center gap-2"><span class="w-2 h-2" :style="{background: colors.velog}"></span>Velog {{ f(post.weights.velog) }}</li>
                        <li class="flex items-center gap-2"><span class="w-2 h-2" :style="{background: colors.notion}"></span>Notion {{ f(post.weights.notion) }}</li>
                        <li class="flex items-center gap-2"><span class="w-2 h-2" :style="{background: colors.other}"></span>기타 {{ f(otherOf(post.weights)) }}</li>
                        <li class="flex items-center gap-2"><span class="w-2 h-2" :style="{background: colors.github}"></span>GitHub {{ f(post.weights.github) }}</li>
                    </ul>
                    </div>
                </div>

                <!-- contacts -->
                <div class="col-span-12 md:col-span-2">
                    <div class="font-extrabold mb-2">담당자</div>
                    <ul class="space-y-2">
                    <li v-for="p in post.owners" :key="p.name"
                        class="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
                        <div class="text-[13px] leading-5">
                        <div>{{ p.dept }} {{ p.name }}</div>
                        </div>
                        <button class="rounded-full border px-2 py-0.5 text-[11px]"
                                :class="p.primary ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-white border-slate-300'"
                                @click="contact(p)">
                        연락하기
                        </button>
                    </li>
                    </ul>
                </div>
                </div>
            </article>
            </section>
        </main>
        </div>
    </div>
    </template>

    <script setup>
    import { ref, reactive, computed, onMounted, watchEffect, defineComponent } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    /* sidebar state */
    const userName = ref('OOO')
    const sidebarOpen = ref(true)
    const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value)
    const onReport = () => {}
    const router = useRouter()
    const route = useRoute()
    const companySlug = route.params.companySlug || 'demo'
    function sidebarGo(name, extraParams = {}, query) {
    router.push({ name, params: { companySlug, ...extraParams }, query })
    }

    /* filters */
    const keyword = ref('')
    const period  = ref('6개월')
    const from    = ref('')
    const to      = ref('')

    /* color map */
    const colors = reactive ({
    velog: '#3b82f6',   // blue
    notion:'#f59e0b',   // amber
    github:'#ef4444',   // red
    other: '#64748b',   // slate
    })

    const f = (v) => Number(v || 0).toFixed(2)
    const otherOf = (w) => Math.max(0, 1 - (+w.velog + +w.notion + +w.github))

    /* load posts from DB */
    const posts = ref([])

    onMounted(async () => {
    try {
        const qs = new URLSearchParams({ companySlug }).toString()
        const res = await fetch(`/api/companies/${companySlug}/posts/weights?${qs}`)
        if (!res.ok) throw new Error('bad status')
        const data = await res.json()
        posts.value = data
    } catch {
        // fallback mock
        posts.value = [
        sample('2025년 상반기 개발 공고 가중치', '123456@naver.com'),
        sample('2025년 상반기 프론트 엔지니어 가중치', '45678@naver.com'),
        sample('2025년 상반기 백엔드 엔지니어 가중치', 'baegopa@gmail.com'),
        ]
    }
    setPeriod(period.value)
    })


    function sample(title, email) {
    return {
        id: cryptoRandom(),
        title,
        email,
        phone: '010-XXXX-XXXX',
        startAt: '2025-01-01',
        endAt: '2025-06-30',
        weights: { velog: 0.30, notion: 0.08, github: 0.42, cert: 0.20 },
        owners: [
        { dept: 'OO부서 OOO', name: '서현원', primary: false },
        { dept: 'XX부서 XX팀', name: '최정우', primary: true  },
        { dept: 'XX부서 XX팀', name: '김탁근', primary: false },
        { dept: '☆☆ 부서 ☆☆ 팀', name: '이완진', primary: false },
        ],
    }
    }
    function cryptoRandom() {
    try { return crypto.randomUUID() } catch { return Math.random().toString(36).slice(2) }
    }

    /* period helper */
    function setPeriod(p) {
    period.value = p
    if (p === '전체') { from.value = ''; to.value = ''; return }
    const months = { '1개월':1,'3개월':3,'6개월':6,'12개월':12 }[p] || 6
    const end = new Date()
    const start = new Date()
    start.setMonth(end.getMonth() - months)
    from.value = iso(start)
    to.value = iso(end)
    }

    watchEffect(() => setPeriod(period.value))
    function iso(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` }

    /* filtering */
    const filtered = computed(() => {
    const q = keyword.value.trim().toLowerCase()
    const ffrom = from.value ? new Date(from.value) : null
    const fto   = to.value ? new Date(to.value) : null
    return posts.value.filter(p => {
        const hit = !q || p.title.toLowerCase().includes(q)
        if (!hit) return false
        const s = new Date(p.startAt || p.endAt || Date.now())
        if (ffrom && s < ffrom) return false
        if (fto && s > fto) return false
        return true
    })
    })

    /* actions */

    function goEdit(post) {
    router.push({
        name: 'CompanySetEvaluationWeight',
        params: { companySlug, postId: post.id }
    })
    }

    function contact(person) { alert(`${person.name}에게 연락합니다`) }

    /* chart data adapter */
    function toChart(w) {
    const other = otherOf(w)
    return [
        { label: 'Velog',  value: +w.velog || 0, color: colors.velog },
        { label: 'Notion', value: +w.notion || 0, color: colors.notion },
        { label: '기타',    value: other,         color: colors.other },
        { label: 'GitHub', value: +w.github || 0, color: colors.github },
    ]
    }
    const DonutPie = defineComponent({
    name: 'DonutPie',
    props: { data: { type: Array, required: true } },
    setup(props) {
        const r = 28, cx = 32, cy = 32, sw = 14
        const total = computed(() => props.data.reduce((a,b)=>a+Number(b.value||0),0) || 1)
        const circ  = 2 * Math.PI * r
        function seg(frac, offset) {
        return {
            dash: `${(circ*frac).toFixed(3)} ${(circ - circ*frac).toFixed(3)}`,
            off:  (circ*offset)*-1,
        }
        }
        return { r,cx,cy,sw,circ,total,seg }
    },
    template: `
        <svg :width="80" :height="80" viewBox="0 0 64 64" class="shrink-0">
        <circle :cx="cx" :cy="cy" :r="r" :stroke-width="sw" fill="transparent" stroke="#e5e7eb"/>
        <template v-if="total">
            <template v-for="(d,i) in data">
            <circle
                :key="i"
                :cx="cx" :cy="cy" :r="r"
                fill="transparent"
                :stroke="d.color"
                :stroke-width="sw"
                stroke-linecap="butt"
                :stroke-dasharray="seg((d.value||0)/total, 0).dash"
                :stroke-dashoffset="seg(0, data.slice(0,i).reduce((a,b)=>a+(b.value||0),0)/total).off"
            />
            </template>
        </template>
        </svg>
    `
    })

    </script>

    <!-- <script>
    /* lightweight donut pie (no deps) */
    export default {}

    
    </script> -->

    <style scoped>
    .fade-slide-enter-active,
    .fade-slide-leave-active{
    transition: opacity .2s cubic-bezier(.22,.61,.36,1), transform .2s cubic-bezier(.22,.61,.36,1);
    will-change: transform, opacity;
    }
.fade-slide-enter-from{ opacity:0; transform:translateX(-6px) }
.fade-slide-leave-to{ opacity:0; transform:translateX(-6px) }
</style>
