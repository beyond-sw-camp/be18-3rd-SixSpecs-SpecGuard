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
                <div class="mt-6 space-y-2">
                <button class="w-full rounded-md bg-slate-900 px-5 py-2 font-semibold text-white hover:bg-slate-800"
                        :disabled="submitting" @click="saveAndNext">다음</button>
                <p v-if="err" class="text-rose-600 text-sm">오류: {{ err }}</p>
                </div>
            </div>
            </div>
        </div>
        </section>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createBasicTemplate } from '@/api/companyTemplate'

const router = useRouter()
const route = useRoute()
const companySlug = route.params.companySlug

const roleTags = ['프론트엔드 개발','백엔드 개발','데이터 분석','ERP','QA','네트워크 엔지니어','HR']
const categories = ['IT','미디어, 광고','판매, 유통','제조, 생산, 화학','금융, 은행','서비스','공공기관 / 공기업']

const roleQuery = ref('')
const categoryQuery = ref('')
const filteredRoleTags = computed(() => roleTags.filter(t => t.toLowerCase().includes(roleQuery.value.toLowerCase())))
const filteredCategories = computed(() => categories.filter(c => c.toLowerCase().includes(categoryQuery.value.toLowerCase())))

const form = reactive({
    title: '',
    description: '',
    department: '',
    role: '',
    careerType: '',
    years: 0
})

const selected = reactive({ category: new Set(), role: new Set() })
function toggleChip(type, v) { const s = selected[type]; s.has(v) ? s.delete(v) : s.add(v) }

const preview = computed(() => ({
    title: form.title || '주니어개발자 채용',
    department: form.department,
    role: form.role,
    years: Number.isFinite(form.years) ? form.years : 0
    }))

const err = ref('')
const submitting = ref(false)

async function saveAndNext() {
    err.value = ''
    if (!form.department || !form.role || !form.title) { err.value = '필수값 확인'; return }
    submitting.value = true
    try {
        // API 스키마 매핑
        const body = {
        name: form.title,
        description: form.description,
        department: form.department,
        category: [...selected.category][0] || form.role, // 임시 매핑
        yearsOfExperience: Number(form.years) || 0
        }
    
        const { data } = await createBasicTemplate(body)
        const templateId = data.id || data.templateId
        if (!templateId) throw new Error('templateId 없음')
        router.push({ name: 'CompanyCreatePostDetail', params: { companySlug, templateId } })
    } catch (e) {
        err.value = e.response?.data?.message || e.message || String(e)
    } finally {
        submitting.value = false
    }
}
</script>

<style scoped>
.fade-slide-enter-active,.fade-slide-leave-active{transition:all .18s ease}
.fade-slide-enter-from{opacity:0;transform:translateX(-6px)}
.fade-slide-leave-to{opacity:0;transform:translateX(-6px)}
</style>
