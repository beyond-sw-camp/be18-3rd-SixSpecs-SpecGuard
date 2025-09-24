<!-- TemplateList.vue -->
<template>
  <div class="w-full grid grid-cols-12 gap-6">
    <!-- Main -->
    <div class="col-span-12 lg:col-span-9">
      <!-- Search -->
      <div class="flex items-center gap-3 mb-4">
        <div class="flex-1">
          <div class="h-10 rounded-full bg-slate-100 flex items-center px-4 gap-2">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 5a6 6 0 100 12 6 6 0 000-12z"/></svg>
            <input v-model.trim="query" placeholder="검색" class="bg-transparent outline-none w-full text-sm" />
          </div>
        </div>
      </div>
      <p class="mb-6 font-semibold">총 <span class="text-rose-500">{{ filteredTemplates.length }}</span> 건의 채용이 진행중 입니다.</p>

      <!-- Templates cards -->
      <section class="space-y-6">
        <article
          v-for="template in filteredTemplates"
          :key="template.id"
          class="rounded-2xl border border-slate-200 shadow-sm cursor-pointer"
          @click="goDetail(template.id)"
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
                  <button class="hover:underline" @click.stop="goDetail(template.id)">{{ template.title }}</button>
                </h3>
                <p class="mt-2 text-slate-600">{{ template.desc }}</p>
                <div class="mt-3 flex gap-2 text-sm">
                  <button class="rounded-md bg-slate-100 px-3 py-1" @click.stop="goDetail(template.id)">조회</button>
                  <button class="rounded-md bg-slate-100 px-3 py-1" @click.stop="onEdit(template.id)">수정</button>
                  <button class="rounded-md bg-slate-100 px-3 py-1" @click.stop="onDelete(template)">삭제</button>
                </div>
              </div>
            </div>
            <!--<div class="text-2xl font-extrabold pr-4 pt-1">D-{{ dday(template.endAt) }}</div>-->
        <!--D-X 줄 바꿈된 거, 오른쪽으로 쭉 보이도록 수정함.-->
            <div v-if="template" 
            class="text-2xl font-extrabold pr-2 pt-1 whitespace-nowrap">
          D-{{ dday(template.endAt) }}
        </div>

          </div>
        </article>

        <div v-if="loading" class="text-sm text-slate-500 px-2">불러오는 중…</div>
        <div v-if="error" class="text-sm text-rose-600 px-2">오류: {{ error }}</div>
      </section>
    </div>

    <!-- Right filter panel -->
    <aside class="col-span-12 lg:col-span-3 border-l border-slate-200 pl-6 pr-4">
      <div class="sticky top-20 space-y-6">
        <div class="rounded-2xl border border-slate-200 p-6">
          <h4 class="text-xl font-extrabold mb-4">부서</h4>
          <input
            v-model.trim="dept"
            type="text"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="부서 입력"
          />
          <!-- <select v-model="dept" class="w-full rounded-lg border-slate-300 text-sm">
            <option value="">전체</option>
            <option>백엔드</option>
            <option>프론트엔드</option>
            <option>데이터</option>
            <option>플랫폼</option>
          </select> -->
        </div>
        <div class="rounded-2xl border border-slate-200 p-6">
          <h4 class="text-xl font-extrabold mb-4">직무</h4>
          <input
            v-model.trim="role"
            type="text"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="직무 입력"
          />
          <!-- <select v-model="role" class="w-full rounded-lg border-slate-300 text-sm">
            <option value="">전체</option>
            <option>백엔드</option>
            <option>프론트엔드</option>
            <option>DevOps</option>
            <option>QA</option>
          </select> -->
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

const norm = s => (s ?? '').toString().trim().toLowerCase()

// UI 상태
const query = ref('')
const dept = ref('')
const role = ref('')
const status = ref('')
const years = ref('')
const startDate = ref('')
const startTime = ref('')   // 추가
const endDate = ref('')
const endTime = ref('')     // 추가
const page = ref(0)
const size = ref(10)
const sort = ref('createdAt,DESC')
const total = ref(0)

// 데이터 상태
const templates = ref([])
const loading = ref(false)
const error = ref('')

// 로드 및 필터 변경 시 재조회
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
        startAt: d.startDate || null,     // e.g. "2025-09-19T09:00:00"
        endAt: d.endDate || null,         // e.g. "2025-10-09T23:59:59"
      }
    })
  } catch (e) {
    error.value = e.response?.data?.message || e.message || String(e)
  } finally {
    loading.value = false
  }
}

async function goDetail(id) {
  router.push({ path: `/c/${companySlug}/post/${id}/detail` })
}

async function onDelete(t) {
  if (!t?.id) return
  if (!confirm('이 채용공고를 삭제하시겠습니까?')) return
  try {
    await api.delete(`/companyTemplates/${t.id}`, {
      headers: { 'X-Company-Slug': companySlug },
      params: { companySlug }
    })
    templates.value = templates.value.filter(x => x.id !== t.id)
    total.value = Math.max(0, total.value - 1)
  } catch (e) {
    alert(e.response?.data?.message || e.message || '삭제 실패')
  }
}

async function onEdit(id) {
  router.push({ path: `/c/${companySlug}/modify/post/${id}/edit/basic` })
}
// { path: 'modify/post/:companyTemplateId/basic',

function toLocalTs(dateStr, timeStr, endOfDay = false) {
  if (!dateStr) return null
  const [y, m, d] = dateStr.split('-').map(Number)
  let hh = 0, mm = 0
  if (timeStr) {
    ;[hh, mm] = timeStr.split(':').map(Number)
  } else if (endOfDay) {
    hh = 23; mm = 59
  }
  return new Date(y, m - 1, d, hh, mm, 0, 0).getTime()
}

// 검색 필터
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

    const matchStart = !sTs || (jStartTs !== null && jStartTs >= sTs) // 설정한 시작일 이후(포함)
    const matchEnd   = !eTs || (jEndTs   !== null && jEndTs   <= eTs) // 설정한 마감일
    
    return matchQuery && matchDept && matchRole && matchStart && matchEnd
  })
})

// D-day
function parseLocalDate(dateLike) {
  if (!dateLike) return null
  if (typeof dateLike === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateLike)) {
    // "YYYY-MM-DD" 또는 "YYYY-MM-DDTHH:mm:ss"
    const [datePart, timePart] = dateLike.split('T')
    const [y, m, d] = datePart.split('-').map(Number)
    if (!timePart) return new Date(y, m - 1, d, 0, 0, 0, 0)
    const [hh, mm, ss] = timePart.split(':').map(Number)
    return new Date(y, m - 1, d, hh || 0, mm || 0, ss || 0, 0)
  }
  const dt = new Date(dateLike)
  return isNaN(dt) ? null : dt
}

// D-day 계산하는 함수. 남은 일자 달랐던 거, 수정함.
function dday(endLike) {
  const end = parseLocalDate(endLike)
  if (!end) return 0
  const today0 = new Date(); today0.setHours(0,0,0,0)
  const end0 = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0, 0)
  const days = Math.floor((end0.getTime() - today0.getTime()) / 86400000)
  return days > 0 ? days : 0
}



</script>


<style scoped>
.fade-slide-enter-active,.fade-slide-leave-active{transition:opacity .2s cubic-bezier(.22,.61,.36,1),transform .2s cubic-bezier(.22,.61,.36,1);will-change:transform,opacity}
.fade-slide-enter-from{opacity:0;transform:translateX(-6px)}
.fade-slide-leave-to{opacity:0;transform:translateX(-6px)}
</style>
