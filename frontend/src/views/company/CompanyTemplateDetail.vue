<!-- views/TemplateDetail.vue -->
<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- Main -->
        <section class="col-span-12 lg:col-span-9 space-y-6">
        <!-- Template header -->
        <header class="rounded-2xl bg-white shadow-sm p-6">
            <div class="flex items-start justify-between">
            <div>
                <h1 class="text-3xl font-extrabold">{{ template?.title || '채용 공고' }}</h1>
                <p class="mt-2 text-slate-600">{{ template?.desc }}</p>
                <p v-if="template" class="mt-1 text-slate-500">
                지원자 수 : <span class="font-semibold">{{ totalApplicants }}</span>
                </p>
            </div>
            <!--<div v-if="template" class="text-2xl font-extrabold pr-2 pt-1">D-{{ dday(template.endAt) }}</div>-->
            <!--D-X 줄바꿈된 거, 이어주기.-->
            <div v-if="template" 
            class="text-2xl font-extrabold pr-2 pt-1 whitespace-nowrap">
            D-{{ dday(template.endAt) }}
            </div>
        
        </div>
        </header>

        <!-- Applicants -->
        <section class="space-y-4">
            <div v-if="loadingTemplate || loadingApplicants" class="text-sm text-slate-500 px-2">불러오는 중</div>
            <div v-if="error" class="text-sm text-rose-600 px-2">오류: {{ error }}</div>

            <div v-if="!loadingApplicants && totalApplicants === 0" class="text-sm text-slate-500 px-2">
            해당 공고에 표시할 지원자가 없습니다.
            </div>

            <article v-for="a in applicants" :key="a.id" class="rounded-2xl bg-white shadow-sm border border-slate-200">
            <div class="grid grid-cols-12 gap-5 p-5">
                <!-- left -->
                <div class="col-span-12 md:col-span-5 flex items-start gap-4">
                <img :src="displayAvatar(a)"
                    @error="e => { e.target.onerror = null; e.target.src = fallbackAvatar }"
                    alt=""
                    class="w-24 h-24 rounded-2xl object-cover ring-1 ring-slate-200" />
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                    <h3 class="text-2xl font-extrabold whitespace-nowrap">{{ a.name }}</h3>
                    <span class="inline-flex items-center text-xs px-2 py-0.5 rounded-full border"
                            :class="statusChip(a.verifyStatus).cls">
                        {{ statusChip(a.verifyStatus).label }}
                    </span>
                    </div>
                    <p class="mt-1 text-slate-700">
                    검증 상태:
                    <span
                        class="inline-flex items-center text-xs px-2 py-0.5 rounded-full border"
                        :class="validationState(a).cls"
                    >
                        {{ validationState(a).label }}
                    </span>
                    <span v-if="a.percentile != null" class="ml-2 text-sm text-slate-500">
                        상위 {{ 100 - a.percentile }}%
                    </span>
                    </p>

                    <p class="mt-1 text-slate-700">
                    정합성 점수: <span class="font-extrabold">{{ fmtScore(a.finalScore) }}</span>
                    </p>
                    
                    <!--<p class="mt-1 text-slate-700">
                    이메일: <span class="font-mono">{{ a.email }}</span>
                    <span class="ml-3">연락처: {{ a.phoneMasked || '010-XXXX-XXXX' }}</span>
                    </p>-->

                    <!--이메일과 연락처 줄 바꿈 했어영-->
                    <p class="mt-1 text-slate-700">
                    이메일: <span class="font-mono">{{ a.email }}</span><br>
                    연락처: <span>{{ a.phoneMasked || '010-XXXX-XXXX' }}</span>
                    </p>



                    <div class="mt-3 flex flex-wrap gap-2">
                    <button class="rounded-md border bg-white px-3 py-1 hover:bg-slate-50" @click="openApplicant(a.id)">상세 보기</button>
                    <button class="rounded-md border bg-white px-3 py-1 hover:bg-slate-50"
                            :disabled="calcRunning"
                            @click="verify(a.id)">
                    {{ calcRunning ? '계산 중' : (a.finalScore != null ? '다시 검증' : '정합성 검증하기') }}
                    </button>

                    </div>
                </div>
                </div>

                <!-- right -->
                <div class="col-span-12 md:col-span-7">

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
            <button class="mt-3 w-full rounded-md border px-4 py-2 bg-white hover:bg-slate-50"
                        :disabled="calcRunning"
                        @click="verifyAllForTemplate">
                {{ calcRunning ? '전체 계산 중' : '전체 정합성 검증' }}
                </button>
            <div class="rounded-2xl bg-white shadow-sm border p-6 space-y-3">
            <h4 class="text-xl font-extrabold">부서</h4>
            <p class="text-slate-700">{{ template?.dept || '-' }}</p>
            <h4 class="text-xl font-extrabold mt-4">직무</h4>
            <p class="text-slate-700">{{ template?.role || '-' }}</p>
            <h4 class="text-xl font-extrabold mt-4">신입/경력</h4>
            <p class="text-slate-700">{{ template?.careerType || '신입' }}</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                <div class="font-bold">시작일</div>
                <div class="mt-1 rounded-md border px-3 py-1.5">{{ fmtDateTime(template?.startAt) }}</div>
                </div>
                <div>
                <div class="font-bold">마감일</div>
                <div class="mt-1 rounded-md border px-3 py-1.5">{{ fmtDateTime(template?.endAt) }}</div>
                </div>
            </div>
            </div>

            <div class="rounded-2xl bg-white shadow-sm border p-6">
            <h4 class="text-xl font-extrabold mb-3">자소서 문항</h4>
            <div v-if="hasQuestions" class="space-y-2">
                <div v-for="(q, idx) in (template.essayQuestions || [])" :key="q.id || idx" class="rounded-lg border">
                <button type="button" class="w-full px-4 py-2 text-left font-semibold flex items-center justify-between"
                        @click="toggleQuestion(idx)">
                    <span>{{ idx + 1 }}번 문항</span>
                    <span class="text-sm text-slate-500">{{ openIdx === idx ? '닫기' : '보기' }}</span>
                </button>
                <div v-if="openIdx === idx" class="px-4 pb-4">
                    <div class="rounded-xl border px-4 py-3 text-slate-800 whitespace-pre-wrap">
                    {{ q.fieldName || q.label || q.title || '' }}
                    </div>
                </div>
                </div>
            </div>
            <p v-else class="text-sm text-slate-500">등록된 문항이 없습니다.</p>
            </div>
        </div>
        </aside>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios'

