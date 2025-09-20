<!-- ResumeLanguageCertificate.vue -->
<template>
    <!-- <div class="min-h-dvh flex flex-col bg-slate-100 text-slate-900"> -->
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
                class="col-span-1 p-3 text-center border-b-4 hover:bg-slate-100"
                :class="isActive(tab.to) ? 'border-sky-600 text-sky-600 font-bold' : 'border-transparent'"
                @click="handleTabClick(tab.to)">
                {{ tab.label }}
            </button>
        </nav>
        </header>

        <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-16">
        <!-- 빈 상태 -->
        <section v-if="certs.length === 0" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
            <h3 class="font-bold text-slate-800">자격증/면허증</h3>
            <button type="button" class="rounded-md border px-3 py-1" @click="addCert">추가</button>
            </header>
            <p class="mt-4 text-sm text-slate-500">등록된 자격증이 없습니다.</p>
        </section>

        <!-- 자격증 반복 섹션 -->
        <section
            v-for="(c, i) in certs"
            :key="i"
            class="bg-white shadow-sm ring-1 ring-slate-200 p-6"
        >
            <header class="flex items-center justify-between border-b pb-3">
            <h3 class="font-bold text-slate-800">자격증/면허증 {{ i + 1 }} <span class="text-rose-500 text-xs align-top">* 필수항목</span></h3>
            <div class="flex gap-2">
                <button type="button" class="rounded-md border px-3 py-1" @click="addCert">추가</button>
                <button type="button" class="rounded-md border px-3 py-1" @click="removeCert(i)">삭제</button>
            </div>
            </header>

            <!-- 자격증명 -->
            <div class="mt-4 grid grid-cols-12 gap-3 items-center">
            <label class="col-span-12 sm:col-span-2 font-semibold">
                <span class="text-red-500">* </span>
                <span class="text-black">자격증명</span>
            </label>
            <div class="col-span-12 sm:col-span-10 flex flex-wrap items-center gap-3">
                <input
                v-model="c.name"
                class="flex-1 rounded-md border px-3 py-2"
                placeholder="예: 정보처리기사, ADsP"
                />
                <button
                type="button"
                class="rounded-md bg-slate-700 text-white px-4 py-1 text-sm"
                @click="openCertSearch"
                >
                자격증 검색
                </button>
                <!-- <label class="inline-flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" v-model="c.presets.engineerInfo" class="rounded" />
                정보처리 기사
                </label> -->
            </div>
            </div>

            <!-- 발급기관 / 등록번호 -->
            <div class="mt-4 grid grid-cols-12 gap-3 items-center">
            <label class="col-span-12 sm:col-span-2 font-semibold">
                <span class="text-red-500">* </span>
                <span class="text-black">발급기관</span>
            </label>
            <input
                v-model="c.issuer"
                class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2"
                placeholder="예: 한국산업인력공단"
            />
            <label class="col-span-6 sm:col-span-2 font-semibold sm:text-right">
                <span class="text-red-500">* </span>
                <span class="text-black">등록번호</span>
                </label>
            <input
                v-model="c.regNo"
                class="col-span-6 sm:col-span-4 rounded-md border px-3 py-2"
                placeholder="예: 123456678888"
            />
            </div>

            <!-- 취득일 -->
            <div class="mt-3 grid grid-cols-12 gap-3 items-center">
            <label class="col-span-12 sm:col-span-2 font-semibold">
                <span class="text-red-500">* </span>
                <span class="text-black">취득일</span>
            </label>
            <input
                type="date"
                v-model="c.acquired"
                class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2"
            />
            </div>
        </section>
        </main>

        <!-- Footer -->
        <footer class="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
            <button class="rounded-md bg-sky-600 px-6 py-2 text-white" type="button" @click="goNext">
            다음
            </button>
        </div>
        </footer>
    </div>
    </template>

    <script setup>
    import { ref, computed } from 'vue'
    import { useRoute, useRouter} from 'vue-router'
    import { onMounted } from 'vue'
    import { resumeStore } from '@/stores/resumeStore'
    import axios from 'axios'

    const API = import.meta.env.VITE_API_URL
    const router = useRouter()
    const route = useRoute()

    const applicantSlug = route.params.applicantSlug
    const tabs = [
    { label: "1 기본정보", to: { name: 'ResumeBasicInfo', params: { applicantSlug }}},
    { label: "2 학력/연구/NCS", to: { name: 'ResumeAcademicInfo', params: { applicantSlug }}},
    { label: "3 어학/자격", to: { name: 'ResumeCertificateInfo', params: { applicantSlug }}},
    { label: "4 자기소개서/역량기술서", to: { name: 'ResumeEssay', params: { applicantSlug }}},
    { label: "5 최종제출", to: { name: 'ResumeSubmit', params: { applicantSlug }}},
    ]

    

    function isActive(to) {
        const a = router.resolve(to).path.replace(/\/+$/, '')
        const b = route.path.replace(/\/+$/, '')
        return a === b
    }


    // 자격증: 0개 허용
    const makeCert = () => ({
        id: null,
        name: "",
        regNo: "",
        issuer: "",
        acquired: "",
    })
    const certs = ref([makeCert()])

    function addCert() {
    certs.value.push(makeCert())
    }
    function removeCert(i) {
    certs.value.splice(i, 1)
    }

    // 유효성: 항목이 있을 때만 검사
    function validateForm() {
    for (const [i, c] of certs.value.entries()) {
        if (!c.name) return alert(`자격증 ${i + 1}: 자격증명을 입력하세요.`), false
        if (!c.issuer) return alert(`자격증 ${i + 1}: 발급기관을 입력하세요.`), false
        if (!c.regNo) return alert(`자격증 ${i + 1}: 등록번호를 입력하세요.`), false
        if (!c.acquired) return alert(`자격증 ${i + 1}: 취득일을 선택하세요.`), false
    }
    return true
    }

    function handleTabClick(to) {
    if (!validateForm()) return
    router.push(to)
    }

    function openCertSearch() {
    alert("자격증 검색 모달을 연결하세요.")
    }

    onMounted(async () => {

        console.log("onMounted Certificate info saved:", resumeStore.resume);
        if (!resumeStore.resume?.certificates) {
            try {
            const res = await axios.get(`${API}/api/v1/resumes`, {
                withCredentials: true
            });
            resumeStore.resume = res.data;
            } catch (e) {
            console.error("Failed to fetch resume:", e);
            }
        }
        console.log("Resume store in Basic info:", resumeStore.resume);
        const data = resumeStore.resume
        if (data?.certificates) {
            certs.value = data.certificates?.map(l => ({
                id: l.id,
                name: l.certificateName,
                regNo: l.certificateNumber,
                issuer: l.issuer,
                acquired: l.issuedDate,
            })) || [
                { 
                    id: null, 
                    name: "", 
                    regNo: "",
                    issuer: "",
                    acquired: "",
                },
            ];
        }
        }
    )

    async function goNext() {
    if (!validateForm()) return
        const payload = {
            "certificates": [
                ...certs.value.map(l => ({
                        id: l.id,
                        certificateName: l.name,
                        certificateNumber: l.regNo,
                        issuer: l.issuer,
                        issuedDate: l.acquired,
                }))
            ]
        }

        console.log(payload);

        try {
            await axios.post(`${API}/api/v1/resumes/certificates`, payload, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            });

            resumeStore.resume.certificates = [
                ...certs.value.map(l => ({
                        id: l.id,
                        certificateName: l.name,
                        certificateNumber: l.regNo,
                        issuer: l.issuer,
                        issuedDate: l.acquired,
                }))]
        }
        catch (error) {
            console.log(error);
            return;
        }
        router.push({ name: 'ResumeEssay', params: { applicantSlug } })
    }
</script>

<style scoped></style>
