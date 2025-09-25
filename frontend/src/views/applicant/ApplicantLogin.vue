<!-- ApplicantLogin.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <!-- Top Bar -->
        <header class="bg-[#2c3e50] text-white">
        <div class="mx-auto max-w-6xl px-6 py-4">
            <div class="flex items-end gap-3">

<!--왼쪽 상단 SPECGUARD 누르면, 메인 홈으로 들어가는 기능-->
<RouterLink 
  to="/" 
  class="text-3xl font-extrabold tracking-widest hover:text-amber-300 transition-colors"
>
  SPECGUARD
</RouterLink>
                
        <div class="mt-1 h-1 w-28 bg-white/80"></div>
            </div>
            <p class="sr-only">이력 검증 시스템</p>
        </div>
        </header>

        <!-- Main -->
        <main class="mx-auto max-w-6xl px-6 py-10">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
            <!-- Left: Login -->
            <section class="md:col-span-6">
            <form
                class="rounded-3xl bg-amber-400/90 p-8 shadow"
                @submit.prevent="onSubmit"
            >
                <h2 class="text-2xl font-extrabold mb-6">로그인</h2>

                <label for="userid" class="block text-sm font-semibold mb-2">이메일</label>
                <input
                id="userid"
                v-model.trim="userId"
                type="text"
                placeholder="이메일을 입력해주세요."
                class="w-full h-12 rounded-md border border-slate-300 px-4 bg-white/70 placeholder-slate-500"
                />

                <label for="password" class="block text-sm font-semibold mt-5 mb-2">비밀번호</label>
                <input
                id="password"
                v-model.trim="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                class="w-full h-12 rounded-md border border-slate-300 px-4 bg-white/70 placeholder-slate-500"
                />

                <button
                type="submit"
                class="mt-6 w-full h-12 rounded-md bg-[#2c3e50] text-white font-semibold"
                >
                로그인
                </button>

                <div class="mt-6 flex items-center justify-between text-sm text-white/90">
                <div class="space-x-4">
                    <RouterLink to="/find-id" class="underline underline-offset-2">아이디 찾기</RouterLink>
                    <RouterLink to="/reset-password" class="underline underline-offset-2">비밀번호 찾기</RouterLink>
                </div>
                    <RouterLink
                        v-if="selectedTemplateId"
                        :to="{ 
                            name: 'ApplicantSignup', 
                            params: { companySlug, applicantSlug: selectedTemplateId } 
                        }"  
                        class="underline underline-offset-2">회원 가입
                    </RouterLink>
                    <span v-else class="text-gray-400">템플릿을 선택해주세요</span>
                </div>
            </form>
            </section>

            <!-- Divider (mobile) -->
            <div class="md:hidden h-px bg-slate-300"></div>

            <!-- Right: Search + Job list -->
            <section class="md:col-span-6 md:pl-8 md:border-l md:border-slate-300">
            <!-- Search -->
            <div class="flex items-center gap-3">
                <input
                v-model.trim="q"
                type="text"
                placeholder="검색 내용을 입력하세요."
                class="w-full h-12 rounded-md border border-slate-300 px-4 placeholder-slate-400"
                @keyup.enter="onSearch"
                />
                <div
                    class="flex items-center justify-center h-12 px-4 rounded-r-md border border-slate-300 bg-slate-50 text-slate-400"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-5 h-5"
                    >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                    />
                    </svg>
                </div>
            </div>

            <ul class="mt-6 space-y-6">
                <li v-for="job in filteredTemplates" :key="job.id" @click="selectedTemplateId = job.id" class="cursor-pointer">
                <div 
                    class="block p-4 rounded-lg border"
                    :class="selectedTemplateId === job.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200'"
                    >
                    <h3 class="text-lg font-extrabold text-slate-700">{{ job.name }}</h3>
                    <p class="text-slate-500 text-sm mt-1">{{ job.description }}</p>
                </div>
                </li>
            </ul>
            </section>
        </div>
        </main>

        <!-- Footer spacer -->
        <div class="h-10"></div>
    </div>
    </template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink, useRoute } from 'vue-router'
import { useResumeStore } from '@/stores/resumeStore'
import axios from 'axios'

const resumeStore = useResumeStore();
const router = useRouter()
const route = useRoute()
const API = import.meta.env.VITE_API_URL;

// 로그인 폼
const userId = ref('')
const password = ref('')

// 검색어
const q = ref('')

const templates = ref([])
const selectedTemplateId =ref(null);

const filteredTemplates = computed(() => {
    if (!q.value) return templates.value
    const term = q.value.toLowerCase()
    return templates.value.filter(j => j.name.includes(term))
})

const companySlug = route.params.companySlug;

console.log("companySlug:", companySlug);

onMounted(async () => {
    try {
        const response = await axios.get(`${API}/api/v1/resumes/companies/${companySlug}/templates`);
        templates.value = (response.data.templates || []).map(t => t.basic);
        console.log("Fetched templates:", templates.value)
    } catch (error) {
        console.error("Error fetching templates:", error)
        alert("템플릿 목록을 불러오지 못했습니다.")
    }
});


async function onSubmit() {
    if (!selectedTemplateId.value) {
        alert("템플릿을 선택해주세요.");
        return;
    }
    
    try {
        const res = await axios.post(`${API}/api/v1/resumes/login`, {
            email: userId.value,
            password: password.value,
            templateId: selectedTemplateId.value
        }, {
            withCredentials: true
        });
        
        const selectedTemplate = templates.value.find(job => job.id === selectedTemplateId.value);
        if (!selectedTemplate) throw new Error("템플릿 선택이 잘못되었습니다.")

        // Store 업데이트
        resumeStore.template = selectedTemplate
        resumeStore.resume = res.data.resume

        console.log("Login successful, store updated:", resumeStore.template, resumeStore.resume)

        if (!resumeStore.canAccess()) {
            alert('제출 완료 했습니다.')
            router.push({ name: 'ApplicantLogin', params: { companySlug: route.params.companySlug }})
            return
        }
        
        router.push({
            name: 'ResumeBasicInfo',
            params: { companySlug, applicantSlug: selectedTemplateId.value }
        })

    } catch (error) {
        console.error("Login error:", error);
        alert(error.response?.data?.message || "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.")
    }
}

</script>

<!-- Tailwind은 프로젝트에 설정되어 있다고 가정. 개별 스타일 불필요 -->
<style scoped></style>
