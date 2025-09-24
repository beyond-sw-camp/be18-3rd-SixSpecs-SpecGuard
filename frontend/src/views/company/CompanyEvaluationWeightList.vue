<template>
  <div class="w-full grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-9">
      <div class="flex items-center gap-3 mb-4">
        <div class="flex-1">
          <div class="h-10 rounded-full bg-slate-100 flex items-center px-4 gap-2">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 5a6 6 0 100 12 6 6 0 000-12z"/></svg>
            <input v-model.trim="query" placeholder="검색" class="bg-transparent outline-none w-full text-sm" />
          </div>
        </div>
      </div>
      <p class="mb-6 font-semibold">
        총 <span class="text-rose-500">{{ filteredTemplates.length }}</span> 건의 채용이 진행중 입니다.
      </p>

      <section class="space-y-6">
        <article
          v-for="template in filteredTemplates"
          :key="template.id"
          class="rounded-2xl border border-slate-200 shadow-sm cursor-pointer"
          @click="goSet(template.id)"
        >
          <div class="flex items-start justify-between p-6">
            <div class="flex items-start gap-4">
              <div class="mt-1 text-slate-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-extrabold">
                  <button class="hover:underline" @click.stop="goSet(template.id)">{{ template.title }}</button>
                </h3>
                <p class="mt-2 text-slate-600">{{ template.desc }}</p>
                <div class="mt-3 flex gap-2 text-sm">
                  <button class="rounded-md bg-slate-100 px-3 py-1" @click.stop="goSet(template.id)">가중치 설정</button>
                </div>
              </div>
            </div>
            <div class="text-2xl font-extrabold pr-4 pt-1">D-{{ dday(template.endAt) }}</div>
          </div>
        </article>

        <div v-if="loading" class="text-sm text-slate-500 px-2">불러오는 중…</div>
        <div v-if="error" class="text-sm text-rose-600 px-2">오류: {{ error }}</div>
      </section>
    </div>

    <aside class="col-span-12 lg:col-span-3 border-l border-slate-200 pl-6 pr-4">
      <div class="sticky top-20 space-y-6">
        <div class="rounded-2xl border border-slate-200 p-6">
          <h4 class="text-xl font-extrabold mb-4">부서</h4>
          <input v-model.trim="dept" type="text" class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="부서 입력" />
        </div>
        <div class="rounded-2xl border border-slate-200 p-6">
          <h4 class="text-xl font-extrabold mb-4">직무</h4>
          <input v-model.trim="role" type="text" class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="직무 입력" />
        </div>
        <div class="rounded-2xl border border-slate-200 p-6">
          <h4 class="text-xl font-extrabold mb-2">시작일</h4>
          <div class="flex flex-col items-center gap-2 text-sm">
            <input type="date" v-model="startDate" class="rounded-lg border-slate-300" />
            <input type="time" v-model="startTime" class="rounded-lg border-slate-300" />
          </div>
          <h4 class="text-xl font-extrabold mt-5 mb-2">마감일</h4>
          <div class="flex flex-col items-center gap-2 text-sm">
            <input type="date" v-model="endDate" class="rounded-lg border-slate-300" />
            <input type="time" v-model="endTime" class="rounded-lg border-slate-300" />
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios'

const route = useRoute()
const router = useRouter()
const companySlug = route.params.companySlug || ''

const isUuid = (v) =>
  typeof v === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)

const norm = s => (s ?? '').toString().trim().toLowerCase()

// UI 상태
const query = ref('')
const dept = ref('')
const role = ref('')
const status = ref('')
const years = ref('')
const startDate = ref('')
const startTime = ref('')
const endDate = ref('')
const endTime = ref('')
const page = ref(0)
const size = ref(10)
const sort = ref('createdAt,DESC')
const total = ref(0)

// 데이터 상태
const templates = ref([])
const loading = ref(false)
const error = ref('')

onMounted(fetchTemplates)
watch([status, years, startDate, endDate, page, size, sort], fetchTemplates)

async function fetchTemplates () {
  loading.value = true; error.value = ''
  try {
    const { data } = await api.get('/companyTemplates', {
      params: { page: page.value, size: size.value, sort: sort.value }
    })

    const list = Array.isArray(data.templates) ? data.templates : (data.content ?? [])
    total.value = data.totalElements ?? list.length

    templates.value = list.map(item => {
      const b = item.basic ?? {}
      const d = item.detail ?? {}
      return {
        id: b.id,
        title: b.name || '(제목 없음)',
        desc: b.description || '',
        dept: b.department || '',
        role: b.category || '',
        startAt: d.startDate || null,
        endAt: d.endDate || null,
      }
    })
  } catch (e) {
    error.value = e.response?.data?.message || e.message || String(e)
  } finally {
    loading.value = false
  }
}

