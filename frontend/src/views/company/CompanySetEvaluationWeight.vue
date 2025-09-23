<!-- src/views/company/WeightSetting.vue -->
<template>
  <div class="min-h-screen bg-white text-slate-900">
    <div class="mx-auto max-w-10xl grid grid-cols-12 gap-6 pl-4 sm:pl-6 lg:pl-8 pr-4 py-6">
      <main class="col-span-12">
        <div class="border-2 border-sky-500 rounded-xl p-6">
          <!-- 헤더 -->
          <div class="flex items-start justify-between">
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {{ companyTemplateName || '가중치 설정' }}
            </h1>
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold">
                현재 합계: {{ total.toFixed(2) }}
              </div>
              <div class="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold">
                남은 비율: {{ remain.toFixed(2) }}
              </div>
            </div>
          </div>

          <!-- 프로필 메타(이름/설명) -->
          <div class="mt-8 rounded-2xl border border-slate-300 bg-white shadow-sm p-5">
            <label class="block text-sm font-semibold mb-1">프로필 이름</label>
            <input
              v-model="profileName"
              class="w-full rounded-lg border px-3 py-2 mb-4"
              placeholder="예) 신입 개발자 기본 프로필" />

            <label class="block text-sm font-semibold mb-1">설명 (선택)</label>
            <textarea
              v-model="profileDesc"
              class="w-full rounded-lg border px-3 py-2"
              rows="3"
              placeholder="설명 입력 (선택)"></textarea>

            <p v-if="Math.abs(total-1) > 0.0001" class="text-rose-600 text-sm mt-2">
              가중치 총합이 1이 아닙니다. (현재 {{ total.toFixed(3) }})
            </p>
          </div>

          <!-- 섹션/슬라이더 -->
          <section v-for="sec in orderedSections" :key="sec.key"
                   class="mt-6 rounded-2xl border border-slate-300 bg-white shadow-sm">
            <div class="p-5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">•</span>
                  <h2 class="text-2xl font-extrabold">{{ sec.title }}</h2>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- left -->
                <div class="space-y-5">
                  <div v-for="m in sec.left" :key="m.key" class="flex items-center gap-4">
                    <div class="w-28 shrink-0 text-sm">
                      <span class="inline-block w-2 h-2 bg-slate-700 mr-2"></span>{{ m.label }}
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.001"
                      :value="m.v"
                      @input="onFreeSlide(m, $event)"
                      class="w-full accent-slate-800" />
                    <div class="w-14 text-right text-sm">{{ m.v.toFixed(3) }}</div>
                  </div>
                </div>
                <!-- right -->
                <div class="space-y-5">
                  <div v-for="m in sec.right" :key="m.key" class="flex items-center gap-4">
                    <div class="w-32 shrink-0 text-sm">
                      <span class="inline-block w-2 h-2 bg-slate-700 mr-2"></span>{{ m.label }}
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.001"
                      :value="m.v"
                      @input="onFreeSlide(m, $event)"
                      class="w-full accent-slate-800" />
                    <div class="w-14 text-right text-sm">{{ m.v.toFixed(3) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 하단 버튼 (이전 '전체 저장' 자리) -->
          <div class="flex justify-end mt-8 gap-3">
            <!-- 생성: 기존 없음 -->
            <button
              v-if="!hasExistingProfile"
              class="rounded-xl bg-slate-900 px-5 py-2 text-white font-semibold hover:bg-slate-800 disabled:opacity-50"
              :disabled="isSubmitting || Math.abs(total-1) > 0.0001 || resolving"
              @click="createProfile">
              프로필 생성
            </button>

            <!-- 수정: 기존 있음 -->
            <button
              v-else
              class="rounded-xl bg-amber-600 px-5 py-2 text-white font-semibold hover:bg-amber-500 disabled:opacity-50"
              :disabled="isSubmitting || Math.abs(total-1) > 0.0001"
              @click="updateProfile">
              프로필 업데이트
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/axios'

/* -------------------- 라우트/유틸 -------------------- */
const route = useRoute()
const norm = (v) => (v === undefined || v === null || v === '' || v === 'undefined' || v === 'null') ? '' : String(v)

const companySlug = norm(route.params.companySlug)
const postSlug = norm(route.params.postSlug)
const companyTemplateId = ref(norm(route.params.companyTemplateId))
const currentProfileId = ref(norm(route.params.profileId))     // 편집 대상 id (없으면 '')
const hasExistingProfile = computed(() => !!currentProfileId.value)

/* -------------------- 상태 -------------------- */
const companyTemplateName = ref('')
const isSubmitting = ref(false)
const resolving = ref(false)   // 기존 프로필 탐색 중 플래그
const profileName = ref('')
const profileDesc = ref('')

/* -------------------- 매핑 -------------------- */
const UI_TO_ENUM = {
  repoCount: 'GITHUB_REPO_COUNT',
  commitFreq: 'GITHUB_COMMIT_COUNT',
  topicMatch: 'GITHUB_TOPIC_MATCH',
  wordMatch: 'GITHUB_KEYWORD_MATCH',
  skillMatch: 'NOTION_KEYWORD_MATCH',
  postCount: 'VELOG_POST_COUNT',
  recentAct: 'VELOG_RECENT_ACTIVITY',
  velogSkillMatch: 'VELOG_KEYWORD_MATCH',
  certFit: 'CERTIFICATE_MATCH',
}
const ENUM_TO_UI = {
  GITHUB_REPO_COUNT: 'repoCount',
  GITHUB_COMMIT_COUNT: 'commitFreq',
  GITHUB_TOPIC_MATCH: 'topicMatch',
  GITHUB_KEYWORD_MATCH: 'wordMatch',
  NOTION_KEYWORD_MATCH: 'skillMatch',
  VELOG_POST_COUNT: 'postCount',
  VELOG_RECENT_ACTIVITY: 'recentAct',
  VELOG_KEYWORD_MATCH: 'velogSkillMatch',
  CERTIFICATE_MATCH: 'certFit',
}

/* -------------------- 초기 진입 -------------------- */
onMounted(async () => {
  try {
    const r1 = await api.get(`/company-template/${companyTemplateId.value}`, {
      headers: { 'X-Company-Slug': companySlug }
    })
    companyTemplateName.value = r1?.data?.title ?? ''
  } catch (e) {
    console.warn('[title load failed]', e)
  }
  await resolveExistingProfile()
})

/* 동일 컴포넌트 재사용 시 대응 */
watch(() => route.fullPath, async () => {
  companyTemplateId.value = norm(route.params.companyTemplateId)
  currentProfileId.value = norm(route.params.profileId)
  await resolveExistingProfile()
})

/* -------------------- 섹션/가중치 -------------------- */
const sections = reactive({
  github: {
    key: 'github',
    title: 'GitHub (개발활동)',
    left: [
      { key: 'repoCount', label: 'Repo 수', v: 0.10 },
      { key: 'commitFreq', label: 'Commit 빈도', v: 0.10 },
    ],
    right: [
      { key: 'topicMatch', label: 'Topic 매칭', v: 0.10 },
      { key: 'wordMatch',  label: '기술 키워드 매칭', v: 0.10 },
    ],
  },
  notion: {
    key: 'notion',
    title: 'Notion(프로젝트 문서)',
    left: [
      { key: 'skillMatch', label: '기술 키워드 매칭', v: 0.10 },
    ],
    right: [],
  },
  velog: {
    key: 'velog',
    title: 'Velog (기술 블로그)',
    left: [
      { key: 'postCount', label: '게시글 수', v: 0.10 },
      { key: 'recentAct', label: '최신 활동', v: 0.10 },
    ],
    right: [
      { key: 'velogSkillMatch', label: '기술 키워드 매칭', v: 0.10 },
    ],
  },
  basic: {
    key: 'basic',
    title: '자격증 정보',
    left: [
      { key: 'certFit', label: '자격증 정합성', v: 0.20 },
    ],
    right: [],
  },
})
const orderedSections = computed(() => [sections.github, sections.notion, sections.velog, sections.basic])
const allMetrics = computed(() => orderedSections.value.flatMap(s => [...s.left, ...s.right]))
const total = computed(() => {
  const sum = allMetrics.value.reduce((acc, m) => acc + (Number.isFinite(m.v) ? m.v : 0), 0)
  return Number.isFinite(sum) ? sum : 0
})
const remain = computed(() => Math.max(0, 1 - total.value))

function onFreeSlide (metric, evt) {
  const next = Number(evt.target.value)
  const others = total.value - metric.v
  const cap = Math.max(0, 1 - others)
  const newVal = Math.min(next, cap)
  metric.v = Number(newVal.toFixed(3))
  evt.target.value = metric.v
}

function buildWeightsPayload () {
  const list = []
  for (const sec of orderedSections.value) {
    for (const m of [...sec.left, ...sec.right]) {
      const enumName = (m.key === 'velogSkillMatch') ? UI_TO_ENUM['velogSkillMatch'] : UI_TO_ENUM[m.key]
      if (!enumName) continue
      list.push({ weightType: enumName, weightValue: Number(m.v ?? 0) })
    }
  }
  return list
}

/* -------------------- 프로필 조회/판별 -------------------- */
/** 다양한 서버 구현을 고려해 여러 엔드포인트를 순차 시도 */
async function tryFetchProfilesByTemplate () {
  const headers = { 'X-Company-Slug': companySlug }
  const id = String(companyTemplateId.value)

  // 1) 쿼리 파라미터 방식 (페이지 or 배열)
  try {
    const { data } = await api.get('/evaluationProfiles', {
      headers, params: { companyTemplateId: id, size: 1, page: 0 }
    })
    const list = Array.isArray(data) ? data : (data?.content ?? data?.items ?? [])
    if (Array.isArray(list) && list.length > 0) return list
  } catch (e) { console.warn('[profiles qparam] miss', e?.response?.status) }

  // 2) 템플릿 경로 방식 A
  try {
    const { data } = await api.get(`/evaluationProfiles/${id}`, { headers })
    const list = Array.isArray(data) ? data : (data?.content ?? data?.items ?? [])
    if (Array.isArray(list) && list.length > 0) return list
  } catch (e) { console.warn('[profiles by-template] miss', e?.response?.status) }
  return []
}

async function resolveExistingProfile () {
  if (!companyTemplateId.value) {
    console.warn('[resolve] no companyTemplateId')
    currentProfileId.value = ''
    return
  }
  resolving.value = true
  try {
    // URL에 profileId 있으면 바로 수정 모드
    if (currentProfileId.value) {
      await loadProfile(currentProfileId.value)
      return
    }
    // 템플릿 기준 조회
    const list = await tryFetchProfilesByTemplate()
    if (list.length > 0) {
      currentProfileId.value = list[0].id || list[0].profileId || ''
      if (currentProfileId.value) await loadProfile(currentProfileId.value)
      else currentProfileId.value = ''
    } else {
      currentProfileId.value = ''
    }
  } catch (e) {
    console.warn('[resolveExistingProfile] fail → 생성 모드', e)
    currentProfileId.value = ''
  } finally {
    resolving.value = false
  }
}

async function loadProfile (pid) {
  if (!pid) return
  try {
    const { data } = await api.get(`/evaluationProfiles/${pid}`, {
      headers: { 'X-Company-Slug': companySlug },
    })
    profileName.value = data?.name ?? ''
    profileDesc.value = data?.description ?? ''

    const setV = (uiKey, val) => {
      for (const sec of orderedSections.value) {
        for (const m of [...sec.left, ...sec.right]) {
          if (m.key === uiKey) { m.v = Number((val ?? 0).toFixed(3)); return }
        }
      }
    }
    for (const w of (data?.weights ?? [])) {
      const uiKey = ENUM_TO_UI[w.weightType]
      if (uiKey) setV(uiKey, Number(w.weightValue))
    }
  } catch (e) {
    console.error('[loadProfile failed]', e?.response?.status, e?.response?.data)
  }
}

/* -------------------- 생성/수정 -------------------- */
async function createProfile () {
  if (!profileName.value.trim()) return alert('프로필 이름을 입력하세요.')
  if (Math.abs(total.value - 1) > 0.0001) return alert('가중치 총합이 1이 되도록 조정하세요.')

  const payload = {
    name: profileName.value.trim(),
    description: profileDesc.value.trim() || undefined,
    companyTemplateId: String(companyTemplateId.value),
    weights: buildWeightsPayload(),
  }

  try {
    isSubmitting.value = true
    const res = await api.post('/evaluationProfiles/', payload, {
      headers: { 'X-Company-Slug': companySlug },
    })
    alert('가중치 프로필이 생성되었습니다.')
    currentProfileId.value = res?.data?.id || res?.data?.profileId || ''
    if (currentProfileId.value) await loadProfile(currentProfileId.value)
  } catch (e) {
    const status = e?.response?.status
    // ✅ 이미 존재(중복) → 수정 모드로 전환 시도
    if (status === 409 || status === 400 || status === 422) {
      const existedId = e?.response?.data?.existingId || e?.response?.data?.id || ''
      if (existedId) {
        currentProfileId.value = existedId
        await loadProfile(existedId)
        alert('이미 존재하는 프로필이 있어, 수정 모드로 전환합니다.')
        return
      }
      // 기존 목록 재탐색
      await resolveExistingProfile()
      if (hasExistingProfile.value) {
        alert('이미 존재하는 프로필이 있어, 수정 모드로 전환합니다.')
        return
      }
    }
    console.error('[createProfile failed]', status, e?.response?.data)
    alert(e?.response?.data?.message ?? '생성 실패')
  } finally {
    isSubmitting.value = false
  }
}

async function updateProfile () {
  if (!hasExistingProfile.value || !currentProfileId.value) {
    return alert('수정할 프로필이 없습니다.')
  }
  if (!profileName.value.trim()) return alert('프로필 이름을 입력하세요.')
  if (Math.abs(total.value - 1) > 0.0001) return alert('가중치 총합이 1이 되도록 조정하세요.')

  const payload = {
    name: profileName.value.trim(),
    description: profileDesc.value.trim() || undefined,
    companyTemplateId: String(companyTemplateId.value),
    weights: buildWeightsPayload(),
  }

  try {
    isSubmitting.value = true
    await api.put(`/evaluationProfiles/${currentProfileId.value}`, payload, {
      headers: { 'X-Company-Slug': companySlug },
    })
    alert('프로필이 업데이트되었습니다.')
  } catch (e) {
    console.error('[updateProfile failed]', e?.response?.status, e?.response?.data)
    alert(e?.response?.data?.message ?? '업데이트 실패')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active{
  transition: opacity .2s cubic-bezier(.22,.61,.36,1), transform .2s cubic-bezier(.22,.61,.36,1);
  will-change: transform, opacity;
}
.fade-slide-enter-from{ opacity:0; transform:translateX(-6px) }
.fade-slide-leave-to{ opacity:0; transform:translateX(-6px) }
</style>
