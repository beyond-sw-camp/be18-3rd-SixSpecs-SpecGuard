<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <main class="w-full -10xl pl-4 sm:pl-6 lg:pl-8 pr-4 py-6">
      <div class="grid grid-cols-12 gap-6">
        <section class="col-span-12">
          <div class="grid grid-cols-12 gap-6">
            <!-- 좌: 기간 -->
            <div class="col-span-12 md:col-span-3">
              <div class="inline-block rounded-full bg-slate-200 px-4 py-2 font-extrabold text-xl mb-3">시작/마감 일자</div>

              <div class="mb-2 flex items-center gap-2">
                <span class="inline-flex items-center gap-1 rounded-full bg-green-300 px-3 py-1 font-semibold">시작 일자</span>
              </div>
              <div class="text-sm rounded-full bg-white inline-block px-4 py-1 border">{{ formatted(startDate, startTime) }}</div>

              <div class="mt-2 rounded-2xl border bg-white p-3 w-full">
                <Calendar :modelValue="startDate" @update:modelValue="v=>startDate=v"/>
                <div class="mt-3 flex items-center gap-2 text-sm">
                  <input type="date" v-model="startDate" class="rounded-lg border-slate-300"/>
                  <input type="time" v-model="startTime" class="rounded-lg border-slate-300"/>
                </div>
              </div>

              <div class="mt-6 mb-2 flex items-center gap-2">
                <span class="inline-flex items-center gap-1 rounded-full bg-rose-300 px-3 py-1 font-semibold">마감 일자</span>
              </div>
              <div class="text-sm rounded-full bg-white inline-block px-4 py-1 border">{{ formatted(endDate, endTime) }}</div>

              <div class="mt-2 rounded-2xl border bg-white p-3 w-full">
                <Calendar :modelValue="endDate" @update:modelValue="v=>endDate=v"/>
                <div class="mt-3 flex items-center gap-2 text-sm">
                  <input type="date" v-model="endDate" class="rounded-lg border-slate-300"/>
                  <input type="time" v-model="endTime" class="rounded-lg border-slate-300"/>
                </div>
              </div>
            </div>

            <!-- 가운데: 커스텀 이력서 -->
            <div class="col-span-12 md:col-span-6 relative">
              <div class="mx-auto text-center">
                <span class="inline-block rounded-2xl bg-slate-200 px-6 py-2 text-2xl font-extrabold">질문 항목 등록</span>
              </div>

              <div class="mt-5 space-y-6 border-l pl-6">
                <div>
                  <div class="flex items-baseline gap-2">
                    <span class="text-2xl font-extrabold">• 항목명</span>
                  </div>
                  <input v-model="itemTitle" class="mt-2 w-full rounded-full border px-4 py-2" placeholder="지원직무와 관련된 경험 기술"/>
                </div>

                <hr>

                <div>
                  <div class="text-2xl font-extrabold">• 항목 타입</div>
                  <div class="mt-3 flex flex-wrap gap-3">
                    <button v-for="t in types" :key="t" @click="type=t"
                            class="rounded-full px-5 py-2 border"
                            :class="t===type ? 'bg-slate-900 text-white border-slate-900' : 'bg-white'">
                      {{ t }}
                    </button>
                  </div>
                </div>

                <hr>

                <div>
                  <div class="text-2xl font-extrabold">• 필수 여부</div>
                  <div class="mt-3 inline-flex items-center rounded-full bg-slate-200 p-1 gap-1">
                    <button class="px-5 py-1 rounded-full text-sm" :class="required ? 'bg-white shadow font-semibold' : ''" @click="required=true">예</button>
                    <button class="px-5 py-1 rounded-full text-sm" :class="!required ? 'bg-white shadow font-semibold' : ''" @click="required=false">아니오</button>
                  </div>
                </div>

                <hr>

                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <div class="text-xl font-extrabold">• 최소 글자수</div>
                    <input type="number" min="0" v-model.number="minLen" class="mt-2 w-40 rounded-full border px-4 py-1.5"/>
                  </div>
                  <div>
                    <div class="text-xl font-extrabold">• 최대 글자수</div>
                    <input type="number" min="0" v-model.number="maxLen" class="mt-2 w-40 rounded-full border px-4 py-1.5"/>
                  </div>
                </div>

                <hr>

                <div class="flex items-center justify-end gap-6">
                  <button class="text-slate-700 hover:underline" @click="addPrompt">추가 +</button>
                  <button class="text-slate-700 hover:underline" @click="removePrompt">삭제 -</button>
                </div>

                <div class="text-center text-slate-400">• •</div>
              </div>
            </div>

            <!-- 우: 미리보기 + 저장 -->
            <div class="col-span-12 md:col-span-3">
              <div class="flex justify-end mb-3">
                <button class="rounded-xl bg-amber-400 px-5 py-2 font-bold text-slate-900 shadow hover:bg-amber-300"
                        :disabled="saving" @click="createPosting">채용공고 생성하기</button>
              </div>

              <div class="rounded-2xl bg-white p-5 shadow-sm border sticky top-20">
                <div class="text-2xl font-extrabold mb-4">문항 요약</div>
                <div class="text-sm space-y-1 mb-4">
                  <div>시작일: {{ formatted(startDate, startTime) }}</div>
                  <div>마감일: {{ formatted(endDate, endTime) }}</div>
                </div>

                <div class="space-y-5">
                  <div v-for="(p, idx) in prompts" :key="idx" class="rounded-2xl bg-slate-100 p-4">
                    <div class="font-extrabold mb-1">• {{ idx+1 }}번 문항</div>
                    <p class="text-sm leading-6 text-slate-700">{{ p }}</p>
                  </div>
                </div>

                <p v-if="err" class="mt-4 text-rose-600 text-sm">오류: {{ err }}</p>
                <p v-else-if="ok" class="mt-2 text-green-700 text-sm">생성 완료</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios'

