<!-- ResumeQuestionCreate.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <!-- Body -->
        <main class="w-full -10xl pl-4 sm:pl-6 lg:pl-8 pr-4 py-6">
        <div class="grid grid-cols-12 gap-6">
            <!-- ===== Sidebar (given) ===== -->

            <!-- Main area -->
            <section class="col-span-12">
            <div class="grid grid-cols-12 gap-6">
                <!-- Left: 시작/마감 일자 -->
                <div class="col-span-12 md:col-span-3">
                <div class="inline-block rounded-full bg-slate-200 px-4 py-2 font-extrabold text-xl mb-3">시작/마감 일자</div>

                <!-- 시작 -->
                <div class="mb-2 flex items-center gap-2">
                    <span class="inline-flex items-center gap-1 rounded-full bg-green-300 px-3 py-1 font-semibold">시작 일자
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 7h8M7 11h10M6 15h12M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"/></svg>
                    </span>
                </div>
                <div class="text-sm rounded-full bg-white inline-block px-4 py-1 border">{{ formatted(startDate, startTime) }}</div>

                <div class="mt-2 rounded-2xl border bg-white p-3 w-full">
                    <Calendar :modelValue="startDate" @update:modelValue="v=>startDate=v"/>
                    <div class="mt-3 flex items-center gap-2 text-sm">
                    <input type="date" v-model="startDate" class="rounded-lg border-slate-300"/>
                    <input type="time" v-model="startTime" class="rounded-lg border-slate-300"/>
                    </div>
                </div>

                <!-- 마감 -->
                <div class="mt-6 mb-2 flex items-center gap-2">
                    <span class="inline-flex items-center gap-1 rounded-full bg-rose-300 px-3 py-1 font-semibold">마감 일자
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 7h8M7 11h10M6 15h12M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"/></svg>
                    </span>
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

                <!-- Center: 자기소개서 등록 폼 -->
                <div class="col-span-12 md:col-span-6 relative">
                <div class="mx-auto text-center">
                    <span class="inline-block rounded-2xl bg-slate-200 px-6 py-2 text-2xl font-extrabold">자기소개서 등록</span>
                </div>

                <div class="mt-5 space-y-6 border-l pl-6">
                    <!-- 항목명 -->
                    <div>
                    <div class="flex items-baseline gap-2">
                        <span class="text-2xl font-extrabold">• 항목명</span>
                    </div>
                    <input v-model="itemTitle" class="mt-2 w-full rounded-full border px-4 py-2" placeholder="지원직무와 관련된 경험 기술"/>
                    </div>

                    <hr>

                    <!-- 항목 타입 -->
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

                    <!-- 필수 여부 -->
                    <div>
                    <div class="text-2xl font-extrabold">• 필수 여부</div>
                    <div class="mt-3 inline-flex items-center rounded-full bg-slate-200 p-1 gap-1">
                        <button class="px-5 py-1 rounded-full text-sm" :class="required ? 'bg-white shadow font-semibold' : ''" @click="required=true">예</button>
                        <button class="px-5 py-1 rounded-full text-sm" :class="!required ? 'bg-white shadow font-semibold' : ''" @click="required=false">아니오</button>
                    </div>
                    </div>

                    <hr>

                    <!-- 글자수 -->
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

                    <!-- 추가/삭제 -->
                    <div class="flex items-center justify-end gap-6">
                    <button class="text-slate-700 hover:underline" @click="addPrompt">추가 +</button>
                    <button class="text-slate-700 hover:underline" @click="removePrompt">삭제 -</button>
                    </div>

                    <div class="text-center text-slate-400">• •</div>
                </div>
                </div>

                <!-- Right: 미리보기 + 상단 버튼 -->
                <div class="col-span-12 md:col-span-3">
                <div class="flex justify-end mb-3">
                    <button class="rounded-xl bg-amber-400 px-5 py-2 font-bold text-slate-900 shadow hover:bg-amber-300">자소서 생성하기</button>
                </div>

                <div class="rounded-2xl bg-white p-5 shadow-sm border sticky top-20">
                    <div class="text-2xl font-extrabold mb-4">확인해주세요!</div>
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

    /* form state */
    const startDate = ref('')
    const startTime = ref('')
    const endDate = ref('')
    const endTime = ref('')

    const itemTitle = ref('')
    const types = ['텍스트', '숫자', '날짜', '선택']
    const type = ref('텍스트')
    const required = ref(true)
    const minLen = ref(0)
    const maxLen = ref(0)

    const prompts = ref([
    '현대로템에 지원한 이유와 입사 후 본인이 보유한 경험을 어떻게 활용할 계획인지 작성해주세요.',
    '지원 직무를 수행하기 위해 필요한 핵심 역량은 무엇이며, 본인이 해당 역량을 갖추고 있는지 경험과 성과를 중심으로 작성해주세요.',
    '현대로템의 인재상과 본인이 얼마나 부합하는지 구체적인 사례를 바탕으로 작성해주세요.'
    ])

    
    function addPrompt() {
    const t = (itemTitle.value || '').trim()
    if (!t) return        // 빈 값이면 무시
    prompts.value.push(t) // 항목명 → 새 프롬프트
    itemTitle.value = ''  // 입력창 초기화
    }
    function removePrompt() { if (prompts.value.length) prompts.value.pop() }

    function formatted(d, t) {
    if (!d && !t) return '—'
    const date = new Date(`${d || todayISO()}T${t || '00:00'}`)
    return date.toLocaleString('ko-KR', { year:'numeric', month:'long', day:'numeric', weekday:'short', hour:'2-digit', minute:'2-digit', hour12:false })
    }
    function todayISO() {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    }

    /* lightweight calendar component inline */
    const Calendar = defineComponent({
    name: 'PostCalendar',
    props: { modelValue: { type: String, default: '' } },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const cur = ref(props.modelValue || todayISO())
        watch(() => props.modelValue, v => { if (v) cur.value = v })

        const ym = computed(() => {
        const d = new Date(cur.value)
        return { y: d.getFullYear(), m: d.getMonth() } // 0-index
        })

        function toISO(d) {
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
        }
        function setDay(day) {
        const d = new Date(ym.value.y, ym.value.m, day)
        emit('update:modelValue', toISO(d))
        }
        function prev() { cur.value = toISO(new Date(ym.value.y, ym.value.m - 1, 1)) }
        function next() { cur.value = toISO(new Date(ym.value.y, ym.value.m + 1, 1)) }

        const weeks = computed(() => {
        const first = new Date(ym.value.y, ym.value.m, 1)
        const last  = new Date(ym.value.y, ym.value.m + 1, 0)
        const startIdx = (first.getDay() + 6) % 7 // Monday=0
        const days = last.getDate()
        const cells = Array(startIdx).fill(null).concat([...Array(days)].map((_, i) => i + 1))
        while (cells.length % 7) cells.push(null)
        const out = []
        for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7))
        return out
        })

        function todayISO() {
        const d = new Date()
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
        }

        return { ym, weeks, prev, next, setDay }
    },
    template: `
        <div class="w-full">
        <div class="flex items-center justify-between mb-2">
            <button class="px-2 py-1 rounded bg-slate-100" @click="prev">‹</button>
            <div class="text-sm font-semibold">{{ ym.y }}년 {{ ym.m + 1 }}월</div>
            <button class="px-2 py-1 rounded bg-slate-100" @click="next">›</button>
        </div>

        <div class="grid grid-cols-7 text-center text-xs text-slate-500 mb-1">
            <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
        </div>

        <div class="grid grid-cols-7 gap-y-1 text-center">
            <template v-for="(w, wi) in weeks" :key="wi">
            <template v-for="(d, di) in w" :key="di">
                <button v-if="d"
                class="mx-auto w-7 h-7 rounded-full hover:bg-slate-200 text-sm"
                @click="setDay(d)">
                {{ d }}
                </button>
                <span v-else class="w-7 h-7"></span>
            </template>
            </template>
        </div>
        </div>
    `
    })
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active{ transition: opacity .2s cubic-bezier(.22,.61,.36,1), transform .2s cubic-bezier(.22,.61,.36,1); will-change: transform, opacity;}
.fade-slide-enter-from{ opacity:0; transform:translateX(-6px)}
.fade-slide-leave-to{ opacity:0; transform:translateX(-6px)}
</style>
