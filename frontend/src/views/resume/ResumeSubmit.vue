<!-- ResumeFinalSubmit.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">

        <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <!-- Top step infographic -->
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div class="flex flex-col items-center text-center">
                <div class="relative w-28 h-28 rounded-full border-2 border-sky-400 grid place-items-center">
                <div class="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-sky-500 text-white grid place-items-center text-sm">✓</div>
                <svg class="w-12 h-12 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M16 4H8a2 2 0 00-2 2v12l6-3 6 3V6a2 2 0 00-2-2z"/>
                </svg>
                </div>
                <div class="mt-2 text-xs text-emerald-600 font-semibold">완료</div>
                <div class="text-sm">기본정보</div>
            </div>
            <div class="flex flex-col items-center text-center">
                <div class="relative w-28 h-28 rounded-full border-2 border-sky-400 grid place-items-center">
                <div class="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-sky-500 text-white grid place-items-center text-sm">✓</div>
                <!--<svg class="w-12 h-12 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 016 8.58M12 14v7"/>
                </svg>-->

            <!--학사모 모양으로 수정-->
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="w-12 h-12 text-slate-500" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            >
            <path d="M22 10L12 4 2 10l10 6 10-6z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>

                </div>
                <div class="mt-2 text-xs text-emerald-600 font-semibold">완료</div>
                <div class="text-sm">학력/연구/NCS</div>
            </div>
            <div class="flex flex-col items-center text-center">
                <div class="relative w-28 h-28 rounded-full border-2 border-sky-400 grid place-items-center">
                <div class="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-sky-500 text-white grid place-items-center text-sm">✓</div>
                <svg class="w-12 h-12 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v6"/>
                </svg>
                </div>
                <div class="mt-2 text-xs text-emerald-600 font-semibold">완료</div>
                <div class="text-sm">어학/자격</div>
            </div>
            <div class="flex flex-col items-center text-center">
                <div class="relative w-28 h-28 rounded-full border-2 border-sky-400 grid place-items-center">
                <div class="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-sky-500 text-white grid place-items-center text-sm">✓</div>
                <svg class="w-12 h-12 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6M8 6h8a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"/>
                </svg>
                </div>
                <div class="mt-2 text-xs text-emerald-600 font-semibold">완료</div>
                <div class="text-sm">자기소개서/역량기술서</div>
            </div>
            </div>
        </section>

        <!-- Progress Info + Timeline -->
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="border-b pb-4">
            <h2 class="font-bold">제출 전 점검</h2>
            <p class="text-sm text-slate-600 mt-1">아래 인포그래픽은 지원자의 학업·재직 기간을 시간축으로 요약한 미리보기다.</p>
            </header>

            <div class="mt-6 overflow-x-auto">
            <div class="min-w-[900px] rounded-xl border border-slate-200 p-5">
                <div class="text-sm text-slate-600 mb-3">
                시간축 미리보기 <span class="ml-2 text-xs">(샘플 데이터)</span>
                </div>
                <!-- Static SVG preview -->
                <svg viewBox="0 0 900 220" class="w-full h-[220px]">
                <line x1="40" y1="170" x2="860" y2="170" stroke="#94a3b8" stroke-width="1"/>
                <g fill="#475569" font-size="11">
                    <g>
                    <line x1="80" y1="165" x2="80" y2="175" stroke="#94a3b8"/><text x="80" y="190" text-anchor="middle">2018</text>
                    <line x1="180" y1="165" x2="180" y2="175" stroke="#94a3b8"/><text x="180" y="190" text-anchor="middle">2019</text>
                    <line x1="280" y1="165" x2="280" y2="175" stroke="#94a3b8"/><text x="280" y="190" text-anchor="middle">2020</text>
                    <line x1="380" y1="165" x2="380" y2="175" stroke="#94a3b8"/><text x="380" y="190" text-anchor="middle">2021</text>
                    <line x1="480" y1="165" x2="480" y2="175" stroke="#94a3b8"/><text x="480" y="190" text-anchor="middle">2022</text>
                    <line x1="580" y1="165" x2="580" y2="175" stroke="#94a3b8"/><text x="580" y="190" text-anchor="middle">2023</text>
                    <line x1="680" y1="165" x2="680" y2="175" stroke="#94a3b8"/><text x="680" y="190" text-anchor="middle">2024</text>
                    <line x1="780" y1="165" x2="780" y2="175" stroke="#94a3b8"/><text x="780" y="190" text-anchor="middle">2025</text>
                    </g>
                </g>
                <g>
                    <rect x="120" y="40" width="240" height="26" rx="6" fill="#93c5fd"/>
                    <text x="125" y="58" font-size="12" fill="#0f172a">대학교 재학 (2019.03~2021.12)</text>
                    <rect x="370" y="40" width="140" height="26" rx="6" fill="#60a5fa"/>
                    <text x="375" y="58" font-size="12" fill="#0f172a">대학원 석사 (2022.03~2022.12)</text>
                </g>
                <g>
                    <rect x="520" y="92" width="210" height="26" rx="6" fill="#34d399"/>
                    <text x="525" y="110" font-size="12" fill="#064e3b">회사 A 재직 (2023.01~2024.09)</text>
                    <rect x="740" y="92" width="80" height="26" rx="6" fill="#10b981"/>
                    <text x="745" y="110" font-size="12" fill="#064e3b">회사 B 재직 (2024.10~)</text>
                </g>
                <g font-size="11" fill="#334155">
                    <rect x="40" y="18" width="12" height="12" rx="2" fill="#93c5fd"/><text x="58" y="28">학업</text>
                    <rect x="100" y="18" width="12" height="12" rx="2" fill="#34d399"/><text x="118" y="28">재직</text>
                </g>
                </svg>
                <p class="text-xs text-slate-500 mt-2">표시는 예시다. 실제 구현 시 입력데이터로 자동 렌더링.</p>
            </div>
            </div>

            <!-- Checklist badges -->
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div v-for="c in checks" :key="c" class="rounded-xl border p-4 flex flex-col items-center text-center">
                <div class="h-10 w-10 rounded-full bg-sky-100 text-sky-700 grid place-items-center font-bold">✓</div>
                <div class="mt-2 text-sm">{{ c }}</div>
                <div class="text-xs text-emerald-600 font-semibold">완료</div>
            </div>
            </div>
        </section>

        <!-- Consent form -->
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="border-b pb-3"><h2 class="font-bold">최종제출</h2></header>

            <div class="mt-6 rounded-md border border-slate-300 p-6">
            <div class="rounded-md border border-slate-300 p-8">
                <h3 class="text-xl font-extrabold text-center">지원자 동의 서약서</h3>
                <ol class="mt-6 list-decimal pl-6 leading-7 text-slate-700 text-sm">
                <li>본인은 "{{ templateName || '데이터 없음' }}" 에 지원함에 있어 입사지원서 등 제출한 이력정보를 허위로 기재하지 않으며, 이를 어길 시 어떠한 이익도 주장할 수 없음을 서약한다.</li>
                <li>지원서에 포함된 기재 사항은 사실과 다름이 없음을 확인하였으며, 채용 전형에서의 내용이 허위 또는 결과가 허용되더라도 어떠한 이의를 제기하지 않을 것을 서약한다.</li>
                </ol>
                <p class="mt-8 text-right text-sm text-slate-600">제출일 {{ submitDate }} · 지원자 {{ applicantName }}</p>
            </div>
            </div>

            <div class="mt-4 flex items-center gap-2 text-sm">
            <input id="agree" type="checkbox" class="rounded" v-model="agree" />
            <label for="agree">위 내용을 모두 확인하였으며, 이에 동의합니다.</label>
            </div>
        </section>
        </main>

        <!-- Footer status -->
        <footer class="sticky bottom-0 bg-white border-t">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
        <!-- <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-sm"> -->
            <!-- <div class="flex items-center gap-3 text-slate-600">
            <div class="flex items-center gap-2">
                <span class="inline-block h-6 w-6 rounded-full border border-slate-400"></span>
                로그인 세션 남은시간 <span class="text-amber-600 font-semibold">{{ remainText }}</span> / 120분
                <button class="text-[11px]" @click="extendSession">연장</button>
            </div>
            <div class="hidden sm:block text-xs text-slate-500">접수기간 2000.00.00 (수) 15:00 ~ 2001.01.01 (일) 23:59</div>
            </div> -->
            <div class="flex items-center gap-3">
            <!-- <button class="rounded-md border px-5 py-2" @click="saveDraft">임시저장</button>  -->
            <button
                class="rounded-md bg-sky-600 px-6 py-2 text-white disabled:opacity-50"
                :disabled="!agree"
                @click="submitForm"
            >
                제출
            </button>
            </div>
        </div>
        </footer>
    </div>
    </template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResumeStore } from '@/stores/resumeStore'
