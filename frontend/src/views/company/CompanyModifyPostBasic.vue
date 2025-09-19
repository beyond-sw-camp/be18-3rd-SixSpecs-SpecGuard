<template>
    <div class="w-full grid grid-cols-12 gap-6">
        <section class="col-span-12">
        <!-- 필터 -->
        <div class="grid grid-cols-12 gap-4 items-end">
            <div class="col-span-12 sm:col-span-3">
            <label class="block text-sm font-bold mb-1">부서</label>
            <input v-model="form.department" class="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="부서 명을 입력하십시오."/>

            <!-- <div class="flex items-center gap-2">
                <select v-model="form.department" class="w-full rounded-md border border-slate-300 px-3 py-2">
                <option value="" disabled>선택</option>
                <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
                </select>
                <svg class="w-5 h-5 -ml-7 pointer-events-none opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
            </div> -->
            </div>

            <div class="col-span-12 sm:col-span-3">
            <label class="block text-sm font-bold mb-1">직무</label>
            <input v-model="form.role" class="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="직무 명을 입력하십시오."/>
            <!-- <div class="flex items-center gap-2">
                <select v-model="form.role" class="w-full rounded-md border border-slate-300 px-3 py-2">
                <option value="" disabled>선택</option>
                <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
                </select>
                <svg class="w-5 h-5 -ml-7 pointer-events-none opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
            </div> -->
            </div>

            <div class="col-span-12 sm:col-span-2">
            <label class="block text-sm font-bold mb-1">신입/경력</label>
            <div class="flex items-center gap-2">
                <select v-model="form.careerType" class="w-full rounded-md border border-slate-300 px-3 py-2">
                <option value="" disabled>선택</option>
                <option>신입</option>
                <option>경력</option>
                </select>
                <svg class="w-5 h-5 -ml-7 pointer-events-none opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
            </div>
            </div>

            <div class="col-span-12 sm:col-span-1">
            <label class="block text-sm font-bold mb-1">년차</label>
            <input type="number" min="0" v-model.number="form.years" class="w-full rounded-md border border-slate-300 px-3 py-2"/>
            </div>
        </div>

        <!-- 본문 -->
        <div class="mt-6 grid grid-cols-12 gap-6">
            <div class="col-span-12 md:col-span-3">
            <div class="space-y-3">
                <div>
                <div class="text-sm font-bold mb-1">제목</div>
                <input v-model="form.title" class="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="채용 공고 명을 입력하십시오."/>
                </div>
                <div>
                <div class="text-sm font-bold mb-1">설명</div>
                <textarea v-model="form.description" rows="12" class="w-full rounded-md border border-slate-300 px-3 py-2 resize-none"></textarea>
                </div>
            </div>
            </div>

            <div class="col-span-12 md:col-span-3">
            <div class="text-sm font-bold mb-2">분야</div>
            <div class="relative mb-3">
                <input v-model.trim="categoryQuery" class="w-full h-9 rounded-full bg-slate-200/70 px-4 pr-12 text-sm outline-none"/>
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">검색</span>
            </div>
            <div class="rounded-xl border border-slate-300 p-3">
                <div class="mt-3 rounded-2xl bg-white px-4 py-3 max-h-80 overflow-auto space-y-3">
                <button v-for="c in filteredCategories" :key="c" @click="toggleChip('category', c)"
                        class="w-full py-2 rounded-full border text-center"
                        :class="selected.category.has(c) ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 border-transparent'">
                    {{ c }}
                </button>
                </div>
            </div>
            </div>

            <div class="col-span-12 md:col-span-3">
            <div class="text-sm font-bold mb-2">직무 세부</div>
            <div class="relative mb-3">
                <input v-model.trim="roleQuery" class="w-full h-9 rounded-full bg-slate-200/70 px-4 pr-12 text-sm outline-none"/>
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">검색</span>
            </div>
            <div class="rounded-xl border border-slate-300 p-3">
                <div class="mt-3 rounded-2xl bg-white px-4 py-3 max-h-80 overflow-auto space-y-3">
                <button v-for="t in filteredRoleTags" :key="t" @click="toggleChip('role', t)"
                        class="w-full py-2 rounded-full border text-center"
                        :class="selected.role.has(t) ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 border-transparent'">
                    {{ t }}
                </button>
                </div>
            </div>
            </div>

            <div class="col-span-12 md:col-span-3">
            <div class="rounded-2xl bg-white p-5 shadow-sm sticky top-20">
                <div class="text-2xl font-extrabold mb-4">기본정보 요약</div>
                <div class="space-y-2 text-lg">
                <div>{{ preview.title }}</div>
                <div>{{ preview.department || '○○팀' }}</div>
                <div>{{ preview.role || '○○○○직무' }}</div>
                <div>{{ preview.years }}년차</div>
                </div>
                <div class="mt-6 flex gap-2">
                    <button
                        class="w-1/2 rounded-md bg-slate-200 px-5 py-2 font-semibold text-slate-900 hover:bg-slate-300"
                        @click="onCancel"
                    >취소</button>
                    <button
                        class="w-1/2 rounded-md bg-slate-900 px-5 py-2 font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                        :disabled="saving"
                        @click="saveAndNext"
                    >다음</button>
                    </div>
                    <p v-if="err" class="text-rose-600 text-sm mt-2">오류: {{ err }}</p>
                </div>
            </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios'

