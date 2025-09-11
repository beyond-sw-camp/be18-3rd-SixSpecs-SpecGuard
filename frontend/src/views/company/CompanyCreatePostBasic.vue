<template>
    <!-- <main class="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-6"> -->
    <div class="w-full grid grid-cols-12 gap-6">
        <!-- Main content -->
        <section class="col-span-12">
        <!-- Filter row -->
        <div class="grid grid-cols-12 gap-4 items-end">
            <!-- <div class="col-span-12 sm:col-span-3"></div> -->

            <div class="col-span-12 sm:col-span-3">
            <label class="block text-sm font-bold mb-1">부서</label>
            <div class="flex items-center gap-2">
                <select v-model="form.department" class="w-full rounded-md border border-slate-300 px-3 py-2">
                <option value="" disabled>선택</option>
                <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
                </select>
                <svg class="w-5 h-5 -ml-7 pointer-events-none opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
            </div>
            </div>

            <div class="col-span-12 sm:col-span-3">
            <label class="block text-sm font-bold mb-1">직무</label>
            <div class="flex items-center gap-2">
                <select v-model="form.role" class="w-full rounded-md border border-slate-300 px-3 py-2">
                <option value="" disabled>선택</option>
                <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
                </select>
                <svg class="w-5 h-5 -ml-7 pointer-events-none opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
            </div>
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
            <input type="number" min="0" v-model.number="form.years"
                    class="w-full rounded-md border border-slate-300 px-3 py-2"/>
            </div>

            <!-- <div class="col-span-12 sm:col-span-12 text-right">
            <button class="rounded-md bg-amber-400 px-5 py-2 font-semibold text-slate-900 hover:bg-amber-300">
                자소서 문항 생성하기
            </button>
            </div> -->
        </div>

        <!-- Content grid -->
        <div class="mt-6 grid grid-cols-12 gap-6">
        <!-- Left: 제목/설명 -->
        <div class="col-span-12 md:col-span-3">
            <div class="space-y-3">
            <div>
                <div class="text-sm font-bold mb-1">제목</div>
                <input v-model="form.title" placeholder="개발자 채용 1"
                    class="w-full rounded-md border border-slate-300 px-3 py-2"/>
            </div>
            <div>
                <div class="text-sm font-bold mb-1">설명</div>
                <textarea v-model="form.description" rows="12"
                        class="w-full rounded-md border border-slate-300 px-3 py-2 resize-none"></textarea>
            </div>
            </div>
        </div>

        <!-- Middle: 분야 -->
        <div class="col-span-12 md:col-span-3">
            <div class="text-sm font-bold mb-2">분야</div>
            <div class="relative mb-3">
            <input v-model.trim="categoryQuery"
                    class="w-full h-9 rounded-full bg-slate-200/70 px-4 pr-12 text-sm outline-none"/>
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">검색</span>
            </div>

            <div class="rounded-xl border border-slate-300 p-3">
            <button type="button"
                    class="w-full relative rounded-full bg-slate-800 text-white font-extrabold tracking-tight py-2">
                {{ categoryGroup }}
                <svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/>
                </svg>
            </button>

            <div class="mt-3 rounded-2xl bg-white px-4 py-3 max-h-80 overflow-auto space-y-3">
                <button v-for="c in filteredCategories" :key="c"
                        @click="toggleChip('category', c)"
                        class="w-full py-2 rounded-full border text-center"
                        :class="selected.category.has(c) ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 border-transparent'">
                {{ c }}
                </button>
            </div>
            </div>
        </div>

        <!-- Middle-right: 직무 세부(분야와 동일 UI) -->
        <div class="col-span-12 md:col-span-3">
            <div class="text-sm font-bold mb-2">직무 세부</div>
            <div class="relative mb-3">
            <input v-model.trim="roleQuery"
                    class="w-full h-9 rounded-full bg-slate-200/70 px-4 pr-12 text-sm outline-none"/>
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">검색</span>
            </div>

            <div class="rounded-xl border border-slate-300 p-3">
            <button type="button"
                    class="w-full relative rounded-full bg-slate-800 text-white font-extrabold tracking-tight py-2">
                {{ roleGroup }}
                <svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/>
                </svg>
            </button>

            <div class="mt-3 rounded-2xl bg-white px-4 py-3 max-h-80 overflow-auto space-y-3">
                <button v-for="t in filteredRoleTags" :key="t"
                        @click="toggleChip('role', t)"
                        class="w-full py-2 rounded-full border text-center"
                        :class="selected.role.has(t) ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 border-transparent'">
                {{ t }}
                </button>
            </div>
            </div>
        </div>

        <!-- Right: 미리보기 (폭 축소) -->
        <div class="col-span-12 md:col-span-3">
            <div class="rounded-2xl bg-white p-5 shadow-sm sticky top-20">
            <div class="text-2xl font-extrabold mb-4">기본정보 요약</div>
            <div class="space-y-2 text-lg">
                <div>{{ preview.title }}</div>
                <div>{{ preview.department || '○○팀' }}</div>
                <div>{{ preview.role || '○○○○직무' }}</div>
                <div>{{ preview.years }}년차</div>
            </div>
            <div class="mt-6">
                <button class="w-full rounded-md bg-slate-900 px-5 py-2 font-semibold text-white hover:bg-slate-800"
                @click="pageMove('CompanyCreatePostDetail')">다음
                </button>
            </div>
            </div>
        </div>
        </div>

        

        </section>
    </div>
    <!-- </main> -->
    </template>

    <script setup>
    import { reactive, ref, computed } from 'vue'
    import { useRoute, useRouter,} from 'vue-router'

    const router = useRouter()
    const route = useRoute()
    const companySlug = route.params.companySlug

    function pageMove(name, extraParams = {}, query) {
    router.push({
        name,
        params: { companySlug, ...extraParams },
        query,
    })
    }

    const departments = ['IT', '제조', '영업', 'HR']

    const roleQuery = ref('')
    const roleGroup = '백엔드 개발'
    const roles = ['백엔드 개발', '프론트엔드', '데이터 분석', 'QA', 'ERP']
    const roleTags = ['프론트엔드 개발', '백엔드 개발', '데이터 분석', 'ERP', 'QA', '네트워크 엔지니어', 'HR']

    const filteredRoleTags = computed(() => {
    const q = roleQuery.value.toLowerCase()
    return roleTags.filter(t => t.toLowerCase().includes(q))
    })

    const categories = ['IT', '미디어, 광고', '판매, 유통', '제조, 생산, 화학', '금융, 은행', '서비스', '공공기관 / 공기업']
    const categoryQuery = ref('')
    const categoryGroup = 'IT'
    const filteredCategories = computed(() => {
    const q = categoryQuery.value.toLowerCase()
    return categories.filter(c => c.toLowerCase().includes(q))
    })

    const form = reactive({
    postName: '',
    department: '',
    role: '',
    careerType: '',
    years: 0,
    title: '개발 공채',
    description: '26년 2월까지 개발자 TO 1자리 수 모집해야 합니다.'
    })

    const selected = reactive({
    category: new Set(),
    role: new Set()
    })

    function toggleChip(type, value) {
    const s = selected[type]
    s.has(value) ? s.delete(value) : s.add(value)
    }

    const preview = computed(() => ({
    title: form.title || '주니어개발자 채용 ',
    department: form.department,
    role: form.role,
    years: Number.isFinite(form.years) ? form.years : 0
}))
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all .18s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(-6px); }
.fade-slide-leave-to   { opacity: 0; transform: translateX(-6px); }
</style>
