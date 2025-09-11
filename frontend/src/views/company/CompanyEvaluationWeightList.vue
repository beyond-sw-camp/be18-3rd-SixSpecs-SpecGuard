<!-- WeightMixList.vue -->
<template>
    <div class="min-h-screen bg-white text-slate-900">
        <div class="w-full-10xl grid grid-cols-12 gap-6 pl-4 sm:pl-6 lg:pl-8 pr-6 py-6">
        <!-- ===== Main ===== -->
        <main class="col-span-12">
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
    

    const router = useRouter()
    const route = useRoute()
    const companySlug = route.params.companySlug || 'demo'
    

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
        params: { companySlug, companyTemplateId: post.id }
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
