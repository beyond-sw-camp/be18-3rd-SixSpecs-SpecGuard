<template>
  <div class="w-full grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-9">
      <div class="flex items-center gap-3 mb-4">
        <div class="flex-1">
          <div class="h-10 rounded-full bg-slate-100 flex items-center px-4 gap-2">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 5a6 6 0 100 12 6 6 0 000-12z"/>
            </svg>
            <input v-model.trim="query" placeholder="프로필/공고 검색" class="bg-transparent outline-none w-full text-sm" />
          </div>
        </div>
      </div>

      <p class="mb-6 font-semibold">
        총 <span class="text-rose-500">{{ filteredProfiles.length }}</span>건의 가중치 프로필이 있습니다.
      </p>

      <section class="space-y-6">
        <article
          v-for="p in filteredProfiles"
          :key="p.id"
          class="rounded-2xl border border-slate-200 shadow-sm cursor-pointer"
          @click="goEdit(p)"
        >
          <div class="flex items-start justify-between p-6">
            <div class="flex items-start gap-4">
              <div class="mt-1 text-slate-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-extrabold">
                  <button class="hover:underline" @click.stop="goEdit(p)">
                    {{ p.templateTitle || p.name || '(제목 없음)' }}
                  </button>
                </h3>
                <p v-if="p.description" class="mt-2 text-slate-600">{{ p.description }}</p>
                <div class="mt-3">
                  <button class="rounded-md bg-slate-100 px-3 py-1 text-sm" @click.stop="goEdit(p)">
                    가중치 수정
                  </button>
                </div>
              </div>
            </div>

            <div class="pr-4 pt-1 text-right text-sm text-slate-500">
              <div>생성: {{ toDate(p.createdAt) }}</div>
              <div>수정: {{ toDate(p.updatedAt) }}</div>
            </div>
          </div>
        </article>

        <div v-if="loading" class="text-sm text-slate-500 px-2">불러오는 중…</div>
        <div v-if="error" class="text-sm text-rose-600 px-2">오류: {{ error }}</div>
      </section>
    </div>

    <aside class="col-span-12 lg:col-span-3 border-l border-slate-200 pl-6 pr-4">
      <div class="sticky top-20 space-y-6">
        <div class="rounded-2xl border border-slate-200 p-6">
          <h4 class="text-xl font-extrabold mb-4">활성</h4>
          <select v-model="onlyActive" class="w-full rounded-lg border-slate-300 text-sm">
            <option :value="''">전체</option>
            <option :value="'Y'">활성만</option>
            <option :value="'N'">비활성만</option>
          </select>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios'

const props = defineProps({ companySlug: { type: String, required: false } })
const route = useRoute()
const router = useRouter()
const companySlug = props.companySlug || route.params.companySlug

const query = ref('')
const onlyActive = ref('')
const loading = ref(false)
const error = ref('')

const profiles = ref([])

// ---- 공통: 여러 경로를 순차 시도하는 GET 헬퍼
async function tryGet(paths, config = {}) {
  let lastErr
  for (const p of paths) {
    try {
      const res = await api.get(p, { ...config, _skipGlobalError: true, validateStatus: () => true })
      if (res.status >= 200 && res.status < 300) return res
      lastErr = res
    } catch (e) {
      lastErr = e
    }
  }
  throw lastErr
}

// 목록 조회
async function fetchProfiles () {
  loading.value = true
  error.value = ''
  try {
    const isActiveParam =
      onlyActive.value === 'Y' ? 'true' :
      onlyActive.value === 'N' ? 'false' : undefined  // 서버가 isActive를 필수로 안 받으면 생략

    const params = { page: 0, size: 50, sort: 'createdAt,DESC' }
    if (typeof isActiveParam !== 'undefined') params.isActive = isActiveParam

    // ✅ 후보 경로들: 카멜/케밥, 단·복수, 슬래시 유무
    const CANDIDATES = [
      '/evaluationProfiles',
      '/evaluationProfiles/',
      '/evaluation-profile',
      '/evaluation-profiles',
    ]

    const res = await tryGet(CANDIDATES, { params })
    const data = res.data ?? {}

    // 응답 형태 유연 파싱
    let list = []
    if (Array.isArray(data.evaluationProfiles)) list = data.evaluationProfiles
    else if (Array.isArray(data.content))        list = data.content
    else {
      const firstArr = Object.values(data).find(v => Array.isArray(v))
      if (Array.isArray(firstArr)) list = firstArr
    }

    profiles.value = list.map(p => ({
      id: p.id,
      name: p.name ?? '',
      description: p.description ?? '',
      isActive: !!p.isActive,
      companyTemplateId:
        p.companyTemplateId ?? p.templateId ?? p.companyTemplate?.id ?? p.template?.id ?? null,
      templateTitle:
        p.companyTemplate?.name ?? p.templateName ?? p.template?.name ?? null,
      weights: Array.isArray(p.weights) ? p.weights : [],
      createdAt: p.createdAt ?? null,
      updatedAt: p.updatedAt ?? null,
    }))
  } catch (e) {
    const res = e?.response || e // tryGet이 던진 마지막
    console.error('[profiles list] failed', res?.status || '', res?.data || e?.message)
    error.value = res?.data?.message || e?.message || '목록 조회 실패'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProfiles)
watch(onlyActive, fetchProfiles)

// 검색 필터
const norm = s => (s ?? '').toString().trim().toLowerCase()
const filteredProfiles = computed(() => {
  const q = norm(query.value)
  const flt = onlyActive.value
  return profiles.value.filter(p => {
    const t = norm(p.templateTitle || '')
    const n = norm(p.name || '')
    const matchQ = !q || t.includes(q) || n.includes(q) || (p.companyTemplateId || '').toString().includes(q)
    const matchActive = !flt || (flt === 'Y' && p.isActive) || (flt === 'N' && !p.isActive)
    return matchQ && matchActive
  })
})

function toDate(iso) {
  if (!iso) return '-'
  const d = new Date(iso)
  if (isNaN(d)) return '-'
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

// 수정 화면 진입
async function goEdit(p) {
  if (!p?.id) return alert('profileId가 없습니다.')

  // 템플릿 id 없으면 단건조회로 보강 (후보 경로 순차 시도)
  let templateId = p.companyTemplateId ?? null
  if (!templateId) {
    try {
      const detailPaths = [
        `/evaluationProfiles/${p.id}`,
        `/evaluationProfiles/${p.id}/`,
        `/evaluation-profile/${p.id}`,
        `/evaluation-profiles/${p.id}`,
      ]
      const res = await tryGet(detailPaths)
      const d = res.data || {}
      templateId =
        d.companyTemplateId ?? d.templateId ?? d.companyTemplate?.id ?? d.template?.id ?? null
    } catch (e) {
      // 무시하고 아래에서 경고
    }
  }

  if (!templateId) {
    alert('이 프로필에 연결된 템플릿 ID를 찾을 수 없습니다.')
    return
    // 필요하면 여기서 템플릿 선택 모달을 띄워 사용자가 직접 선택하도록 처리 가능
  }

  router.push({
    name: 'CompanyEditEvaluationWeight',
    params: {
      companySlug: String(companySlug),
      companyTemplateId: String(templateId),
      profileId: String(p.id),
    },
  })
}
</script>
