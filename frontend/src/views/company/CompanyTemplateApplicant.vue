<!-- views/JobDetail.vue -->
<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- Main -->
        <section class="col-span-12 lg:col-span-9 space-y-6">
        <!-- Job header -->
        <header class="rounded-2xl bg-white shadow-sm p-6">
            <div class="flex items-start justify-between">
            <div>
                <h1 class="text-3xl font-extrabold">{{ job?.title || '채용 공고' }}</h1>
                <p class="mt-2 text-slate-600">{{ job?.desc }}</p>
                <p v-if="job" class="mt-1 text-slate-500">
                지원자 수 : <span class="font-semibold">{{ totalApplicants }}</span>
                </p>
            </div>
            <div v-if="job" class="text-2xl font-extrabold pr-2 pt-1">D-{{ dday(job.endAt) }}</div>
            </div>
        </header>

        <!-- Applicants -->
        <section class="space-y-4">
            <div v-if="loadingJob || loadingApplicants" class="text-sm text-slate-500 px-2">불러오는 중</div>
            <div v-if="error" class="text-sm text-rose-600 px-2">오류: {{ error }}</div>

            <article v-for="a in applicants" :key="a.id" class="rounded-2xl bg-white shadow-sm border p-5">
            <div class="grid grid-cols-12 gap-4">
                <!-- left -->
                <div class="col-span-12 md:col-span-5 flex items-start gap-4">
                <img :src="a.avatarUrl || fallbackAvatar" alt="" class="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-200" />
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                    <h3 class="text-xl font-extrabold">{{ a.name }}</h3>
                    <span class="text-xs px-2 py-0.5 rounded-full" :class="statusChip(a.verifyStatus).cls">
                        {{ statusChip(a.verifyStatus).label }}
                    </span>
                    </div>
                    <p class="mt-1 text-slate-600">
                    검증 상태: <span class="font-semibold">완료</span>
                    <span class="ml-2">정합성 점수: <span class="font-bold">{{ fmtScore(a.score) }}</span></span>
                    </p>
                    <p class="mt-1 text-slate-600">
                    이메일: <span class="font-mono">{{ a.email }}</span>
                    <span class="ml-3">연락처: {{ a.phoneMasked || '010-XXXX-XXXX' }}</span>
                    </p>
                    <div class="mt-3 flex flex-wrap gap-2">
                    <button class="rounded-md bg-slate-100 px-3 py-1" @click="openApplicant(a.id)">상세보기</button>
                    <button class="rounded-md bg-slate-100 px-3 py-1" @click="reverify(a.id)">다시 검증하기</button>
                    </div>
                </div>
                </div>
                <!-- right -->
                <div class="col-span-12 md:col-span-7">
                <div class="h-full rounded-xl border border-slate-200 p-4">
                    <div class="flex items-center justify-between">
                    <h4 class="font-bold">검토자</h4>
                    <div class="flex gap-2">
                        <button class="text-xs rounded-full border px-2 py-1" @click="ping(a.id)">연락하기</button>
                    </div>
                    </div>
                    <ul class="mt-2 text-slate-700 text-sm list-disc pl-5 space-y-1">
                    <li v-for="r in a.reviewers" :key="r.id">{{ r.dept }} {{ r.name }} {{ r.title }}</li>
                    </ul>
                </div>
                </div>
            </div>
            </article>

            <div v-if="hasMore" class="pt-2">
            <button class="w-full rounded-md border px-4 py-2 bg-white hover:bg-slate-50" @click="loadMore">더 보기</button>
            </div>
        </section>
        </section>

        <!-- Right meta -->
        <aside class="col-span-12 lg:col-span-3 pr-4">
        <div class="sticky top-20 space-y-6">
            <div class="rounded-2xl bg-white shadow-sm border p-6 space-y-3">
            <h4 class="text-xl font-extrabold">부서</h4>
            <p class="text-slate-700">{{ job?.dept || '-' }}</p>
            <h4 class="text-xl font-extrabold mt-4">직무</h4>
            <p class="text-slate-700">{{ job?.role || '-' }}</p>
            <h4 class="text-xl font-extrabold mt-4">신입/경력</h4>
            <p class="text-slate-700">{{ job?.careerType || '신입' }}</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                <div class="font-bold">시작일</div>
                <div class="mt-1 rounded-md border px-3 py-1.5">{{ fmtDateTime(job?.startAt) }}</div>
                </div>
                <div>
                <div class="font-bold">마감일</div>
                <div class="mt-1 rounded-md border px-3 py-1.5">{{ fmtDateTime(job?.endAt) }}</div>
                </div>
            </div>
            </div>

            <div class="rounded-2xl bg-white shadow-sm border p-6">
            <h4 class="text-xl font-extrabold mb-3">자소서 문항</h4>
            <div class="space-y-2">
                <button
                v-for="(q, idx) in job?.essayQuestions || []"
                :key="idx"
                class="w-full rounded-md border px-4 py-2 text-left hover:bg-slate-50"
                @click="openQuestion(idx)"
                >
                {{ idx + 1 }}번 문항
                </button>
            </div>
            </div>
        </div>
        </aside>
    </div>
    </template>

    <script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    /* 쉘에서 내려오는 companySlug 사용 */
    const props = defineProps({ companySlug: { type: String, required: false } })

    const route = useRoute()
    const router = useRouter()
    const jobId = route.params.id

    const job = ref(null)
    const applicants = ref([])
    const totalApplicants = ref(0)
    const page = ref(0)
    const size = 20

    const loadingJob = ref(false)
    const loadingApplicants = ref(false)
    const hasMore = ref(false)
    const error = ref('')

    const fallbackAvatar = 'https://placehold.co/96x96/png'

    const base = props.companySlug
    ? `/api/v1/companies/${props.companySlug}`
    : `/api/v1`

    onMounted(async () => {
    await Promise.all([fetchJob(), fetchApplicants(true)])
    })

    async function fetchJob() {
    try {
        loadingJob.value = true
        const r = await fetch(`${base}/jobs/${jobId}`, { headers: { Accept: 'application/json' } })
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        job.value = await r.json()
    } catch (e) {
        error.value = String(e.message || e)
    } finally {
        loadingJob.value = false
    }
    }

    async function fetchApplicants(reset = false) {
    try {
        loadingApplicants.value = true
        if (reset) { page.value = 0; applicants.value = [] }
        const q = new URLSearchParams({ page: String(page.value), size: String(size) })
        const r = await fetch(`${base}/jobs/${jobId}/applicants?${q}`, { headers: { Accept: 'application/json' } })
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const data = await r.json()
        applicants.value = applicants.value.concat(data.content || [])
        totalApplicants.value = data.totalElements ?? applicants.value.length
        hasMore.value = !(data.last ?? true)
        page.value += 1
    } catch (e) {
        error.value = String(e.message || e)
    } finally {
        loadingApplicants.value = false
    }
    }

    function loadMore() { if (!loadingApplicants.value && hasMore.value) fetchApplicants(false) }
    function openApplicant(applicantId) { router.push({ name: 'ApplicantDetail', params: { id: applicantId } }) }
    function reverify(applicantId) { fetch(`/api/v1/applicants/${applicantId}/reverify`, { method: 'POST' }).then(() => fetchApplicants(true)) }
    function ping() {}
    function openQuestion() {}

    function dday(endIso) {
    if (!endIso) return '-'
    const end = new Date(endIso)
    const today = new Date()
    const ms = end.setHours(0,0,0,0) - today.setHours(0,0,0,0)
    const days = Math.ceil(ms / 86400000)
    return days > 0 ? days : 0
    }
    function fmtDateTime(iso) { return iso ? new Date(iso).toLocaleString() : '-' }
    function fmtScore(s) { return s == null ? '-' : Number(s).toFixed(2) }
    function statusChip(status) {
    const map = {
        PASS_DOC: { label: '서류 합격', cls: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
        PASS_FINAL: { label: '최종 합격', cls: 'bg-amber-100 text-amber-700 border border-amber-200' },
        FAIL: { label: '불합격', cls: 'bg-rose-100 text-rose-700 border border-rose-200' },
        PENDING: { label: '검증중', cls: 'bg-slate-100 text-slate-700 border border-slate-200' },
    }
    return map[status] || map.PENDING
    }
</script>
