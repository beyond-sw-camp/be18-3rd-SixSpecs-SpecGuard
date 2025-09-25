<template>
    <div class="min-h-screen bg-white text-slate-900">
        <header class="sticky top-0 z-30 bg-slate-800 text-white">
        <div class="mx-auto max-w-10xl h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div class="flex items-end gap-3">
            
        <RouterLink 
            :to="authStore.isLoggedIn && companySlug
                ? `/c/${companySlug}/dashboard` 
                : '/'"
            class="text-2xl font-extrabold tracking-tight hover:text-amber-400 transition-colors">
            SPECGUARD
        </RouterLink>


            <span class="text-[11px] leading-none text-slate-300 mb-1">이력 검증 시스템</span>
            </div>
            <div class="flex items-center gap-6">
            <RouterLink :to="{ name: 'CompanyInvite', params: { companySlug } }" class="rounded-md bg-amber-400 text-slate-900 px-4 py-1.5 text-sm font-semibold hover:bg-amber-300">초대하기</RouterLink>
            <button class="p-1 hover:text-amber-300" aria-label="알림">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"/></svg>
            </button>
            <button class="p-1 hover:text-amber-300" @click="goMyPage('CompanyOwnerMypage')" aria-label="계정">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </button>
            <button class="p-1 hover:text-amber-300" aria-label="공유">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 12h6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            </button>
            <button class="p-1 hover:text-red-500" aria-label="로그아웃" @click="logout">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
            </button>
            </div>
        </div>
        </header>

        <div class="mx-auto max-w-10xl grid grid-cols-12 gap-6 pl-4 sm:pl-6 lg:pl-8 pr-0 py-6">
        <!-- Sidebar -->
        <transition name="fade-slide" mode="out-in">
            <!-- 펼친 상태 -->
            <aside v-if="sidebarOpen"
                class="col-span-12 sm:col-span-3 lg:col-span-2 sticky top-20">
            <div class="bg-amber-400/90 rounded-2xl p-4 flex flex-col gap-4
                        max-h-[calc(100svh-5rem)] overflow-auto">
                <div class="flex items-center justify-between">
                <button class="p-2" aria-label="메뉴">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                <button class="p-2 rotate-180" aria-label="사이드바 토글"
                        @click="toggleSidebar" :aria-pressed="sidebarOpen" :aria-expanded="sidebarOpen">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m15 19-7-7 7-7"/>
                    </svg>
                </button>
                </div>

                <div class="rounded-xl bg-white/80 px-4 py-5 text-center text-2xl font-extrabold tracking-tight">
                {{ userName }} 님
                </div>

                <div class="space-y-2">
                <div class="flex items-center gap-2 text-slate-800">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-4.35-4.35M11 5a6 6 0 100 12 6 6 0 000-12z"/>
                    </svg>
                    검색
                </div>

                <div class="flex items-center gap-2 text-slate-800">
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    class="w-6 h-6 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.25 18.75h-4.5m9-5.25V11a6.75 6.75 0 10-13.5 0v2.5c0 .71-.21 1.39-.6 1.95l-1.2 1.7h17.1l-1.2-1.7a3.25 3.25 0 01-.6-1.95z" />
                </svg>
                    알림
                </div>
                </div>

                <hr class="border-slate-700/30 my-2">


                <details open class="group">
                <summary class="list-none flex items-center justify-between rounded-lg bg-slate-900/10 px-3 py-2 font-semibold">
                    <span>공고 관리</span>
                    <svg class="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </summary>
                <div class="mt-2 rounded-xl bg-white/80 p-3 shadow-sm">
                    <ul class="list-disc pl-5 text-sm leading-8">
                    <li><button class="hover:underline" @click="pageMove('CompanyDashboard')">채용공고 조회</button></li>
                    <li><button class="hover:underline" @click="pageMove('CompanyCreatePostBasic')">채용공고 생성</button></li>
                    </ul>
                </div>
                </details>

                <details class="group">
                <summary class="list-none flex items-center justify-between rounded-lg bg-slate-900/10 px-3 py-2 font-semibold">
                    <span>통계 및 리포트</span>
                    <svg class="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </summary>
                <div class="mt-2 rounded-xl bg-white/80 p-3 shadow-sm">
                    <ul class="list-disc pl-5 text-sm leading-8">
                    <li><button class="hover:underline" @click="onReport('dashboard')">대쉬보드</button></li>
                    <li><button class="hover:underline" @click="onReport('applicants')">지원자 목록</button></li>
                    <li><button class="hover:underline" @click="onReport('results')">합격/불합격 분석</button></li>
                    </ul>
                </div>
                </details>

                <details class="group">
                <summary class="list-none flex items-center justify-between rounded-lg bg-slate-900/10 px-3 py-2 font-semibold">
                    <span>설정</span>
                    <svg class="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </summary>
                <div class="mt-2 rounded-xl bg-white/80 p-3 shadow-sm">
                    <ul class="list-disc pl-5 text-sm leading-8">
                    <li><button class="hover:underline" @click="pageMove('CompanyEvaluationWeightList')">가중치 생성/수정</button></li>
                    <!-- <li><button class="hover:underline" @click="pageMove('CompanyEvaluationWeightUpdate')">가중치 프로필 수정</button></li> -->
                    </ul>
                </div>
                </details>
            </div>
            </aside>

            <!-- 접힘 상태: 얇은 레일 -->
            <aside v-else class="hidden sm:block lg:col-span-1 sm:col-span-1 col-span-12 sticky top-20">
            <div class="bg-amber-400/90 rounded-2xl w-12
                        max-h-[calc(100svh-5rem)] flex flex-col items-center py-3 gap-3">
                <button class="p-2" aria-label="사이드바 펼치기" @click="toggleSidebar">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                </svg>
                </button>
            </div>
            </aside>
        </transition>
        
        <main :class="sidebarOpen
            ? 'col-span-12 lg:col-span-10'
            : 'col-span-12 lg:col-span-11'">
        <RouterView :companySlug="companySlug" />
        </main>
    </div>
