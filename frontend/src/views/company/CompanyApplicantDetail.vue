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
import api from '@/api/axios'

const props = defineProps({ companySlug: { type: String, required: false } })
const route = useRoute()
const router = useRouter()

// route params
const companySlug = props.companySlug || route.params.companySlug
const companyTemplateId = route.params.companyTemplateId
const resumeId = String(route.params.resumeId)

// state
const job = ref(null)
const resume = ref(null)
const list = ref([])
const filter = ref({ dept: '', role: '', careerType: '' })
const comment = ref('')
const fallbackAvatar = 'https://placehold.co/96x96/png'

// common headers (원시 문자열 사용, .value 금지)
const headers = computed(() => ({ 'X-Company-Slug': companySlug, Accept: 'application/json' }))

onMounted(async () => {
  await Promise.all([fetchResume(), fetchList()])
})

// resume 불러오기: company 네임스페이스 우선 → 글로벌 폴백
async function fetchResume() {
  const [b, d, fs, pct] = await Promise.all([
    api.get(`/company/resumes/${resumeId}/basic`,  { headers: headers.value, validateStatus:s=>s<500 }),
    api.get(`/company/resumes/${resumeId}/detail`, { headers: headers.value, validateStatus:s=>s<500 }),
    api.get(`/validation/${resumeId}/final`,       { headers: headers.value, validateStatus:s=>s<500 }),
    api.get(`/validation/percentile`,              { headers: headers.value, params:{ resumeId }, validateStatus:s=>s<500 })
  ])

  const basic = b.status===200 ? (b.data?.data ?? b.data ?? {}) : {}
  const detail= d.status===200 ? (d.data?.data ?? d.data ?? {}) : {}

  const finalScore = fs.status===200 ? ((fs.data?.data ?? fs.data ?? {}).finalScore ?? (fs.data?.data ?? fs.data ?? {}).score ?? null) : null
  const percentile = pct.status===200 ? (pct.data?.percentile ?? null) : null

  // 통합 엔드포인트가 있다면 덮어쓰기
  if (!basic.id && !detail.id) {
    const g = await api.get(`/company/resumes/${resumeId}`, { headers: headers.value, validateStatus:s=>s<500 })
    if (g.status===200) {
      const root = g.data?.data ?? g.data ?? {}
      Object.assign(basic, root.basic ?? root.resume ?? root)
      Object.assign(detail, root.detail ?? root.details ?? root)
    }
  }

  resume.value = normalizeResume(basic, detail, { finalScore, percentile })
}


// 동일 템플릿 내 지원자 목록
async function fetchList() {
  const r = await api.get('company/resumes/list', {
    headers: headers.value,
    params: { page: 0, size: 30, sort: 'createdAt,desc' },
    validateStatus: s => s < 500
  })
  if (r.status === 200) {
    const body = r.data ?? {}
    const data = body.data ?? body
    const rows = (Array.isArray(data) ? data :
      data.contents ?? data.content ?? data.items ?? data.list ?? data.rows) ?? []
    list.value = rows.map(x => ({
      id: x.id || x.resumeId,
      name: x.name || x.applicantName || '이름 없음'
    }))
  }
}

// basic/detail 병합
function normalizeResume(basic = {}, detail = {}, extra = {}) {
  const b = basic, d = detail
  return {
    id: b.id || d.id,
    name: b.name || d.name || '-',
    avatarUrl: b.avatarUrl || d.avatarUrl || null,
    careerType: (b.yearsOfExperience ?? d.yearsOfExperience ?? 0) > 0 ? '경력' : '신입',
    univ: d.universityName || b.universityName || b.univ || '-',
    major: d.major || b.major || '',
    gpa: d.gpa ?? b.gpa ?? null,
    gpaScale: d.gpaScale ?? b.gpaScale ?? 4.5,
    matchScore: extra?.finalScore ?? d.finalScore ?? b.finalScore ?? null,
    rankTop: extra?.percentile != null ? (100 - extra.percentile) : null,
    analyzedAt: d.analyzedAt || b.analyzedAt || null,
    analysis: {
      integrity: d.analysis?.integrity || b.analysis?.integrity || null,
      insight:   d.analysis?.insight   || b.analysis?.insight   || null,
      overall:   d.analysis?.overall   || b.analysis?.overall   || null,
    },
    scores: d.scores || b.scores || {},
    details: d.details || {},
    links: {
      github: d.github || b.github || '',
      notion: d.notion || b.notion || '',
      velog:  d.velog  || b.velog  || ''
    },
    certs: (d.certificates || b.certs || []).map(c => ({ name: c.name || c.title || '', no: c.number || c.no || '' })),
    edu: {
      college: {
        name: d.universityName || b.universityName || b.univ || '',
        major: d.major || b.major || '',
        period: (d.univStart && d.univEnd) ? `${d.univStart} ~ ${d.univEnd}` : ''
      },
      high: {
        name: d.highSchoolName || '',
        period: (d.highStart && d.highEnd) ? `${d.highStart} ~ ${d.highEnd}` : ''
      }
    },
    essays: d.essays || b.essays || [],
    essays2: d.essays2 || b.essays2 || [],
    summary: d.summary || b.summary || null,
  }
}


// 우측 패널
const filteredList = computed(() => list.value)

function goApplicant(id) {
  router.push({
    name: 'CompanyApplicantDetail',
    params: { companySlug, companyTemplateId, resumeId: String(id) }
  })
}

// utils
function fmtScore(s) { return s == null ? '-' : Number(s).toFixed(2) }
function fmtDateTime(iso) { return iso ? new Date(iso).toLocaleString() : '-' }

// 코멘트 저장
async function saveComment() {
  await api.post(
    `company/resumes/${resumeId}/comments`,
    { content: comment.value },
    { headers: { ...headers.value, 'Content-Type': 'application/json' } }
  )
  comment.value = ''
}
</script>

<style scoped>

</style>
