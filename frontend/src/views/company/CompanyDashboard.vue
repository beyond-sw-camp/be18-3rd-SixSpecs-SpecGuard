<!-- SpecGuardDashboard.vue -->
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
          <button class="p-1 hover:text-amber-300" aria-label="알림">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"/></svg>
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
      <!-- Sidebar -->
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
                  <li><button class="hover:underline" @click="onReport('dashboard')">채용공고 조회</button></li>
                  <li><button class="hover:underline" @click="onReport('dashboard')">채용공고 생성</button></li>
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

      

      <!-- Main -->
      <!-- <main class="col-span-12 sm:col-span-9 lg:col-span-7"> -->
        <main :class="sidebarOpen
          ? 'col-span-12 sm:col-span-9 lg:col-span-7'
          : 'col-span-12 lg:col-span-8'">
        <!-- Search bar and status -->
        <div class="flex items-center gap-3 mb-4">
          <div class="flex-1">
            <div class="h-10 rounded-full bg-slate-100 flex items-center px-4 gap-2">
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 5a6 6 0 100 12 6 6 0 000-12z"/></svg>
              <input v-model.trim="query" placeholder="검색" class="bg-transparent outline-none w-full text-sm" />
            </div>
          </div>
        </div>
        <p class="mb-6 font-semibold">총 <span class="text-rose-500">{{ filteredJobs.length }}</span> 건의 채용이 진행중 입니다.</p>

        <!-- Job cards -->
        <section class="space-y-6">
          <article
            v-for="job in filteredJobs"
            :key="job.id"
            class="rounded-2xl border border-slate-200 shadow-sm"
          >
            <div class="flex items-start justify-between p-6">
              <div class="flex items-start gap-4">
                <div class="mt-1 text-slate-500">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-extrabold">{{ job.title }}</h3>
                  <p class="mt-2 text-slate-600">{{ job.desc }}</p>
                  <div class="mt-3 flex gap-2 text-sm">
                    <button class="rounded-md bg-slate-100 px-3 py-1" @click="onView(job)">조회</button>
                    <button class="rounded-md bg-slate-100 px-3 py-1" @click="onCreate()">생성</button>
                    <button class="rounded-md bg-slate-100 px-3 py-1" @click="onEdit(job)">수정</button>
                    <button class="rounded-md bg-slate-100 px-3 py-1" @click="onDelete(job)">삭제</button>
                  </div>
                </div>
              </div>
              <div class="text-2xl font-extrabold pr-4 pt-1">D-{{ dday(job.endAt) }}</div>
            </div>
          </article>
        </section>
      </main>

      <!-- Right filter panel -->
      <aside class="col-span-12 lg:col-span-3 border-l border-slate-200 pl-6">
        <div class="sticky top-20 space-y-6">
          <div class="rounded-2xl border border-slate-200 p-6">
            <h4 class="text-xl font-extrabold mb-4">부서</h4>
            <select v-model="dept" class="w-full rounded-lg border-slate-300 text-sm">
              <option value="">전체</option>
              <option>백엔드</option>
              <option>프론트엔드</option>
              <option>데이터</option>
              <option>플랫폼</option>
            </select>
          </div>
          <div class="rounded-2xl border border-slate-200 p-6">
            <h4 class="text-xl font-extrabold mb-4">직무</h4>
            <select v-model="role" class="w-full rounded-lg border-slate-300 text-sm">
              <option value="">전체</option>
              <option>백엔드</option>
              <option>프론트엔드</option>
              <option>DevOps</option>
              <option>QA</option>
            </select>
          </div>
          <div class="rounded-2xl border border-slate-200 p-6">
            <h4 class="text-xl font-extrabold mb-2">시작일</h4>
            <div class="flex items-center gap-2 text-sm">
              <input type="date" v-model="startDate" class="rounded-lg border-slate-300" />
              <input type="time" v-model="startTime" class="rounded-lg border-slate-300" />
            </div>
            <h4 class="text-xl font-extrabold mt-5 mb-2">마감일</h4>
            <div class="flex items-center gap-2 text-sm">
              <input type="date" v-model="endDate" class="rounded-lg border-slate-300" />
              <input type="time" v-model="endTime" class="rounded-lg border-slate-300" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 사이드바 오픈
