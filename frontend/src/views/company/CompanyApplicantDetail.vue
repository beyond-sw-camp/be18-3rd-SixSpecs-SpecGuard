<!-- views/ApplicantDetail.vue -->
<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- ===== Left: main flow (4 섹션이 스크롤로 이어짐) ===== -->
        <section class="col-span-12 lg:col-span-9 space-y-6">
        <!-- 1) 지원자 개요 + 간단 지표 -->
        <header class="rounded-2xl bg-white shadow-sm p-6">
            <h1 class="text-2xl sm:text-3xl font-extrabold">
            {{ job?.title || '채용공고' }}<span v-if="resume?.careerType">, {{ resume.careerType }}</span> 지원
            </h1>

            <!-- 상단 카드 -->
            <div class="mt-4 grid grid-cols-12 gap-4">
            <div class="col-span-12 xl:col-span-7 rounded-xl border p-4">
                <div class="flex items-start gap-4">
                <img :src="resume?.avatarUrl || fallbackAvatar" class="w-20 h-20 rounded-xl object-cover ring-1 ring-slate-200" alt="">
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                    <h2 class="text-xl font-extrabold">{{ resume?.name || '-' }}</h2>
                    <span v-if="resume?.docStatus" class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">서류 합격</span>
                    <span v-if="resume?.rankTop" class="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">상위 {{ resume.rankTop }}%</span>
                    </div>
                    <p class="mt-1 text-slate-600">
                    {{ resume?.univ || '-' }} {{ resume?.major || '' }}
                    </p>
                    <p class="mt-1 text-slate-600">
                    학점: {{ resume?.gpa ?? '-' }} / {{ resume?.gpaScale ?? '4.5' }}
                    <span class="ml-3">정합성: <b>{{ fmtScore(resume?.matchScore) }}</b></span>
                    </p>
                </div>
                </div>
            </div>

            <div class="col-span-12 xl:col-span-5 rounded-xl border p-4">
                <ul class="grid grid-cols-2 gap-y-1 text-sm">
                <li class="col-span-1">GITHUB :</li><li class="col-span-1 text-right">{{ resume?.scores?.github ?? '-' }}</li>
                <li class="col-span-1">NOTION :</li><li class="col-span-1 text-right">{{ resume?.scores?.notion ?? '-' }}</li>
                <li class="col-span-1">VELOG :</li><li class="col-span-1 text-right">{{ resume?.scores?.velog ?? '-' }}</li>
                <li class="col-span-1">CAREER_MATCH :</li><li class="col-span-1 text-right">{{ resume?.scores?.career ?? '-' }}</li>
                <li class="col-span-1">CERTIFICATE_MATCH :</li><li class="col-span-1 text-right">{{ resume?.scores?.cert ?? '-' }}</li>
                </ul>
            </div>
            </div>

            <!-- 그래프 2개 자리는 보더 박스만 (실제 차트는 추후 교체) -->
            <div class="mt-4 grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-7 rounded-xl border p-4">
                <h3 class="font-bold mb-2">정합성 결과</h3>
                <div class="h-40 rounded-md bg-slate-50 border border-dashed"></div>
            </div>
            <div class="col-span-12 lg:col-span-5 rounded-xl border p-4">
                <h3 class="font-bold mb-2">프로젝트 언어분석</h3>
                <div class="h-40 rounded-md bg-slate-50 border border-dashed"></div>
            </div>
            </div>

            <!-- AI 분석 요약 박스 -->
            <div class="mt-4 rounded-xl border p-4">
            <h3 class="font-bold mb-2">지원자 AI분석</h3>
            <div class="grid grid-cols-12 gap-4 text-sm leading-6">
                <div class="col-span-12 md:col-span-6">
                <ol class="list-decimal pl-5 space-y-1">
                    <li>정합성 분석: {{ resume?.analysis?.integrity || '요약 준비중' }}</li>
                    <li>인사이트: {{ resume?.analysis?.insight || '요약 준비중' }}</li>
                </ol>
                </div>
                <div class="col-span-12 md:col-span-6">
                <div class="rounded-md border p-3 bg-slate-50">
                    종합 평가: {{ resume?.analysis?.overall || '요약 준비중' }}
                </div>
                </div>
            </div>
            </div>
        </header>

        <!-- 2) 이력서 상세 + 우측 점수 카드(모바일에선 아래로) -->
        <section class="grid grid-cols-12 gap-4">
            <div class="col-span-12 xl:col-span-8 space-y-4">
            <div class="rounded-xl border p-5">
                <h3 class="font-bold">학력사항</h3>
                <div class="mt-3 grid grid-cols-12 gap-4 text-sm">
                <div class="col-span-12 md:col-span-6">
                    <div class="font-semibold">대학(학사)</div>
                    <ul class="mt-1 list-disc pl-5 space-y-1">
                    <li>학교: {{ resume?.univ || '-' }} / {{ resume?.major || '-' }}</li>
                    <li>재학: {{ resume?.edu?.college?.period || '-' }}</li>
                    <li>평점: {{ resume?.gpa ?? '-' }}</li>
                    </ul>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="font-semibold">고등학교</div>
                    <ul class="mt-1 list-disc pl-5 space-y-1">
                    <li>졸업: {{ resume?.edu?.high?.name || '-' }}</li>
                    <li>재학기간: {{ resume?.edu?.high?.period || '-' }}</li>
                    </ul>
                </div>
                </div>
            </div>

            <div class="rounded-xl border p-5">
                <h3 class="font-bold">자격증</h3>
                <ul class="mt-2 list-disc pl-5 space-y-1 text-sm">
                <li v-for="(c, i) in resume?.certs || []" :key="i">{{ c.name }} {{ c.no || '' }}</li>
                <li v-if="!resume?.certs?.length">-</li>
                </ul>
            </div>

            <div class="rounded-xl border p-5">
                <h3 class="font-bold">포트폴리오</h3>
                <div class="mt-2 space-y-2">
                <input class="w-full rounded-md border px-3 py-2" :value="resume?.links?.github || ''" readonly>
                <input class="w-full rounded-md border px-3 py-2" :value="resume?.links?.notion || ''" readonly>
                </div>
            </div>
            </div>

            <aside class="col-span-12 xl:col-span-4">
            <div class="rounded-2xl bg-white border p-6 sticky top-20 space-y-4">
                <h4 class="text-xl font-extrabold">정합성 결과</h4>
                <div class="text-5xl font-extrabold text-slate-900">{{ fmtScore(resume?.matchScore) }}</div>
                <ul class="mt-2 text-sm space-y-1">
                <li>포트폴리오 유사도: {{ resume?.details?.portfolio ?? '-' }}</li>
                <li>키워드: {{ (resume?.details?.keywords || []).join(', ') || '-' }}</li>
                <li>불일치: {{ (resume?.details?.mismatch || []).join(', ') || '-' }}</li>
                <li>분석 시각: {{ fmtDateTime(resume?.analyzedAt) }}</li>
                </ul>
                <div>
                <label class="text-sm font-semibold">코멘트 작성</label>
                <textarea v-model="comment" rows="4" class="mt-1 w-full rounded-md border px-3 py-2"></textarea>
                <button class="mt-2 rounded-md bg-slate-800 text-white px-4 py-2 text-sm" @click="saveComment">작성하기</button>
                </div>
            </div>
            </aside>
        </section>

        <!-- 3) 자기소개서 상세 (요약 카드 오른쪽) -->
        <section class="grid grid-cols-12 gap-4">
            <div class="col-span-12 xl:col-span-8 space-y-4">
            <div class="rounded-xl border p-5">
                <h3 class="text-2xl font-extrabold mb-2">자기소개서</h3>

                <div v-for="(q, idx) in resume?.essays || []" :key="idx" class="rounded-lg border p-4">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-lg font-bold">{{ idx + 1 }}번 문항</span>
                    <span v-if="q.tags?.length" class="text-xs text-slate-500">#{{ q.tags.join(' #') }}</span>
                </div>
                <div class="text-slate-700">
                    <p class="font-semibold">질문: {{ q.question }}</p>
                    <p class="mt-2 whitespace-pre-line">{{ q.answer }}</p>
                </div>
                </div>

                <div v-if="!resume?.essays?.length" class="text-sm text-slate-500">등록된 자기소개서가 없습니다.</div>
            </div>
            </div>

            <aside class="col-span-12 xl:col-span-4">
            <div class="rounded-2xl bg-white border p-6 sticky top-20">
                <h4 class="text-xl font-extrabold mb-3">정합성 결과</h4>
                <p class="text-5xl font-extrabold">{{ fmtScore(resume?.matchScore) }}</p>
                <p class="mt-3 text-sm text-slate-700">{{ resume?.summary || '요약 준비중' }}</p>
            </div>
            </aside>
        </section>

        <!-- 4) AI 자기소개서 요약 패널 -->
        <section class="grid grid-cols-12 gap-4">
            <div class="col-span-12 xl:col-span-8">
            <div class="rounded-xl border p-5">
                <h3 class="text-2xl font-extrabold">자기소개서</h3>
                <!-- 동일한 본문이 이어짐. 필요 시 더 로드 -->
                <div v-for="(q, idx) in resume?.essays2 || []" :key="'e2-'+idx" class="rounded-lg border p-4 mt-4">
                <div class="font-semibold mb-1">{{ idx + 1 }}번 문항</div>
                <p class="whitespace-pre-line">{{ q.answer }}</p>
                </div>
            </div>
            </div>
            <aside class="col-span-12 xl:col-span-4 pr-4"><!-- 우측 살짝 여백 -->
            <div class="rounded-2xl bg-white border p-6 sticky top-20">
                <h4 class="text-xl font-extrabold mb-3">AI 자기소개서 요약</h4>
                <div class="h-64 rounded-md bg-slate-50 border border-dashed"></div>
            </div>
            </aside>
        </section>
        </section>

        <!-- ===== Right: 지원자 목록 패널 ===== -->
        <aside class="col-span-12 lg:col-span-3 pr-4"><!-- 우측 패널 오른쪽 패딩 -->
        <div class="sticky top-20 space-y-6">
            <div class="rounded-2xl bg-white border p-6">
            <h4 class="text-xl font-extrabold mb-3">지원자 목록</h4>

            <div class="space-y-3 text-sm">
                <div>
                <div class="font-bold">부서</div>
                <select v-model="filter.dept" class="w-full rounded-md border px-2 py-1">
                    <option value="">전체</option><option>IT 개발</option>
                </select>
                </div>
                <div>
                <div class="font-bold">직무</div>
                <select v-model="filter.role" class="w-full rounded-md border px-2 py-1">
                    <option value="">전체</option><option>백엔드 개발자</option>
                </select>
                </div>
                <div>
                <div class="font-bold">신입/경력</div>
                <select v-model="filter.careerType" class="w-full rounded-md border px-2 py-1">
                    <option value="">전체</option><option>신입</option><option>경력</option>
                </select>
                </div>
            </div>

            <hr class="my-4">

            <ul class="divide-y">
                <li v-for="a in filteredList" :key="a.id">
                <button
                    class="w-full text-left px-3 py-2 hover:bg-slate-50"
                    :class="a.id===applicantId ? 'bg-slate-200/60 rounded-md' : ''"
                    @click="goApplicant(a.id)"
                >
                    {{ a.name }}
                </button>
                </li>
            </ul>
            </div>
        </div>
        </aside>
    </div>
    </template>

    <script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    /* Shell 로부터 companySlug 전달 가능 */
    const props = defineProps({ companySlug: { type: String, required: false } })

    const route = useRoute()
    const router = useRouter()

    const jobId = route.params.jobId || route.params.job_id || route.params.jid
    const applicantId = Number(route.params.id || route.params.applicantId)

    const base = props.companySlug
    ? `/api/v1/companies/${props.companySlug}`
    : `/api/v1`

    const job = ref(null)
    const resume = ref(null)
    const list = ref([])
    const filter = ref({ dept: '', role: '', careerType: '' })

    const comment = ref('')
    const fallbackAvatar = 'https://placehold.co/96x96/png'

    onMounted(async () => {
    await Promise.all([fetchJob(), fetchResume(), fetchList()])
    })

    async function fetchJob() {
    const r = await fetch(`${base}/jobs/${jobId}`, { headers: { Accept: 'application/json' } })
    if (r.ok) job.value = await r.json()
    }

    async function fetchResume() {
    // 1) 회사 네임스페이스 경로 우선
    let r = await fetch(`${base}/jobs/${jobId}/applicants/${applicantId}/resume`, { headers: { Accept: 'application/json' } })
    if (!r.ok) {
        // 2) 일반 경로 폴백
        r = await fetch(`/api/v1/applicants/${applicantId}/resume`, { headers: { Accept: 'application/json' } })
    }
    if (r.ok) resume.value = await r.json()
    }

    async function fetchList() {
    // 동일 공고의 지원자 목록
    const qs = new URLSearchParams()
    if (filter.value.dept) qs.set('dept', filter.value.dept)
    if (filter.value.role) qs.set('role', filter.value.role)
    if (filter.value.careerType) qs.set('careerType', filter.value.careerType)
    const r = await fetch(`${base}/jobs/${jobId}/applicants?${qs.toString()}`, { headers: { Accept: 'application/json' } })
    if (r.ok) {
        const data = await r.json()
        list.value = Array.isArray(data.content) ? data.content : data
    }
    }

    const filteredList = computed(() => list.value)

    function goApplicant(id) {
    router.push({ name: 'ApplicantDetail', params: { jobId, id } })
    }

    function fmtScore(s) { return s == null ? '-' : Number(s).toFixed(2) }
    function fmtDateTime(iso) { return iso ? new Date(iso).toLocaleString() : '-' }

    async function saveComment() {
    await fetch(`${base}/jobs/${jobId}/applicants/${applicantId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment.value })
    })
    comment.value = ''
    }
</script>

<style scoped>
/* 필요 시 섹션 간 미세 조정만 */
</style>
