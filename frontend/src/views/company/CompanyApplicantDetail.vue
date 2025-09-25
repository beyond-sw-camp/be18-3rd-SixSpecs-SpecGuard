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

            <!-- <div class="col-span-12 xl:col-span-5 rounded-xl border p-4">
                <ul class="grid grid-cols-2 gap-y-1 text-sm">
                <li class="col-span-1">GITHUB :</li><li class="col-span-1 text-right">{{ resume?.scores?.github ?? '-' }}</li>
                <li class="col-span-1">NOTION :</li><li class="col-span-1 text-right">{{ resume?.scores?.notion ?? '-' }}</li>
                <li class="col-span-1">VELOG :</li><li class="col-span-1 text-right">{{ resume?.scores?.velog ?? '-' }}</li>
                <li class="col-span-1">CAREER_MATCH :</li><li class="col-span-1 text-right">{{ resume?.scores?.career ?? '-' }}</li>
                <li class="col-span-1">CERTIFICATE_MATCH :</li><li class="col-span-1 text-right">{{ resume?.scores?.cert ?? '-' }}</li>
                </ul>
            </div> -->
            </div>

            <div class="mt-4 grid grid-cols-12 gap-4">
            <!-- <div class="col-span-12 lg:col-span-5 xl:col-span-4 rounded-xl border p-4">
                <h3 class="font-bold mb-2">정합성 결과</h3>
                <div class="h-40 rounded-md bg-slate-50 border border-dashed"></div>
            </div> -->
            <div class="col-span-12 xl:col-span-7 rounded-xl border p-4">
                <h3 class="font-bold mb-2">프로젝트 언어분석</h3>
                <div class="h-40 rounded-md bg-slate-50 border p-3 flex items-center justify-center">
                  <div v-if="langSlices.length" class="flex items-center gap-6">
                    <!-- 파이 -->
                    <svg class="w-[160px] h-[160px] shrink-0" viewBox="0 0 160 160">
                      <g transform="translate(80,80)">
                        <template v-for="(s, i) in langSlices" :key="i">
                          <path :d="s.d" :fill="s.color" stroke="white" stroke-width="1"/>
                        </template>
                      </g>
                    </svg>
                    <!-- 범례 -->
                    <ul class="text-sm space-y-1 flex-1 min-w-[140px]">
                      <li v-for="(s, i) in langSlices" :key="'lg-'+i" class="flex items-center gap-2">
                        <span class="inline-block w-3 h-3 rounded-sm" :style="{background:s.color}"></span>
                        <span class="font-medium">{{ s.name }}</span>
                        <span class="text-slate-500">{{ s.percent }}%</span>
                      </li>
                    </ul>
                  </div>
                  <div v-else class="text-sm text-slate-500">언어 데이터가 없습니다.</div>
                </div>
            </div>
            </div>

            <!-- AI 분석 요약 박스 -->
            <div class="mt-4 rounded-xl border p-4">
              <h3 class="font-bold mb-2">자기소개서 AI 요약본</h3>

              <div v-if="summaries.length" class="space-y-3 text-slate-700 text-sm leading-6">
                <div
                  v-for="(s, i) in summaries"
                  :key="i"
                  class="rounded-xl border px-4 py-3 whitespace-pre-line"
                >
                  {{ s }}
                </div>
              </div>

              <div v-else class="text-sm text-slate-500">요약 준비중</div>
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

            <div v-if="portfolioLinks.length" class="mt-2 space-y-2">
                <div v-for="l in portfolioLinks" :key="l.key" class="flex items-center gap-2">
                <span class="w-28 shrink-0 text-sm text-slate-500">{{ l.label }}</span>
                <input class="w-full rounded-md border px-3 py-2" :value="l.url" readonly>
                <a :href="l.url" target="_blank" rel="noopener" class="text-sm underline">열기</a>
                </div>
            </div>
            <div v-else class="mt-2 text-sm text-slate-500">등록된 링크가 없습니다.</div>
            </div>
            </div>

            <aside class="col-span-12 xl:col-span-4">
            <div class="rounded-2xl bg-white border p-6 sticky top-20 space-y-4">
                <h3 class="font-bold mb-2">정합성 결과</h3>
                <div class="text-5xl font-extrabold text-slate-900">{{ fmtScore(resume?.matchScore) }}</div>
                <ul class="mt-2 text-sm space-y-1">
                  <li>포트폴리오 유사도: {{ resume?.details?.portfolio ?? '-' }}</li>
                  <li>키워드: {{ (resume?.details?.keywords || []).join(', ') || '-' }}</li>
                  <li>불일치: {{ (resume?.details?.mismatch || []).join(', ') || '-' }}</li>
                  <li>분석 시각: {{ fmtDateTime(resume?.analyzedAt) }}</li>
                </ul>
                <p v-if="resume?.details?.comment" class="mt-2 text-sm text-slate-700">
                  {{ resume.details.comment }}
                </p>
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

                <!--<select v-model="filter.dept" class="w-full rounded-md border px-2 py-1">
                    <option value="">전체</option><option>IT 개발</option>
                </select>-->

                <!--직무 IT개발밖에 없어서, 다른 직무들도 추가함.-->
    <select v-model="filter.dept" class="w-full rounded-md border px-2 py-1">
      <option value="">전체</option>
      <option value="IT">IT</option>
      <option value="미디어, 광고">미디어, 광고</option>
      <option value="판매, 유통">판매, 유통</option>
      <option value="제조, 생산, 화학">제조, 생산, 화학</option>
      <option value="금융, 은행">금융, 은행</option>
      <option value="서비스">서비스</option>
      <option value="공공기관 / 공기업">공공기관 / 공기업</option>
    </select>

                </div>
                <div>
                <div class="font-bold">직무</div>
                
                <!--<select v-model="filter.role" class="w-full rounded-md border px-2 py-1">
                    <option value="">전체</option><option>백엔드 개발자</option>
                </select>-->

                <!--직무 상세도 위와 같이 수정-->
    <select v-model="filter.role" class="w-full rounded-md border px-2 py-1">
      <option value="">전체</option>
      <option value="프론트엔드 개발">프론트엔드 개발</option>
      <option value="백엔드 개발">백엔드 개발</option>
      <option value="데이터 분석">데이터 분석</option>
      <option value="ERP">ERP</option>
      <option value="QA">QA</option>
      <option value="네트워크 엔지니어">네트워크 엔지니어</option>
      <option value="HR">HR</option>
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
                    :class="String(a.id)===resumeId ? 'bg-slate-200/60 rounded-md' : ''"
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