</div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter,} from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/axios';

const authStore = useAuthStore();
const router = useRouter()
const route = useRoute()

const companySlug = computed(() => authStore.companySlug)
const managerSlug  = computed(() => authStore.managerSlug)
const isOwner      = computed(() => authStore.role === 'OWNER' || authStore.isOwner === true)


onMounted(async () => {
   // 1) 기본값: 캐시 → authStore
   userName.value = authStore?.user?.name || '사용자'

   // 2) 유효한 slug 확보
   const slug = companySlug.value || route.params.companySlug
   if (!slug) return

   // 3) 새 응답 스키마 대응
   try {
     const { data } = await api.get(`/company/${slug}/users/me`)
    const { user } = data ?? {}
    const name = user?.name || authStore?.user?.name

     if (name) {
       userName.value = name
       sessionStorage.setItem('specguard.ownerName', name)
     }
   } catch (e) {
     console.debug('[SG]/me fetch failed', e?.response?.status, e?.message)
   }
 })

function logout() {
    if (authStore.isLoggedIn) {
        authStore.logout();
        router.push({ name : 'CompanyLogin'})
    }
}

function pageMove(name, extraParams = {}, query) {
    router.push({
        name,
        params: { companySlug: companySlug.value, ...extraParams },
        query,
    })
}

function goMyPage() {
    if (!companySlug.value) return
    if (isOwner.value) {
        pageMove('CompanyOwnerMypage')
    } else {
        if (!managerSlug.value) return
        pageMove('CompanyManagerMypage', { managerSlug: managerSlug.value })
    }
}
// 사이드바 오픈
const sidebarOpen = ref(true)
function toggleSidebar() { sidebarOpen.value = !sidebarOpen.value }

// 사용자명
const userName = ref('')

</script>