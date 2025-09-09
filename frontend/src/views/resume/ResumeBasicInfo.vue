<!-- ApplicantResumeBasic.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <!-- Top Title -->
        <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-center">
            <h1 class="text-lg sm:text-xl font-bold">
            [SIXSPEC] 2025 우수인재 경력 채용 (DATA Intelligence 사업개발 및 제안)
            </h1>
        </div>

        <!-- Step Tabs -->
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
        </header>

        <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <!-- Panel: 기본정보 -->
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
            <h2 class="font-bold">
                기본정보 <span class="text-rose-500 text-xs align-top">* 필수항목</span>
            </h2>
            </header>

            <div class="mt-6 space-y-6">
            <!-- 영문이름 / 생년월일 -->
            <div class="grid grid-cols-12 gap-4 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">*한글이름</label>
                <input 
                v-model.trim="form.korName"
                class="col-span-12 sm:col-span-4 rounded-md border border-slate-300 px-3 py-2"
                placeholder="성명"
                />
                <label class="col-span-12 sm:col-span-2 font-semibold">*영문이름</label>
                <input
                v-model.trim="form.engName"
                class="col-span-12 sm:col-span-4 rounded-md border border-slate-300 px-3 py-2"
                placeholder="First Last"
                />
                <label class="col-span-12 sm:col-span-2 font-semibold">*생년월일</label>
                <input
                v-model="form.birth"
                type="date"
                class="col-span-12 sm:col-span-4 rounded-md border border-slate-300 px-3 py-2"
                />
            </div>

            <!-- 성별 / 국적 -->
            <div class="grid grid-cols-12 gap-4 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">성별</label>
                <div class="col-span-12 sm:col-span-4 flex gap-4">
                <label class="inline-flex items-center gap-2">
                    <input type="radio" value="M" v-model="form.gender" /> 남
                </label>
                <label class="inline-flex items-center gap-2">
                    <input type="radio" value="F" v-model="form.gender" /> 여
                </label>
                </div>
                <label class="col-span-12 sm:col-span-2 font-semibold sm:text-right">국적</label>
                <select v-model="form.nationality" class="col-span-12 sm:col-span-4 rounded-md border border-slate-300 px-3 py-2">
                <option disabled value="">----- 선택 -----</option>
                <option value="KOR">대한민국</option>
                <option value="OTHER">기타</option>
                </select>
            </div>

            <!-- 지원분야 -->
            <div class="grid grid-cols-12 gap-4 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">*지원분야</label>
                <select v-model="form.position" class="col-span-12 sm:col-span-10 rounded-md border border-slate-300 px-3 py-2">
                <!-- DB 연동 필요 -->
                <option disabled value="">----- 선택 -----</option>
                <option>데이터 인텔리전스 사업개발</option>
                <option>AI 엔지니어</option>
                <option>플랫폼 기획</option>
                </select>
            </div>
            </div>
        </section>

        <!-- Panel: 인적사항 -->
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
            <h2 class="font-bold">
                인적사항 <span class="text-rose-500 text-xs align-top">* 필수항목</span>
            </h2>
            </header>

            <div class="mt-6 grid grid-cols-12 gap-6">
            <!-- 사진 -->
            <div class="col-span-12 sm:col-span-4">
                <div
                class="relative aspect-[4/5] w-full max-w-[200px] rounded-md border border-dashed border-slate-300 bg-slate-50 overflow-hidden"
                >
                <img
                    v-if="photoUrl"
                    :src="photoUrl"
                    alt="증명사진 미리보기"
                    class="absolute inset-0 w-full h-full object-cover"
                />
                <span v-else class="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                    160×200<br />사진 업로드
                </span>
                </div>

                <div class="mt-3 flex gap-2">
                <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
                <button type="button" class="rounded-md bg-slate-800 text-white px-4 py-2 text-sm" @click="triggerFile">
                    사진등록
                </button>
                <button type="button" class="rounded-md border px-4 py-2 text-sm" @click="clearPhoto">
                    삭제
                </button>
                </div>
            </div>

            <!-- 주소/연락처 -->
            <div class="col-span-12 sm:col-span-8 space-y-4">
                <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-3 font-semibold">주소</label>
                <input v-model.trim="form.address" class="col-span-12 sm:col-span-9 rounded-md border border-slate-300 px-3 py-2" placeholder="현주소" />
                </div>
                <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-3 font-semibold">우편번호</label>
                <div class="col-span-12 sm:col-span-9 flex gap-2">
                    <input v-model.trim="form.zip" class="w-32 rounded-md border border-slate-300 px-3 py-2" placeholder="우편번호" />
                    <button type="button" class="rounded-md border px-3 py-2">검색</button>
                </div>
                </div>
                <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-3 font-semibold">특기</label>
                <input v-model.trim="form.skill" class="col-span-12 sm:col-span-9 rounded-md border border-slate-300 px-3 py-2" />
                </div>
                <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-3 font-semibold">취미</label>
                <input v-model.trim="form.hobby" class="col-span-12 sm:col-span-9 rounded-md border border-slate-300 px-3 py-2" />
                </div>
            </div>
            </div>
        </section>
        </main>

        <!-- Footer navigation -->
        <footer class="sticky bottom-0 bg-white border-t">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
            <button type="button" class="rounded-md border px-5 py-2" @click="saveDraft">임시저장</button>
            <button type="button" class="rounded-md bg-sky-600 px-6 py-2 text-white" @click="goNext">다음</button>
        </div>
        </footer>
    </div>
    </template>

    <script setup>
    import { ref, onBeforeUnmount } from 'vue'
    import { useRoute, useRouter, RouterLink } from 'vue-router'

    const router = useRouter()
    const route = useRoute()

    // 탭 라우트
    const tabs = [
    { label: '1 기본정보', to: '/resume/basic-info' },
    { label: '2 학력/연구/NCS', to: '/resume/academic-info' },
    { label: '3 어학/자격', to: '/resume/certificate-info' },
    { label: '4 자기소개서/역량기술서', to: '/resume/essay' },
    { label: '5 최종제출', to: '/resume/submit' },
    ]

    const isActive = (to) => route.path.toLowerCase() === to.toLowerCase()

    // 폼 상태
    const form = ref({
    engName: '',
    birth: '',
    gender: '',
    nationality: 'KOR',
    position: '데이터 인텔리전스 사업개발',
    address: '',
    zip: '',
    skill: '',
    hobby: '',
    })

    // 사진 업로드
    const fileInput = ref(null)
    const photoUrl = ref('')
    let objectUrl // revoke 용

    const MAX_MB = 5

    function triggerFile() {
    fileInput.value?.click()
    }

    function onFileChange(e) {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.')
        e.target.value = ''
        return
    }
    if (f.size > MAX_MB * 1024 * 1024) {
        alert('최대 5MB까지 업로드 가능합니다.')
        e.target.value = ''
        return
    }
    if (objectUrl) URL.revokeObjectURL(objectUrl)
    objectUrl = URL.createObjectURL(f)
    photoUrl.value = objectUrl
    }

    function clearPhoto() {
    if (objectUrl) URL.revokeObjectURL(objectUrl)
    objectUrl = undefined
    photoUrl.value = ''
    if (fileInput.value) fileInput.value.value = ''
    }

    onBeforeUnmount(() => {
    if (objectUrl) URL.revokeObjectURL(objectUrl)
    })

    // 하단 버튼
    function saveDraft() {
    // TODO: 임시저장 API 연동
    alert('임시저장 되었다고 가정')
    }
    function goNext() {
    router.push('/resume/academic-info')
    }
</script>

<style scoped></style>
