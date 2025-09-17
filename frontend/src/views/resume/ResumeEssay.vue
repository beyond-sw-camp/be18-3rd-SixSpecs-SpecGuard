<!-- ResumeEssay.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <!-- Header + Tabs -->
        <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-center">
            <h1 class="text-lg sm:text-xl font-bold">
            [SIXSPEC] 2025 우수인재 경력 채용 (DATA Intelligence 사업개발 및 제안)
            </h1>
        </div>
        <div class="border-t border-slate-200 bg-white sticky top-0 z-30">
            <nav class="grid grid-cols-5 border-b text-sm font-semibold">
            <button
                v-for="tab in tabs"
                :key="tab.to"
                class="col-span-1 p-3 text-center border-b-4 hover:bg-slate-100"
                :class="isActive(tab.to) ? 'border-sky-600 text-sky-600 font-bold' : 'border-transparent'"
                @click="onTabClick(tab.to)"
            >
                {{ tab.label }}
            </button>
            </nav>
        </div>
        </header>

        <!-- Main -->
        <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-28">
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="border-b pb-3">
            <h2 class="font-bold">
                자기소개서 <span class="text-rose-500 text-xs align-top">* 필수항목</span>
            </h2>
            <p class="mt-2 text-sm text-slate-600">
                본인이 경험한 사실을 질문에 맞게 논리적으로 기술하십시오.
            </p>
            </header>

            <!-- 질문 렌더링 -->
            <div v-if="loading" class="py-10 text-center text-slate-500">로드 중…</div>
            <div v-else>
            <div v-for="q in questions" :key="q.id" class="mt-8">
                <label class="block text-sm font-semibold">
                * {{ q.title }}
                <span class="ml-1 text-xs text-slate-500">(최소 {{ q.min }}자 / 최대 {{ q.max }}자)</span>
                </label>
                <div class="mt-2 relative">
                <textarea
                    v-model="answers[q.id]"
                    :rows="7"
                    :maxlength="q.max"
                    class="w-full rounded-md border border-slate-300 px-3 py-2"
                    :placeholder="q.placeholder || '내용을 입력하세요'"
                    @input="onDirty()"
                />
                <div class="absolute bottom-2 right-3 text-xs"
                    :class="validLen(q) ? 'text-slate-500' : 'text-rose-600'">
                    {{ (answers[q.id] || '').length }}/{{ q.max }}
                </div>
                <p v-if="!validLen(q)" class="mt-1 text-xs text-rose-600">
                    최소 {{ q.min }}자 이상 입력하세요.
                </p>
                </div>
            </div>
            </div>
        </section>
        </main>

        <!-- Sticky Footer -->
        <footer class="sticky bottom-0 bg-white border-t">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
            <button type="button" class="rounded-md border px-5 py-2"
                    :disabled="saving" @click="saveDraft">
            {{ saving ? '저장 중' : '임시저장' }}
            </button>
            <button type="button" class="rounded-md bg-sky-600 px-6 py-2 text-white disabled:opacity-50"
                    :disabled="!allValid || saving" @click="goNext">
            다음
            </button>
        </div>
        </footer>
    </div>
    </template>

    <script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    const router = useRouter()
    const route = useRoute()
    const applicantSlug = route.params.applicantSlug

    // 탭
    const tabs = [
    { label: '1 기본정보', to: { name: 'ResumeBasicInfo', params: { applicantSlug }}},
    { label: '2 학력/연구/NCS', to: { name: 'ResumeAcademicInfo', params: { applicantSlug }}},
    { label: '3 어학/자격', to: { name: 'ResumeCertificateInfo', params: { applicantSlug }}},
    { label: '4 자기소개서/역량기술서', to: { name: 'ResumeEssay', params: { applicantSlug }}},
    { label: '5 최종제출', to: { name: 'ResumeSubmit', params: { applicantSlug }}},
    ]
    function isActive(to) {
    const a = router.resolve(to).path.replace(/\/+$/, '')
    const b = route.path.replace(/\/+$/, '')
    return a === b
    }

    // 상태
    const loading = ref(true)
    const saving = ref(false)
    const dirty = ref(false)
    const questions = ref([])          // [{id,title,min,max,placeholder}]
    const answers = ref({})            // { [id]: string }

    // API 가정: GET /api/v1/resumes/{applicantSlug}/essay/questions
    async function fetchQuestions() {
    loading.value = true
    try {
        // 실제 구현 시 fetch/axios 교체
        // const r = await fetch(`/api/v1/resumes/${applicantSlug}/essay/questions`)
        // const data = await r.json()
        // 데모 데이터
        const data = [
        { id: 'q1', title: '지원 동기와 기여 가능 부분', min: 200, max: 1000 },
        { id: 'q2', title: '최근 3년 내 최선의 결과를 만든 도전과 과정', min: 200, max: 1000 },
        { id: 'q3', title: '장단점과 업무에의 영향', min: 200, max: 1000 },
        ]
        questions.value = data
        // 기존 저장본 불러오기 가정: GET /answers
        // const saved = await (await fetch(`/api/v1/resumes/${applicantSlug}/essay/answers`)).json()
        const saved = {} // 데모
        // 초기화
        const init = {}
        for (const q of data) init[q.id] = saved[q.id] || ''
        answers.value = init
        dirty.value = false
    } finally {
        loading.value = false
    }
    }
    onMounted(fetchQuestions)

    function validLen(q) {
    const n = (answers.value[q.id] || '').trim().length
    return n >= q.min && n <= q.max
    }
    const allValid = computed(() =>
    questions.value.length > 0 && questions.value.every(validLen)
    )

    function onDirty() { dirty.value = true }

    async function saveDraft() {
    saving.value = true
    try {
        // POST /api/v1/resumes/{applicantSlug}/essay/answers (draft=true)
        // await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers:answers.value,draft:true})})
        dirty.value = false
        alert('임시저장 되었습니다.')
    } finally {
        saving.value = false
    }
    }

    async function goNext() {
    if (!allValid.value) { alert('모든 질문에 최소 글자수를 충족하세요.'); return }
    if (dirty.value) await saveDraft()
    router.push({ name: 'ResumeSubmit', params: { applicantSlug } })
    }

    async function onTabClick(to) {
    if (dirty.value && !confirm('변경사항이 저장되지 않았습니다. 이동하시겠습니까?')) return
    router.push(to)
    }
</script>

<style scoped>
/* main 하단 footer와 겹침 방지용: main에 pb-28 적용함 */
</style>