<!-- views/ApplicantDetail.vue -->
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
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

const summaries = ref([])
const validationResultId = ref(null)   
const savingComment = ref(false)      
const saveMsg = ref('')  

// links 계산
const portfolioLinks = computed(() => {
  const rawArray = Array.isArray(resume.value?.linksList)
    ? resume.value.linksList
    : Array.isArray(resume.value?.links)
      ? resume.value.links
      : []

  const arr = rawArray
    .filter(x => x && x.url)
    .map(x => ({
      key: String(x.key || x.linkType || x.label || x.url).toLowerCase(),
      label: x.label || x.linkType || 'LINK',
      url: x.url
    }))

  if (arr.length) return arr

  const l = resume.value?.links || {}
  const labelMap = { github: 'GitHub', notion: 'Notion', velog: 'Velog', blog: 'Blog', website: 'Website' }

  return Object.entries(l)
    .filter(([, url]) => !!url)
    .map(([k, url]) => ({
      key: k.toLowerCase(),
      label: labelMap[k] || k.toUpperCase(),
      url: String(url)
    }))
})

const headers = computed(() => ({ 'X-Company-Slug': companySlug, Accept: 'application/json' }))
const hasAuth = computed(() =>
  !!(api.defaults.headers?.common?.Authorization || api.defaults.headers?.Authorization)
)

onMounted(async () => {
  await fetchResume()
  await fetchList()
})

watch(() => route.params.resumeId, (nid, oid) => {
  if (nid && nid !== oid) fetchResume(String(nid))
})

