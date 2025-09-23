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

                <p class="mt-1 text-slate-600">
                  <span class="rounded bg-slate-100 px-2 py-0.5 text-xs">Profile</span>
                  <span class="ml-2">{{ p.name || '-' }}</span>
                </p>

                <p v-if="p.description" class="mt-2 text-slate-600">{{ p.description }}</p>

                <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span class="rounded-md bg-slate-100 px-2 py-1">Template ID: {{ p.companyTemplateId }}</span>
                  <span class="rounded-md bg-slate-100 px-2 py-1">Weights: {{ (p.weights?.length || 0) }}개</span>
                  <span class="rounded-md bg-slate-100 px-2 py-1">활성: {{ p.isActive ? 'Y' : 'N' }}</span>
                </div>

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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios'

const route = useRoute()
const router = useRouter()
const companySlug = route.params.companySlug || ''

const query = ref('')
const onlyActive = ref('')
const loading = ref(false)
const error = ref('')

const profiles = ref([])

async function fetchProfiles () {
  loading.value = true; error.value = ''
  try {
    const { data } = await api.get('/evaluationProfiles', {
      // axios 인터셉터에서 X-Company-Slug를 이미 넣고 있으므로 이 headers는 생략 가능.
      // headers: { 'X-Company-Slug': companySlug },
      params: { page: 0, size: 100, sort: 'createdAt,DESC' },
      _skipGlobalError: true, // 전역 401 라우팅 방지(디버깅 시)
    })
    const list = Array.isArray(data?.evaluationProfiles)
      ? data.evaluationProfiles
      : (data?.content ?? [])

    profiles.value = list.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      isActive: p.isActive,
      companyTemplateId: p.companyTemplateId || p.templateId || p.companyTemplate?.id,
      templateTitle: p.companyTemplate?.name || p.templateName || null,
      weights: p.weights || [],
      createdAt: p.createdAt || null,
      updatedAt: p.updatedAt || null,
    }))
  } catch (e) {
    // 디버깅용 상세 로그
    console.error('[GET /evaluationProfiles failed]',
      e?.response?.status,
      e?.response?.data || e.message,
      { headers: e?.config?.headers, params: e?.config?.params }
    )
    error.value = e?.response?.data?.message || e.message || String(e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchProfiles)

const norm = s => (s ?? '').toString().trim().toLowerCase()

const filteredProfiles = computed(() => {
  const q = norm(query.value)
  const flt = onlyActive.value
  return profiles.value.filter(p => {
    const t = norm(p.templateTitle || '')
    const n = norm(p.name || '')
    const matchQ = !q || t.includes(q) || n.includes(q) ||
                   (p.companyTemplateId || '').toString().includes(q)
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

function goEdit(p) {
  if (!p.companyTemplateId || !p.id) {
    alert('필수 정보가 부족합니다. (companyTemplateId / profileId)')
    return
  }
  router.push({
    name: 'CompanySetEvaluationWeight',
    params: { companySlug, companyTemplateId: p.companyTemplateId, profileId: p.id },
  })
}
</script>