const router = useRouter()
const route = useRoute()
const companySlug = route.params.companySlug
const templateId = route.params.templateId

const itemTitle = ref('');
const types = ['텍스트','숫자','날짜','선택'];

/* 입력값 */
// const startDateIso = toLocalISO(startDate.value, startTime.value, false)
// const endDateIso   = toLocalISO(endDate.value,   endTime.value,   true)

const startDate = ref('')
const startTime = ref('')
const endDate = ref('')
const endTime = ref('')

const type = ref('텍스트')
const required = ref(true)
const minLen = ref(0)
const maxLen = ref(0)
const prompts = ref([
  '...에 지원한 이유와 입사 후 본인이 보유한 경험을 어떻게 활용할 계획인지 작성해주세요.',
  '...의 인재상과 본인이 얼마나 부합하는지 구체적인 사례를 바탕으로 작성해주세요.'
])

const addPrompt = () => {
  const t = itemTitle.value.trim();
  prompts.value.push(t || `새 문항 ${prompts.value.length + 1}`);
  itemTitle.value = '';
};

const removePrompt = () => {
  if (prompts.value.length) prompts.value.pop();
};

/* 유틸 */
function todayISO () {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function toLocalISO(dateStr, timeStr, { endOfDay = false } = {}) {
  if (!dateStr) return null
  const [y,m,d] = dateStr.split('-').map(Number)
  let hh=0, mm=0, ss=0
  if (timeStr) [hh,mm] = timeStr.split(':').map(Number)
  else if (endOfDay) { hh=23; mm=59; ss=59 } else { hh=9; mm=0; ss=0 }
  const dt = new Date(y, m-1, d, hh, mm, ss, 0)
  const pad = n => String(n).padStart(2,'0')
  return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`
}

function formatted (d, t) {
  if (!d && !t) return '—'
  const [y,m,day] = (d || todayISO()).split('-').map(Number)
  const [hh,mm] = (t || '00:00').split(':').map(Number)
  const dt = new Date(y, m-1, day, hh, mm, 0, 0) // 로컬
  return dt.toLocaleString('ko-KR', {
    year:'numeric', month:'long', day:'numeric',
    weekday:'short', hour:'2-digit', minute:'2-digit', hour12:false
  })
}

/* 경량 캘린더 */
const Calendar = defineComponent({
  name: 'PostCalendar',
  props: { modelValue: { type: String, default: '' } },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const cur = ref(props.modelValue || todayISO())
    watch(() => props.modelValue, v => { if (v) cur.value = v })
    const ym = computed(() => { const d=new Date(cur.value); return { y:d.getFullYear(), m:d.getMonth() } })
    const toISO = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    const setDay = day => emit('update:modelValue', toISO(new Date(ym.value.y, ym.value.m, day)))
    const prev = () => { cur.value = toISO(new Date(ym.value.y, ym.value.m-1,1)) }
    const next = () => { cur.value = toISO(new Date(ym.value.y, ym.value.m+1,1)) }
    const weeks = computed(() => {
      const first=new Date(ym.value.y, ym.value.m,1)
      const last=new Date(ym.value.y, ym.value.m+1,0)
      const startIdx=(first.getDay()+6)%7
      const days=last.getDate()
      const cells=Array(startIdx).fill(null).concat([...Array(days)].map((_,i)=>i+1))
      while(cells.length%7) cells.push(null)
      const out=[]; for(let i=0;i<cells.length;i+=7) out.push(cells.slice(i,i+7)); return out
    })
    return { ym, weeks, prev, next, setDay }
  },
  template: `
    <div class="w-full">
      <div class="flex items-center justify-between mb-2">
        <button class="px-2 py-1 rounded bg-slate-100" @click="prev">‹</button>
        <div class="text-sm font-semibold">{{ ym.y }}년 {{ ym.m + 1 }}월</div>
        <button class="px-2 py-1 rounded bg-slate-100" @click="next">›</button>
      </div>
      <div class="grid grid-cols-7 text-center text-xs text-slate-500 mb-1"><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span></div>
      <div class="grid grid-cols-7 gap-y-1 text-center">
        <template v-for="(w, wi) in weeks" :key="wi">
          <template v-for="(d, di) in w" :key="di">
            <button v-if="d" class="mx-auto w-7 h-7 rounded-full hover:bg-slate-200 text-sm" @click="setDay(d)">{{ d }}</button>
            <span v-else class="w-7 h-7"></span>
          </template>
        </template>
      </div>
    </div>
  `
})

/* 상태 */
const err = ref('')
const submitting = ref(false)
const ok = ref(false)
const saving = computed(() => submitting.value)

const fieldTypeEnum = k => ({ '텍스트':'TEXT','숫자':'NUMBER','날짜':'DATE','선택':'SELECT' }[k] || 'TEXT')

async function createPosting () {
  err.value=''; submitting.value=true; ok.value=false
  try {
    if (!templateId) throw new Error('templateId 없음')
    if (!localStorage.getItem('accessToken')) throw new Error('로그인 필요')

    const startDateIso = toLocalISO(startDate.value, startTime.value, { endOfDay:false, coerceFuture:true })
    const endDateIso   = toLocalISO(endDate.value,   endTime.value,   { endOfDay:true,  coerceFuture:true })

    const ft = fieldTypeEnum(type.value)
    const fields = prompts.value.map((p,i)=>({
      fieldName: p,
      fieldType: ft,
      isRequired: !!required.value,  
      fieldOrder: i + 1,
      options: ft === 'SELECT' ? ['예','아니오'] : [],
      minLength: +minLen.value || 0,
      maxLength: +maxLen.value || 0,
    }))

    if (!fields.length) { err.value='최소 하나 이상의 필드가 필요합니다.'; return }

    const body = {
      fields,
      detail: {
        templateId,
        startDate: startDateIso,
        endDate: endDateIso
      }
    }


    console.log('REQ start/end', startDate.value, startTime.value, startDateIso, endDate.value, endTime.value, endDateIso)
    await api.post('/companyTemplates/detail', body, { headers: { 'X-Company-Slug': companySlug } })

    const to = { name: 'CompanyDashboard', params: { companySlug } }
    const hasRoute = router.resolve(to).matched.length > 0
    if (!hasRoute) {
      
      throw new Error('라우트 "CompanyPostList" 가 없습니다')
    }

    if (router.hasRoute && router.hasRoute('CompanyDashboard')) {
      await router.push({ name: 'CompanyDashboard', params: { companySlug } })
    } else if (router.hasRoute && router.hasRoute('CompanyPostList')) {
      await router.push({ name: 'CompanyDashboard', params: { companySlug } })
    } else {
      await router.push({ path: `/c/${companySlug}/dashboard` })
    }
    
    ok.value = true
  } catch (e) {
    err.value = e?.message || e?.response?.data?.message || String(e)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.fade-slide-enter-active,.fade-slide-leave-active{ transition: opacity .2s cubic-bezier(.22,.61,.36,1), transform .2s cubic-bezier(.22,.61,.36,1); will-change: transform, opacity;}
.fade-slide-enter-from{ opacity:0; transform:translateX(-6px)}
.fade-slide-leave-to{ opacity:0; transform:translateX(-6px)}
</style>