function normalizeFromSwagger(src = {}, extra = {}) {
  const linksMap = (src.links || []).reduce((m, l) => {
    m[(l.linkType || '').toUpperCase()] = l.url || ''
    return m
  }, {})

  const eduList = Array.isArray(src.educations) ? src.educations : []
  const high = eduList.find(e =>
    (e.schoolType||'').toUpperCase()==='HIGH' ||
    (e.degree||'').toUpperCase()==='HIGH_SCHOOL'
  ) || {}
  const college = eduList.find(e =>
    (e.schoolType||'').toUpperCase()!=='HIGH' &&
    (e.degree||'').toUpperCase()!=='HIGH_SCHOOL'
  ) || {}

  const fieldNameById = Object.fromEntries((src.fields||[]).map(f => [f.id, f.fieldName || f.title || '']))
  const essays = (src.templateResponses || []).map(tr => ({
    question: fieldNameById[tr.fieldId] || '',
    answer: tr.answer || '',
    tags: []
  }))

  return {
    id: src.id,
    name: src.name || '-',
    email: src.email || '',
    avatarUrl: src.basic?.profileImageUrl || null,
    careerType: (src.experiences?.length ? '경력' : '신입'),
    univ: college.schoolName || '-',
    major: college.major || '',
    gpa: typeof college.gpa === 'number' ? college.gpa : null,
    gpaScale: typeof college.maxGpa === 'number' ? college.maxGpa : 4.5,
    matchScore: extra.finalScore ?? null,
    rankTop: extra.percentile != null ? (100 - extra.percentile) : null,
    analyzedAt: null,
    analysis: {},
    scores: {},
    details: {},
    links: {
      github: linksMap.GITHUB || '',
      notion: linksMap.NOTION || '',
      velog:  linksMap.VELOG  || ''
    },
    certs: (src.certificates||[]).map(c => ({
      name: c.certificateName || '',
      no: c.certificateNumber || ''
    })),
    edu: {
      college: {
        name: college.schoolName || '',
        major: college.major || '',
        period: (college.startDate && college.endDate) ? `${college.startDate} ~ ${college.endDate}` : ''
      },
      high: {
        name: high.schoolName || '',
        period: (high.startDate && high.endDate) ? `${high.startDate} ~ ${high.endDate}` : ''
      }
    },
    essays,
    essays2: [],
    summary: null,
    gitMeta: extra.gitMetadata || null
  }
}

async function fetchResume(id = resumeId) {
  const r = await api.get(`company/resumes/${id}`, {
    headers: { 'X-Company-Slug': companySlug, Accept: 'application/json' },
    validateStatus: s => s < 500,
  })
  if (r.status !== 200) { resume.value = null; return }

  const root = r.data?.data?.resume ?? r.data?.resume ?? r.data ?? {}
  const gitMeta = r.data?.data?.gitMetadata ?? null
  const summariesArr = Array.isArray(r.data?.data?.summaries) ? r.data.data.summaries : []

let finalScore = null, percentile = null, analyzedAt = null, details = {}
  try {
    const [fs, pct] = await Promise.all([
      api.get(`validation/${id}/final`, {
        headers: { 'X-Company-Slug': companySlug, Accept: 'application/json' },
        validateStatus: s => s < 500
      }),
      api.post('validation/percentile',
        { templateId: companyTemplateId, resumeId: id },
        { headers: { 'X-Company-Slug': companySlug, 'Content-Type': 'application/json' }, validateStatus: s => s < 500 }
      )
    ])
    if (fs.status === 200) {
      const fd = fs.data?.data ?? fs.data ?? {}
      finalScore = fd.finalScore ?? fd.score ?? null
      details = {
        ...details,
        keywords: splitComma(fd.matchKeyword),
        mismatch: splitComma(fd.mismatchKeyword),
        comment: fd.descriptionComment ?? null,
      };
      analyzedAt = fd.resultAt ?? fd.calculatedAt ?? null

    validationResultId.value =
    fd.resultId || fd.id || fd.validationResultId || fd.validation_result_id || null

    // 기존 코멘트 있으면 에디터에 반영
    if (fd.descriptionComment) {
      comment.value = fd.descriptionComment
    }


    }
    if (pct.status === 200) {
      const pd = pct.data?.data ?? pct.data ?? {}
      percentile = pd.percentile ?? null
      analyzedAt = analyzedAt || pd.resultAt || pd.calculatedAt || null
      details = { ...details, ...(pd.details || {}) }
    }
  } catch { /* 에러는 무시하고 기본값 유지 */ }

  const normalized = normalizeFromSwagger(root, { finalScore, percentile, gitMetadata: gitMeta })
  normalized.analyzedAt = analyzedAt
  normalized.details = { ...(normalized.details || {}), ...details }
  normalized.matchScore = finalScore;
  if (!normalized.summary && summariesArr.length) {
  normalized.summary = summariesArr.join('\n').trim()
}
  summaries.value = summariesArr
  resume.value = normalized


}