// 쉘 라우트 파라미터
const route = useRoute()
const router = useRouter()
const companySlug = route.params.companySlug
const companyTemplateId = route.params.companyTemplateId

// 생성 페이지와 동일한 폼 모델 유지
const form = reactive({
  department: '',
  role: '',
  careerType: '',   // '신입' | '경력'
  years: 0,
  title: '',
  description: ''
})

const loading = ref(false)
const saving  = ref(false)
const err     = ref('')

const canSubmit = computed(() => !!form.title && !saving.value)

const mode = ref('edit')                 // 기존이 'create'였다면 여기서는 'edit'
const step = ref(1)                      // 생성 템플릿이 step===1일 때 기본정보 섹션 노출
const currentTab = ref('basic')          // 탭 기반이면 'basic'으로 고정 시작
const isCreate = ref(false)
const isEdit = ref(true)

function toggleChip(kind,v){
  const set = selected[kind]; set.has(v)?set.delete(v):set.add(v)
  if (kind==='category' || kind==='role') form.role = [...selected[kind]][0] || form.role
}
const preview = computed(()=>({ title: form.title||'(제목 없음)', department: form.department, role: form.role, years: form.years||0 }))





// 저장 버튼 핸들러(템플릿의 @click="saveAndNext")
async function saveAndNext(){
  await onSubmit()
}


// ① 최초 진입 시 기존 값 로드
onMounted(load)
async function load(){
  loading.value = true; err.value = ''
  try{
    const { data } = await api.get(`/companyTemplates/${companyTemplateId}`, {
      headers: { 'X-Company-Slug': companySlug },
      params: { companySlug }
    })
    const b = data.basic ?? data
    // 백엔드 -> 화면 폼 매핑
    form.title       = b.name ?? ''
    form.description = b.description ?? ''
    form.department  = b.department ?? ''
    form.role        = b.category ?? ''
    form.years       = Number(b.yearsOfExperience ?? 0)
    form.careerType  = form.years > 0 ? '경력' : '신입'
    // 선택칩 초기화(선택)
    if (form.role) selected.role = new Set([form.role])
  }catch(e){
    err.value = e.response?.data?.message || e.message || '로드 실패'
  }finally{
    loading.value = false
  }
}

// ② 제출 핸들러: 생성 페이지와 동일한 버튼에서 호출
async function onSubmit () {
  if (!canSubmit.value) { err.value = '제목은 필수입니다.'; return }
  saving.value = true; err.value = ''
  try {
    await api.put(`/companyTemplates/${companyTemplateId}/basic`, {
      name: form.title,
      description: form.description,
      department: form.department,
      category: form.role,
      yearsOfExperience: Number(form.years || 0)
    }, {
      headers: { 'X-Company-Slug': companySlug },
      params: { companySlug }
    })
    router.push({ name: 'CompanyTemplateDetail', params: { companySlug, companyTemplateId } })
  } catch (e) {
    err.value = e.response?.data?.message || e.message || '저장 실패'
  } finally {
    saving.value = false
  }
}

// ③ 취소 버튼은 생성 페이지와 동일한 위치에서 이 함수만 연결
function onCancel () {
  router.push({ name: 'CompanyDashboard', params: { companySlug } })
}
</script>
