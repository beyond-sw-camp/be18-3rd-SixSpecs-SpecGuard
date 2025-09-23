<!-- ResumeEssay.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
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
                * {{ q.fieldName }}
                <span v-if="q.fieldType === 'TEXT'" class="ml-1 text-xs text-slate-500"></span>
                </label>

                <div class="mt-2 relative">
                <!-- TEXT -->
                <textarea
                    v-if="q.fieldType === 'TEXT'"
                    v-model="answers[q.id].answer"
                    :rows="7"
                    :maxlength="q.maxLength"
                    class="w-full rounded-md border border-slate-300 px-3 py-2"
                    :placeholder="q.placeholder || '내용을 입력하세요'"
                    @input="onDirty()"
                />
                <div
                    v-if="q.fieldType === 'TEXT'"
                    class="absolute bottom-2 right-3 text-xs"
                    :class="validLen(q) ? 'text-slate-500' : 'text-rose-600'">
                    {{ (answers[q.id] || '').answer.length }}/{{ q.maxLength }}
                </div>
                <p v-if="q.fieldType === 'TEXT' && !validLen(q)" class="mt-1 text-xs text-rose-600">
                    최소 {{ q.minLength }}자 이상 입력하세요.
                </p>

                <!-- NUMBER -->
                <input
                v-else-if="q.fieldType === 'NUMBER'"
                type="number"
                v-model="answers[q.id].answer"
                class="w-full rounded-md border border-slate-300 px-3 py-2"
                @input="onDirty()"
                />

                <!-- DATE -->
                <input
                v-else-if="q.fieldType === 'DATE'"
                type="date"
                v-model="answers[q.id].answer"
                class="w-full rounded-md border border-slate-300 px-3 py-2"
                @input="onDirty()"
                />

                <!-- SELECT -->
                <select
                v-else-if="q.fieldType === 'SELECT'"
                v-model="answers[q.id].answer"
                class="w-full rounded-md border border-slate-300 px-3 py-2"
                @change="onDirty()"
                >
                <option disabled value="">선택하세요</option>
                <option
                    v-for="opt in JSON.parse(q.options || '[]')"
                    :key="opt"
                    :value="opt"
                >
                    {{ opt }}
                </option>
                </select>

                </div>
            </div>
            </div>
        </section>
        </main>

        <!-- Sticky Footer -->
        <footer class="sticky bottom-0 bg-white border-t">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
            <button type="button" class="rounded-md border px-5 py-2"
                    :disabled="saving" @click="save">
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
import { useResumeStore } from '@/stores/resumeStore'
import applicantApi from '@/api/applicantApi';
    
const resumeStore = useResumeStore();
const router = useRouter()
const route = useRoute()
const applicantSlug = route.params.applicantSlug

// 상태
const loading = ref(true)
const saving = ref(false)
const dirty = ref(false)
const questions = ref([])          // [{id,title,min,max,placeholder}]
const answers = ref({})            // { [id]: string }

async function fetchQuestions() {
    loading.value = true
    try {
        await resumeStore.fetchResumeAndTemplate();
    console.log("Resume store in essay info:", resumeStore.resume);
    const data = resumeStore.resume;
    
    // fieldOrder 기준 정렬
    const sortedFields = [...data.fields].sort((a, b) => a.fieldOrder - b.fieldOrder);
    questions.value = sortedFields;

    // 초기값 세팅
    const initialAnswers = {};
    sortedFields.forEach(field => {
        const response = data.templateResponses.find(r => r.fieldId === field.id);
        initialAnswers[field.id] = {
            id: response?.id || null,
            answer: response?.answer || '',
        }
    });
        answers.value = initialAnswers;
        
        dirty.value = false
    }
    catch (error) {
            console.log(error);
            return;
    }
    finally {
        loading.value = false
    }
}

onMounted(fetchQuestions)

function validLen(field) {
    const value = answers.value[field.id]?.answer || ''

    switch (field.fieldType) {
    case 'TEXT':
        const len = value.trim().length
        return len >= (field.minLength || 0) && len <= (field.maxLength || Infinity)

    case 'NUMBER':
        const num = Number(value)
        if (isNaN(num)) return false
        if (field.minLength != null && num < field.minLength) return false
        if (field.maxLength != null && num > field.maxLength) return false
        return true

    case 'DATE':
        return !isNaN(Date.parse(value))

    case 'SELECT':
        try {
            const options = JSON.parse(field.options || '[]')
            return options.includes(value)
        } catch {
            return false
        }

    default:
        return true
    }
}

const allValid = computed(() =>
    questions.value.length > 0 && questions.value.every(validLen)
)

function onDirty() { dirty.value = true }

async function save() {
    if (!allValid.value) { alert('모든 질문에 조건을 충족하세요.'); return false}

    if (!dirty.value) {
        return true;
    }
    
    saving.value = true
    
    
    const payload = {
        responses: Object.entries(answers.value).map(([fieldId, { answer, id }]) => ({
            id: id || null,         // 기존 답변이 있으면 id 포함, 없으면 null
            fieldId: fieldId,       // 필드 ID
            answer: answer || ""    // null일 경우 빈 문자열로
        }))
    }
    try {
        const res = await applicantApi.post(`/resumes/template-responses`, payload);
        
        console.log("templateResponse info saved:", res.data);
        // 저장된 기본정보를 store에 반영
        resumeStore.resume.templateResponses = res.data.responses;
        
        console.log("Resume store updated:", resumeStore.resume);
        dirty.value = false
        alert('저장 완료했습니다.')
        return true;
    }
    catch (error) {
        alert(error)
        console.error("Error :", error);
        return false;
    }
    finally {
        saving.value = false
    }
}

async function goNext() {
    const success = await save();
    if (success) {
        router.push({ name: 'ResumeSubmit', params: { applicantSlug } });
    }
}

defineExpose({ save })
</script>

<style scoped>
/* main 하단 footer와 겹침 방지용: main에 pb-28 적용함 */
</style>