async function fetchList() {
  try {
    const r = await api.get('company/resumes/list', {
      headers: { 'X-Company-Slug': companySlug },
      params: { page: 0, size: 30, sort: 'createdAt,desc' },
      validateStatus: s => s < 500,
    })

    if (r.status === 200) {
      const body = r.data ?? {}
      const data = body.data ?? body
      const rows = (Array.isArray(data) ? data :
        data.contents ?? data.content ?? data.items ?? data.list ?? data.rows) ?? []
      list.value = rows.map(x => ({
        id: x.resumeId || x.id,
        name: x.applicantName || x.name || '이름 없음',
      }))
    } else {
      list.value = []
    }
  } catch {
    list.value = []
  }
}

async function saveComment() {
  if (!validationResultId.value) {
    alert('분석 결과 ID가 없어 코멘트를 저장할 수 없습니다. 먼저 정합성 분석을 실행하세요.')
    return
  }

  const body = { comment: (comment.value ?? '').trim() }
  if (!body.comment) {
    if (!confirm('내용이 비어 있습니다. 빈 코멘트로 저장할까요?')) return
  }

  savingComment.value = true
  saveMsg.value = ''
  try {
    const r = await api.patch(
      `validation/${validationResultId.value}/comment`,
      body,
      {
        headers: { ...headers.value, 'Content-Type': 'application/json' },
        validateStatus: s => s < 500
      }
    )

    if (r.status === 200 || r.status === 204) {
      resume.value = {
        ...(resume.value || {}),
        details: { ...(resume.value?.details || {}), comment: body.comment }
      }
      saveMsg.value = '저장되었습니다.'
    } else if (r.status === 401 || r.status === 403) {
      throw new Error('권한이 없습니다. 로그인 상태 또는 권한을 확인해 주세요.')
    } else {
      throw new Error(r.data?.message || '저장에 실패했습니다.')
    }
  } catch (e) {
    console.error(e)
    saveMsg.value = e?.message || '저장 중 오류가 발생했습니다.'
  } finally {
    savingComment.value = false
  }
}