const props = defineProps({ companySlug: { type: String, required: false } })
const route = useRoute()
const router = useRouter()

const companySlug = computed(() => props.companySlug || route.params.companySlug || '')
const pageSize = 10

function statusChip(s){ return { label: statusLabel(s), cls: badgeClass(s) } } // 템플릿 호환

// ---- IDs
const companyTemplateId = ref(route.params.companyTemplateId || route.query.companyTemplateId || '')

// ---- Resume
const resumeLoading = ref(false)
const resumeErr = ref('')

// image helper
function backendOrigin() {
const b = api.defaults.baseURL || '';
try { return new URL(b).origin } catch { return b.replace(/\/api\/.*/,'') }
}
function absoluteUrl(path) {
if (!path) return null
if (/^https?:\/\//i.test(path)) return path
const origin = backendOrigin().replace(/\/+$/,'')
return origin + (path.startsWith('/') ? path : '/' + path)
}
function displayAvatar(a){ return a?.avatarUrl ? absoluteUrl(a.avatarUrl) : fallbackAvatar }

async function fetchAvatarUrl(resumeId){
const r = await api.get(`company/resumes/${resumeId}`, {
headers: { 'X-Company-Slug': companySlug.value },
validateStatus: s => s < 500
})
if (r.status !== 200) return null
const root = r.data?.data?.resume ?? {}
return root.basic?.profileImageUrl || root.profileImageUrl || null
}

// ---- State
const template = ref(null)
const applicants = ref([])
const totalApplicants = ref(0)
const page = ref(0)

const calcRunning = ref(false)

// const size = 20
const loadingTemplate = ref(false)
const loadingApplicants = computed(() => resumeLoading.value)
const hasMore = ref(false)
const error = ref('')
const loading = ref(true)

// const openIdx = ref(null)
const openIdx = ref(null)

function toggleQuestion(idx) {
    openIdx.value = openIdx.value === idx ? null : idx
}
const hasQuestions = computed(() =>
    Array.isArray(template.value?.essayQuestions) &&
    template.value.essayQuestions.length > 0
)



const fallbackAvatar = 'https://placehold.co/96x96/png'

function validationState(a){
    return a?.finalScore != null
    ? { label:'완료', cls:'bg-emerald-100 text-emerald-700 border-emerald-200' }
    : { label:'미완료', cls:'bg-slate-100 text-slate-600 border-slate-200' }
}

// ---- API
async function fetchTemplateDetail(id) {
    loadingTemplate.value = true
    try {
        const res = await api.get(`companyTemplates/${id}`, { headers: { 'X-Company-Slug': companySlug.value } })
        const raw = res.data?.data ?? res.data ?? {}
        const basic = raw.basic ?? {}
        const detail = raw.detail ?? {}
        const fieldsRaw = raw.fields ?? detail?.fields ?? raw.data?.fields ?? []
        const fields = Array.isArray(fieldsRaw) ? fieldsRaw : Object.values(fieldsRaw)
        return {
        id: basic.id ?? raw.id,
        title: basic.name ?? '(제목 없음)',
        desc: basic.description ?? '',
        dept: basic.department ?? '-',
        role: basic.category ?? '-',
        careerType: (basic.yearsOfExperience ?? 0) > 0 ? '경력' : '신입',
        years: basic.yearsOfExperience ?? 0,
        startAt: detail.startDate ?? null,
        endAt: detail.endDate ?? null,
        essayQuestions: fields,
        }
    } finally {
        loadingTemplate.value = false
    }
    }

async function fetchPercentile(resumeId){
  try {
    const r = await api.post(
      'validation/percentile',
      { templateId: companyTemplateId.value, resumeId },
      {
        headers: { 'X-Company-Slug': companySlug.value, 'Content-Type': 'application/json' },
        validateStatus: s => s < 500,  // 4xx도 예외로 던지지 않음
      }
    )
    // 응답 래핑 형태 대응
    const d = r.data?.data ?? r.data ?? {}
    return d.percentile ?? null
  } catch {
    return null
  }
}

    

    function loadMore () {
    if (resumeLoading.value || !hasMore.value) return
    page.value += 1
    fetchResumes({ reset:false })
    }

    // --- UI
    function openApplicant(applicantId) {
    const id = String(applicantId || '').trim()
    if (!id) return
    router.push({
        name: 'CompanyApplicantDetail',
        params: {
        companySlug: companySlug.value,
        companyTemplateId: companyTemplateId.value,
        resumeId: id
        }
    })
    }
    
    // 단건 정합성 계산
    async function verify(applicantId) {
    const id = String(applicantId||'').trim()
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
    if (!isUuid) { error.value = '잘못된 이력서 ID'; return }

    const url = 'validation/calculate'  // 상대경로
    const body = { resumeId: id }
    const headers = { 'X-Company-Slug': companySlug.value, 'Content-Type': 'application/json' }

    calcRunning.value = true
    try {
        console.debug('POST', url, body, headers)
        await api.post(url, body, { headers, validateStatus:s=>s<500 })
        await fetchResumes({ reset:true })
    } catch (e) {
        console.error('calculate error', e?.response?.data || e)
        error.value = e?.response?.data?.message || e?.message || '정합성 계산 실패'
    } finally { calcRunning.value = false }
    }

    // 다중 정합성 계산
    async function verifyAllForTemplate() {
    if (!companyTemplateId.value) return
    calcRunning.value = true
    try {
        await api.post(
        'validation/calculate',
        { companyTemplateId: companyTemplateId.value },                 // 서버가 템플릿 ID로 일괄 계산 지원하는 경우
        { headers: { 'X-Company-Slug': companySlug.value, 'Content-Type': 'application/json' } }
        )
        await fetchApplicants(true)
    } catch (e) {
        console.error('bulk calculate error', e?.response?.data || e)
        error.value = e?.response?.data?.message || e?.message || '일괄 정합성 계산 실패'
    } finally {
        calcRunning.value = false
    }
    }

    async function fetchFinalScore(resumeId){
    const id = String(resumeId||'').trim()
    if (!id) return null
    try {
        const r = await api.get(`validation/${id}/final`, {
        headers: { 'X-Company-Slug': companySlug.value, Accept: 'application/json' },
        validateStatus: s => s < 500   // 404/204를 예외로 던지지 않게
        })
        if (r.status === 200) {
        const d = r.data?.data ?? r.data ?? {}
        return d.finalScore ?? d.score ?? null
        }
        // 404: 계산 전, 204: 데이터 없음 → null
        return null
    } catch (e){
        console.error('final score error', e?.response?.data || e)
        return null
    }
    }

    function dday(endIso){ if(!endIso) return '-'; const e=new Date(endIso), t=new Date(); const ms=e.setHours(0,0,0,0)-t.setHours(0,0,0,0); const d=Math.ceil(ms/86400000); return d>0?d:0 }
    function fmtDateTime(iso){ return iso?new Date(iso).toLocaleString():'-' }
    function fmtScore(s){ return s==null?'-':Number(s).toFixed(2) }
    function statusLabel(s) {
    return ({ PASSED:'서류 합격', FAILED:'불합격', FINAL_PASSED:'최종 합격', COMPLETE:'완료' }[s] || s)
    }
    function badgeClass(s) {
    if (s === 'PASSED' || s === 'FINAL_PASSED') return 'bg-green-100 text-green-700 border-green-200'
    if (s === 'FAILED') return 'bg-rose-100 text-rose-700 border-rose-200'
    return 'bg-slate-100 text-slate-700 border-slate-200'
    }

    async function fetchResumes({ reset = true } = {}) {
    resumeErr.value = '';
    resumeLoading.value = true;
    try {
        if (reset) { page.value = 0; applicants.value = [] }

        const res = await api.get('company/resumes/list', {
        headers: { Accept: 'application/json', 'X-Company-Slug': companySlug.value },
        params: { templateId: companyTemplateId.value, page: page.value, size: pageSize, sort: 'createdAt,desc' },
        paramsSerializer: { indexes: null },
        });

        const body = res.data ?? {};
        const data = body.data ?? body;

        console.log('raw:', res.data);
        const root = res.data?.data ?? res.data ?? {};
        console.log('keys:', Object.keys(root));
        console.log('rows:', (root.content ?? root.items ?? root.list ?? root.rows ?? []));

        // rows: data.* 우선, 없으면 body.*에서 회수
        const rows =
        (Array.isArray(data) ? data :
            data.contents ?? data.content ?? data.items ?? data.list ?? data.rows) ??
        body.contents ?? body.content ?? body.items ?? body.list ?? body.rows ?? [];

        const totalFromServer =
        data.totalElements ?? data.total ?? body.totalElements ?? body.total ?? rows.length;

        const mapped = rows.map(x => ({
        id: x.id || x.resumeId,
        name: x.name || x.applicantName || '이름 없음',
        email: x.email || '-',
        phoneMasked: x.phone || x.mobile || '010-XXXX-XXXX',
        score: x.score ?? x.consistencyScore ?? x.accuracyScore,
        verifyStatus: x.verifyStatus || x.status || 'COMPLETE',
        avatarUrl: x.profileImageUrl || x.avatarUrl || x.basic?.profileImageUrl || x.photoUrl || null,
        reviewers: x.reviewers || x.reviewersInfo || [],
        }));
    

        console.log('profileImageUrl sample:', rows[0]?.profileImageUrl);

        applicants.value = reset ? mapped : applicants.value.concat(mapped)
        totalApplicants.value = totalFromServer
        hasMore.value = (data.last === false) || rows.length === pageSize

        for (const a of mapped){
        const p = await fetchPercentile(a.id)
        a.percentile = p
        const fs = await fetchFinalScore(a.id)
        a.finalScore = fs
        if (!a.avatarUrl) {
            a.avatarUrl = await fetchAvatarUrl(a.id)
            }
        }
    } catch (e) {
        console.error('resumes/list error', {
        url: e?.config?.url, params: e?.config?.params, status: e?.response?.status, data: e?.response?.data
        });
        resumeErr.value = e?.response?.data?.message || e?.message || '목록 로드 실패';
    } finally {
        resumeLoading.value = false;
    }
    
}

onMounted(async () => {
    try {
        if (!companyTemplateId.value) throw new Error('찾을 수 없는 채용공고 입니다.')
        template.value = await fetchTemplateDetail(companyTemplateId.value)
            await fetchResumes({ reset:true })
        console.debug('questions length =', (template.value.essayQuestions||[]).length, template.value.essayQuestions)
    } catch (e) {
        error.value = e?.response?.data?.message || e.message || '조회 실패'
    } finally {
        loading.value = false
    }
})

// --- Route change
watch(() => route.fullPath, async () => {
    const next = route.params.companyTemplateId || route.query.companyTemplateId || ''
    if (!next || next === companyTemplateId.value) return
    companyTemplateId.value = next
    template.value = await fetchTemplateDetail(companyTemplateId.value)
    await fetchResumes({ reset:true })
})
</script>