import applicantApi from "../../api/applicantApi";

const resumeStore = useResumeStore();
const router = useRouter();
const route = useRoute();

const checks = ["기본정보", "학력/연구/NCS", "어학/자격", "자기소개서/역량기술서"];

const agree = ref(false);
// const remainText = ref("115분 15초");
const applicantName = ref('')
const submitDate = ref('')
const templateName = ref('')

onMounted(async () => {
    await resumeStore.fetchResumeAndTemplate();

    if (!resumeStore.canAccess()) {
        alert('접근할 수 없는 페이지입니다.');
        router.push({ name: 'ApplicantLogin', params: { companySlug: route.params.companySlug }});
        return;
    }

    // 오늘 날짜 세팅
    submitDate.value = new Date().toISOString().split('T')[0] // YYYY-MM-DD

    console.log(resumeStore.template);

    templateName.value = resumeStore.template.name + "(" + resumeStore.template.description + ")";
})

async function save() {
    return true;
}

async function submitForm() {
    if (!agree.value) return false;
    const success = await save();
    if (success) {
        try {
            const res = await applicantApi.post(`/resumes/submit`);
            
            resumeStore.resume.status = res.data.status;
        
            alert("제출이 완료되었습니다.");
            router.push({ name: 'ApplicantLogin', params: { companySlug: route.params.companySlug }})
        
        } catch (e) {
            alert(e);
            return false;
        }
    }
}
    // const extendSession = () => {
    // // TODO: 연장 API
    // alert("세션이 연장되었습니다.");
    // };
defineExpose({save})
</script>

<style scoped>
/* tooltip sample (미사용 예시 클래스와 동일 동작) */
.tip:hover .tip-body { display: block; }
</style>