// 언어 집계
function aggregateLang(meta) {
  if (!meta) return {};
  const out = {};

  // 1) GitHub style: { languagePercentages: 
  const lp = meta.languagePercentages || meta.language_percentages;
  if (lp && typeof lp === 'object' && !Array.isArray(lp)) {
    for (const [k, v] of Object.entries(lp)) out[k] = Number(v || 0);
  }

  // 2) { languages: { js: 12000, python: 8000 } }
  if (meta.languages && typeof meta.languages === 'object' && !Array.isArray(meta.languages)) {
    for (const [k, v] of Object.entries(meta.languages)) out[k] = (out[k] || 0) + Number(v || 0);
  }

  // 3) { languages: [{name:'js', value:12000}, ...] }
  if (Array.isArray(meta.languages)) {
    for (const x of meta.languages) {
      const k = (x.name || x.lang || x.language || '').toString();
      let v = x.value ?? x.bytes ?? x.count ?? x.percent ?? x.ratio ?? 0;
      if (typeof v === 'string' && v.includes('%')) v = parseFloat(v);
      if (x.ratio != null && v <= 1) v = Number(x.ratio) * 100;
      if (k) out[k] = (out[k] || 0) + Number(v || 0);
    }
  }

  // 4) repos[].languages
  if (Array.isArray(meta.repos)) {
    for (const r of meta.repos) {
      const langs = r?.languages;
      if (!langs) continue;
      if (Array.isArray(langs)) {
        for (const x of langs) {
          const k = (x.name || x.lang || x.language || '').toString();
          let v = x.value ?? x.bytes ?? x.count ?? x.percent ?? x.ratio ?? 0;
          if (typeof v === 'string' && v.includes('%')) v = parseFloat(v);
          if (x.ratio != null && v <= 1) v = Number(x.ratio) * 100;
          if (k) out[k] = (out[k] || 0) + Number(v || 0);
        }
      } else if (typeof langs === 'object') {
        for (const [k, v] of Object.entries(langs)) {
          out[k] = (out[k] || 0) + Number(v || 0);
        }
      }
    }
  }

  // 5) 기타 variant
  if (meta.languageStats && typeof meta.languageStats === 'object') {
    for (const [k, v0] of Object.entries(meta.languageStats)) {
      let v = v0;
      if (typeof v === 'string' && v.includes('%')) v = parseFloat(v);
      if (v <= 1) v = Number(v) * 100;
      out[k] = (out[k] || 0) + Number(v || 0);
    }
  }
  if (Array.isArray(meta.topLanguages)) {
    for (const x of meta.topLanguages) {
      const k = (x.name || x.lang || x.language || '').toString();
      let v = x.percent ?? x.ratio ?? 0;
      if (typeof v === 'string' && v.includes('%')) v = parseFloat(v);
      if (x.ratio != null && v <= 1) v = Number(x.ratio) * 100;
      if (k) out[k] = (out[k] || 0) + Number(v || 0);
    }
  }

  return out;
}


// 색상(고정 팔레트 + 해시 백업)
const PALETTE = ['#1f2937','#f59e0b','#60a5fa','#ef4444','#10b981','#8b5cf6','#14b8a6','#f97316'];
function hashColor(name){
  let h=0; for (let i=0;i<name.length;i++) h=(h*31+name.charCodeAt(i))|0;
  const idx = Math.abs(h)%PALETTE.length; return PALETTE[idx];
}

// 원호 path 만들기
function arcPath(cx, cy, r, startAngle, endAngle){
  const sa = (startAngle-90)*Math.PI/180, ea=(endAngle-90)*Math.PI/180;
  const x1 = cx + r*Math.cos(sa), y1 = cy + r*Math.sin(sa);
  const x2 = cx + r*Math.cos(ea), y2 = cy + r*Math.sin(ea);
  const large = (endAngle-startAngle) > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

// 파이 슬라이스 계산 (상위 4개 + 기타)
const langSlices = computed(() => {
  const meta = resume.value?.gitMeta;
  const agg = aggregateLang(meta);
  const entries = Object.entries(agg).filter(([,v]) => v>0);
  if (!entries.length) return [];
  const total = entries.reduce((s, [,v]) => s+v, 0);

  // 상위 4개 + 기타
  entries.sort((a,b)=>b[1]-a[1]);
  const top = entries.slice(0,4);
  const others = entries.slice(4);
  if (others.length){
    top.push(['Others', others.reduce((s, [,v])=>s+v,0)]);
  }

  let angle = 0;
  const r = 70, cx=0, cy=0;
  return top.map(([name, v], idx) => {
    const percent = Math.round((v/total)*100);
    const sweep = (v/total)*360;
    const d = arcPath(cx, cy, r, angle, angle+sweep);
    angle += sweep;
    return { name, percent, d, color: PALETTE[idx] || hashColor(name) };
  });
});

function splitComma(s){
  if (!s) return [];
  return String(s)
    .split(',')
    .map(v => v.trim())
    .filter(Boolean);
}

// utils
function fmtScore(s) { return s == null ? '-' : Number(s).toFixed(2) }
function fmtDateTime(iso) { return iso ? new Date(iso).toLocaleString() : '-' }

const filteredList = computed(() => list.value)

function goApplicant(id) {
  router.push({
    name: 'CompanyApplicantDetail',
    params: { companySlug, companyTemplateId, resumeId: String(id) }
  })
}
</script>


<style scoped>

</style>