const sidebarOpen = ref(true)
function toggleSidebar() { sidebarOpen.value = !sidebarOpen.value }

// 사용자명
const userName = ref('OOO')

// 검색 및 필터
const query = ref('')
const dept = ref('')
const role = ref('')

const startDate = ref('')
const startTime = ref('')
const endDate = ref('')
const endTime = ref('')

// 데이터 샘플
const jobs = ref([
  {
    id: 1,
    title: '개발 공모 1',
    desc: '26년 2월까지 개발자 TO 1자리를 모집해야 합니다.',
    dept: '플랫폼',
    role: '백엔드',
    startAt: '2025-01-01T09:00:00',
    endAt: '2026-02-28T18:00:00',
  },
  {
    id: 2,
    title: '광고 프론트엔드 개발자 공고',
    desc: '26년 2월까지 개발자 TO 2자리를 모집해야 합니다.',
    dept: '데이터',
    role: '프론트엔드',
    startAt: '2025-03-01T09:00:00',
    endAt: '2026-02-28T18:00:00',
  },
  {
    id: 3,
    title: '석/박사 연구생 모집 공고',
    desc: '25년 10월까지 개발자 TO 1자리를 모집해야 합니다.',
    dept: '플랫폼',
    role: 'QA',
    startAt: '2025-04-01T09:00:00',
    endAt: '2025-10-31T18:00:00',
  },
  {
    id: 4,
    title: '데이터 엔지니어 모집 공고',
    desc: '25년 10월까지 TO 1자리를 모집해야 합니다.',
    dept: '플랫폼',
    role: 'QA',
    startAt: '2025-04-01T09:00:00',
    endAt: '2025-10-31T18:00:00',
  },
  {
    id: 5,
    title: '서버 관리 인원 모집 공고',
    desc: '25년 10월까지 TO 3자리를 모집해야 합니다.',
    dept: '플랫폼',
    role: 'QA',
    startAt: '2025-04-01T09:00:00',
    endAt: '2025-10-31T18:00:00',
  },
])

// 날짜 결합
function combine(date, time) {
  if (!date && !time) return ''
  const t = time || '00:00'
  return new Date(`${date}T${t}`)
}

// 필터링
const filteredJobs = computed(() => {
  const q = query.value.toLowerCase().trim()
  const start = startDate.value ? combine(startDate.value, startTime.value) : null
  const end = endDate.value ? combine(endDate.value, endTime.value) : null

  return jobs.value.filter(j => {
    // 검색
    const hit = !q || j.title.toLowerCase().includes(q) || j.desc.toLowerCase().includes(q)
    if (!hit) return false
    // 부서/직무
    if (dept.value && j.dept !== dept.value) return false
    if (role.value && j.role !== role.value) return false
    // 기간
    const s = new Date(j.startAt)
    const e = new Date(j.endAt)
    if (start && s < start) return false
    if (end && e > end) return false
    return true
  })
})

// D-day 계산
function dday(endIso) {
  const end = new Date(endIso)
  const today = new Date()
  const ms = end.setHours(0,0,0,0) - today.setHours(0,0,0,0)
  const days = Math.ceil(ms / 86400000)
  return days > 0 ? days : 0
}

// 액션
function onView(job) { alert(`[조회] ${job.title}`) }
function onCreate() { alert('[생성] 새 공고') }
function onEdit(job) { alert(`[수정] ${job.title}`) }
function onDelete(job) {
  if (confirm(`[삭제] ${job.title} 삭제할까요?`)) {
    jobs.value = jobs.value.filter(j => j.id !== job.id)
  }
}
</script>

<style scoped>
  .fade-slide-enter-active,
  .fade-slide-leave-active{
                          transition: opacity .2s cubic-bezier(.22,.61,.36,1), transform .2s cubic-bezier(.22,.61,.36,1);
                          will-change: transform, opacity;}
  .fade-slide-enter-from {opacity:0; transform:translateX(-6px)}
  .fade-slide-leave-to{opacity:0; transform:translateX(-6px)}
</style>
