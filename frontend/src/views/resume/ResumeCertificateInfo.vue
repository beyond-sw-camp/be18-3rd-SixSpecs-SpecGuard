<!-- ResumeLanguageCertificate.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <!-- Title + Steps -->
        <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-center">
            <h1 class="text-lg sm:text-xl font-bold">
            [SIXSPEC] 2025 우수인재 경력 채용 (DATA Intelligence 사업개발 및 제안)
            </h1>
        </div>

        <!-- Step Tabs -->
        <nav class="grid grid-cols-5 border-b text-sm font-semibold">
            <button
            v-for="tab in tabs"
            :key="tab.to"
            @click="go(tab.to)"
            class="col-span-1 p-3 text-center border-b-4 hover:bg-slate-100"
            :class="isActive(tab.to) ? 'border-sky-600 text-sky-600 font-bold' : 'border-transparent'"
            >
            {{ tab.label }}
            </button>
        </nav>
        </header>

        <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <!-- Languages -->
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
            <h2 class="font-bold">
                어학/자격 <span class="text-rose-500 text-xs align-top">* 필수항목</span>
            </h2>
            </header>

            <div class="mt-6">
            <h3 class="font-bold text-slate-800">
                공인외국어 시험
                <span class="text-xs text-rose-500 ml-2">2023.07.03 이후 점수만 인정</span>
            </h3>
            <p class="text-sm text-slate-600 mt-1">
                증빙 가능한 서류가 있는 경우에만 입력하시기 바랍니다. (추후 구비서류 확인 예정)
            </p>

            <div class="mt-4 flex items-center gap-3">
                <button type="button" class="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm" @click="addLanguageRow">
                <span class="text-sky-600">＋</span> 시험
                </button>
                <button type="button" class="rounded-md bg-slate-700 text-white px-4 py-1 text-sm" @click="openLanguageSearch">
                시험 검색
                </button>
            </div>

            <!-- One row (바인딩 예시) -->
            <div class="mt-5 grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">시험명</label>
                <input
                v-model="lang.name"
                class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2"
                placeholder="예: TOEIC, OPIC"
                />
                <label class="col-span-6 sm:col-span-2 font-semibold sm:text-right">점수/등급</label>
                <input
                v-model="lang.score"
                class="col-span-6 sm:col-span-4 rounded-md border px-3 py-2"
                placeholder="예: 900, IH"
                />
            </div>
            <div class="mt-3 grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">취득일</label>
                <input
                type="date"
                v-model="lang.acquired"
                class="col-span-6 sm:col-span-4 rounded-md border px-3 py-2"
                />
                <label class="col-span-6 sm:col-span-2 font-semibold sm:text-right">유효기간</label>
                <input
                type="date"
                v-model="lang.expires"
                class="col-span-6 sm:col-span-4 rounded-md border px-3 py-2"
                />
            </div>
            </div>

            <div class="mt-8 h-px bg-slate-200"></div>
        </section>




        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <!-- Certificates -->
            <div class="mt-6">
            <h3 class="font-bold text-slate-800">자격증/면허증</h3>
            <p class="text-sm text-slate-600 mt-1">
                증빙 가능한 서류가 있는 경우에만 입력하시기 바라며, 검색이 불가능한 경우에는 입력란 텍스트로 등록 가능합니다. (추후 구비서류 확인 예정)
            </p>

            <div class="mt-4 flex flex-wrap items-center gap-3">
                <span class="text-rose-500">*자격증명</span>
                <button type="button" class="rounded-md bg-slate-700 text-white px-4 py-1 text-sm" @click="openCertSearch">
                자격증 검색
                </button>
                <label class="inline-flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" v-model="cert.presets.engineerInfo" class="rounded" />
                정보처리 기사
                </label>
            </div>

            <div class="mt-4 grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">*발급기관</label>
                <input
                v-model="cert.issuer"
                class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2"
                placeholder="예: 한국 산업인력공단"
                />
                <label class="col-span-6 sm:col-span-2 font-semibold sm:text-right">*등록번호</label>
                <input
                v-model="cert.regNo"
                class="col-span-6 sm:col-span-4 rounded-md border px-3 py-2"
                placeholder="예: 123456678888"
                />
            </div>
            <div class="mt-3 grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">*취득일</label>
                <input
                type="date"
                v-model="cert.acquired"
                class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2"
                />
            </div>
            </div>

            <!-- Actions -->
            <div class="mt-8 flex justify-end gap-3">
            </div>
        </section>
        </main>

        <!-- Footer status -->
        <footer class="sticky bottom-0 bg-white border-t">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
            <button class="rounded-md border px-5 py-2" type="button" @click="saveDraft">임시저장</button>
            <button class="rounded-md bg-sky-600 px-6 py-2 text-white" type="button" @click="goNext">다음</button>
        </div>
        </footer>
    </div>
    </template>

    <script setup>
    import { 
        reactive 
    } from "vue";
    import { useRoute, useRouter } from "vue-router";

    const router = useRouter();
    const route = useRoute();

    const tabs = [
    { label: "1 기본정보", to: "/resume/basic-info" },
    { label: "2 학력/연구/NCS", to: "/resume/academic-info" },
    { label: "3 어학/자격", to: "/resume/certificate-info" },
    { label: "4 자기소개서/역량기술서", to: "/resume/essay" },
    { label: "5 최종제출", to: "/resume/submit" },
    ];

    const go = (to) => router.push(to);
    const isActive = (to) => {
    const a = router.resolve(to).path.replace(/\/+$/, "");
    const b = route.path.replace(/\/+$/, "");
    return a === b;
    };

    // 폼 상태
    const lang = reactive({
    name: "",
    score: "",
    acquired: "",
    expires: "",
    });

    const cert = reactive({
    issuer: "",
    regNo: "",
    acquired: "",
    presets: { engineerInfo: false },
    });

    // 액션
    const saveDraft = () => {
    // TODO: API 호출
    // console.log({ lang, cert });
    alert("임시저장 되었습니다.");
    };
    // const nextStep = () => router.push("/resume/essay");

    // 부가 액션
    const addLanguageRow = () => {
    // TODO: 다중 행 관리 필요시 배열로 확장
    alert("시험 항목 추가는 배열 기반으로 확장하세요.");
    };
    const openLanguageSearch = () => {
    // TODO: 검색 모달 연결
    alert("시험 검색 모달을 연결하세요.");
    };
    const openCertSearch = () => {
    // TODO: 자격증 검색 모달 연결
    alert("자격증 검색 모달을 연결하세요.");
    };

    // 세션 남은시간 표시(정적 예시)
    // const remainText = ref("115분 15초");
    // const extendSession = () => {
    // // TODO: 세션 연장 API
    // alert("세션이 연장되었습니다.");
    // };
</script>

<!-- Tailwind는 프로젝트 전역에서 설정되어 있다고 가정 -->
<style scoped></style>
