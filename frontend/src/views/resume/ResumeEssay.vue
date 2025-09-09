<!-- ResumeEssay.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <!-- Title + Steps -->
        <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-center">
            <h1 class="text-lg sm:text-xl font-bold">
            [SIXSPEC] 2025 우수인재 경력 채용 (DATA Intelligence 사업개발 및 제안)
            </h1>
        </div>

        <div class="border-t border-slate-200 bg-white sticky top-0 z-30">
            <nav class="grid grid-cols-5 border-b text-sm font-semibold">
                <RouterLink
                v-for="tab in tabs"
                :key="tab.to"
                :to="tab.to"
                class="col-span-1 p-3 text-center border-b-4 hover:bg-slate-100"
                :class="isActive(tab.to) ? 'border-sky-600 text-sky-600 font-bold' : 'border-transparent'"
                >
                {{ tab.label }}
                </RouterLink>
            </nav>
        </div>
        </header>

        <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="border-b pb-3">
            <h2 class="font-bold">
                자기소개서 <span class="text-rose-500 text-xs align-top">* 필수항목</span>
            </h2>
            <p class="mt-2 text-sm text-slate-600">
                본인이 경험했던 사실들을 질문에 맞게 논리적으로 기술하여 주시기 바랍니다.
            </p>
            </header>

            <!-- Q1 -->
            <div class="mt-6">
            <label class="block text-sm font-semibold">
                * Specguard DATA Intelligence 사업개발 및 제안 직무에 지원한 동기와 본인이 기여할 수 있는 부분에 대해 기술하시오
                (최소 200자, 최대 1000자 입력가능)
            </label>
            <div class="mt-2 relative">
                <textarea
                v-model="a1"
                rows="7"
                :maxlength="1000"
                class="w-full rounded-md border border-slate-300 px-3 py-2"
                placeholder="내용을 입력하세요"
                />
                <div class="absolute bottom-2 right-3 text-xs text-slate-500">{{ a1.length }}/1000</div>
            </div>
            </div>

            <!-- Q2 -->
            <div class="mt-8">
            <label class="block text-sm font-semibold">
                * 지원 직무와 관련하여 최근 3년 내 최선의 결과를 도출한 도전은 무엇이었으며, 과정은 어떠하였는지 기술하시오
                (최소 200자, 최대 1000자 입력가능)
            </label>
            <div class="mt-2 relative">
                <textarea
                v-model="a2"
                rows="7"
                :maxlength="1000"
                class="w-full rounded-md border border-slate-300 px-3 py-2"
                placeholder="내용을 입력하세요"
                />
                <div class="absolute bottom-2 right-3 text-xs text-slate-500">{{ a2.length }}/1000</div>
            </div>
            </div>

            <!-- Q3 -->
            <div class="mt-8">
            <label class="block text-sm font-semibold">
                * 본인의 장단점을 기술하고, 이것이 회사 업무에 어떤 영향을 미칠것인지 기술하시오
                (최소 200자, 최대 1000자 입력가능)
            </label>
            <div class="mt-2 relative">
                <textarea
                v-model="a3"
                rows="7"
                :maxlength="1000"
                class="w-full rounded-md border border-slate-300 px-3 py-2"
                placeholder="내용을 입력하세요"
                />
                <div class="absolute bottom-2 right-3 text-xs text-slate-500">{{ a3.length }}/1000</div>
            </div>
            </div>

            <div class="mt-8 h-px bg-slate-200"></div>

            <!-- Footer actions inline -->
            <div class="mt-6 flex items-center justify-between">
            <div class="text-sm text-slate-600 flex items-center gap-3">
                <div class="inline-block h-6 w-6 rounded-full border border-slate-400"></div>
                <span>로그인 세션 남은시간 <span class="text-amber-600 font-semibold">{{ remainText }}</span> / 120분</span>
                <button class="text-[11px]" @click="extendSession">연장</button>
                <span class="hidden sm:inline text-xs text-slate-500">접수기간 2000.00.00 (수) 15:00 ~ 2001.01.01 (일) 23:59</span>
            </div>
            
            </div>
        </section>
        </main>
        <footer class="sticky bottom-0 bg-white border-t">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
            <button type="button" class="rounded-md border px-5 py-2" @click="saveDraft">임시저장</button>
            <button type="button" class="rounded-md bg-sky-600 px-6 py-2 text-white" @click="goNext">다음</button>
        </div>
        </footer>
    </div>
    </template>

    <script setup>
    import { ref} from "vue";
    import { useRoute, useRouter } from "vue-router";

    const router = useRouter();
    const route = useRoute();

    const tabs = [
    { label: "1 기본정보", to: "/resume/basic-info" },
    { label: "2 학력/연구/NCS", to: "/resume/academic-info" },
    { label: "3 어학/자격", to: "/resume/certificate-info" },
    { label: "4 자기소개서/역량기술서", to: "/resume/essay" },
    { label: "5 최종제출", to: "/resume/final-submit" },
    ];

    // const go = (to) => router.push(to);
    const isActive = (to) => {
    const a = router.resolve(to).path.replace(/\/+$/, "");
    const b = route.path.replace(/\/+$/, "");
    return a === b;
    };

    // 폼 상태
    const a1 = ref("");
    const a2 = ref("");
    const a3 = ref("");

    // 유효성
    const meetsMin = (s) => s.trim().length >= 200;
    // const canProceed = computed(() =>
    [a1.value, a2.value, a3.value].every((s) => s.length <= 1000 && meetsMin(s))
    // );

    // 액션
    const saveDraft = () => {
    // TODO: API 연동
    alert("임시저장 되었습니다.");
    };
    // const nextStep = () => router.push("/resume/final-submit");

    // 세션
    const remainText = ref("115분 15초");
    const extendSession = () => {
    // TODO: 연장 API
    alert("세션이 연장되었습니다.");
    };
</script>

<!-- Tailwind는 전역 설정 가정 -->
<style scoped></style>