/** 템플릿 선택 → 기존 프로필 존재 여부 확인 후 생성/수정 라우팅 */
async function goSet(companyTemplateId) {
  try {
    // 이 템플릿으로 만들어진 기존 프로필이 있는지 확인
    // 후보 경로를 순차 시도 (서버 경로 차이 대응)
    const paths = [
      '/evaluationProfiles',
      '/evaluationProfiles/',
      '/evaluation-profile',
      '/evaluation-profiles',
    ]
    let got
    for (const p of paths) {
      const res = await api.get(p, {
        params: { companyTemplateId, page: 0, size: 1, sort: 'createdAt,DESC' },
        _skipGlobalError: true,
        validateStatus: () => true,
      })
      if (res.status >= 200 && res.status < 300) { got = res; break }
    }

    const data = got?.data ?? {}
    const list =
      Array.isArray(data.evaluationProfiles) ? data.evaluationProfiles :
      Array.isArray(data.content) ? data.content : []
    const profileId = list[0]?.id || null

    if (profileId) {
      router.push({
        name: 'CompanyEditEvaluationWeight',
        params: { companySlug: String(companySlug), companyTemplateId: String(companyTemplateId), profileId: String(profileId) },
      })
    } else {
      router.push({
        name: 'CompanyCreateEvaluationWeight',
        params: { companySlug: String(companySlug), companyTemplateId: String(companyTemplateId) },
      })
    }
  } catch (e) {
    // 실패해도 최소 생성 화면으로 진입
    router.push({
      name: 'CompanyCreateEvaluationWeight',
      params: { companySlug: String(companySlug), companyTemplateId: String(companyTemplateId) },
    })
  }
}

function toLocalTs(dateStr, timeStr, endOfDay = false) {
  if (!dateStr) return null
  const [y, m, d] = dateStr.split('-').map(Number)
  let hh = 0, mm = 0
  if (timeStr) { [hh, mm] = timeStr.split(':').map(Number) } else if (endOfDay) { hh = 23; mm = 59 }
  return new Date(y, m - 1, d, hh, mm, 0, 0).getTime()
}

const filteredTemplates = computed(() => {
  const q = norm(query.value)
  const d = norm(dept.value)
  const r = norm(role.value)
  const sTs = toLocalTs(startDate.value, startTime.value, false)
  const eTs = toLocalTs(endDate.value, endTime.value, true)

  return templates.value.filter(j => {
    const title = norm(j.title)
    const desc  = norm(j.desc)
    const jd    = norm(j.dept)
    const jr    = norm(j.role)

    const matchQuery = !q || title.includes(q) || desc.includes(q)
    const matchDept  = !d || jd.includes(d)
    const matchRole  = !r || jr.includes(r)

    const jStartTs = j.startAt ? new Date(j.startAt).getTime() : null
    const jEndTs   = j.endAt   ? new Date(j.endAt).getTime()   : null

    const matchStart = !sTs || (jStartTs !== null && jStartTs >= sTs)
    const matchEnd   = !eTs || (jEndTs   !== null && jEndTs   <= eTs)
    return matchQuery && matchDept && matchRole && matchStart && matchEnd
  })
})

function parseLocalDate(dateLike) {
  if (!dateLike) return null
  if (typeof dateLike === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateLike)) {
    const [datePart, timePart] = dateLike.split('T')
    const [y, m, d] = datePart.split('-').map(Number)
    if (!timePart) return new Date(y, m - 1, d, 0, 0, 0, 0)
    const [hh, mm, ss] = timePart.split(':').map(Number)
    return new Date(y, m - 1, d, hh || 0, mm || 0, ss || 0, 0)
  }
  const dt = new Date(dateLike)
  return isNaN(dt) ? null : dt
}
function dday(endLike) {
  const end = parseLocalDate(endLike)
  if (!end) return 0
  const today0 = new Date(); today0.setHours(0,0,0,0)
  const eod = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999)
  const days = Math.ceil((eod.getTime() - today0.getTime()) / 86400000)
  return days > 0 ? days : 0
}
</script>

<style scoped>
.fade-slide-enter-active,.fade-slide-leave-active{transition:opacity .2s cubic-bezier(.22,.61,.36,1),transform .2s cubic-bezier(.22,.61,.36,1);will-change:transform,opacity}
.fade-slide-enter-from{opacity:0;transform:translateX(-6px)}
.fade-slide-leave-to{opacity:0;transform:translateX(-6px)}
</style>
