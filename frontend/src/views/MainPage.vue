<template>
  <div class="min-h-screen bg-white text-slate-900">
    <!-- Top Nav -->
    <header class="sticky top-0 z-30 bg-[#2C3E50] text-white border-b border-[#2C3E50]">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex items-end gap-2">
            <span class="text-2xl font-extrabold tracking-tight">SPECGUARD</span>
            <span class="text-[11px] leading-none text-slate-300 mb-1">이력 검증 시스템</span>
          </div>
          <button class="ml-6 hidden md:flex items-center gap-1 text-sm font-semibold">제품
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
          </button>
          <button class="hidden md:flex items-center gap-1 text-sm font-semibold">가격
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
          </button>
          <button class="hidden md:flex items-center gap-1 text-sm font-semibold">고객사례
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
        <div class="flex items-center gap-4">
          <!-- 라우팅 사용할 거면 RouterLink로 교체 -->
          <RouterLink
              v-if="!authStore.isLoggedIn"
              to="/company/login"
              class="rounded-xl px-6 py-3 font-semibold bg-amber-400 hover:bg-amber-300"
            >
              무료로 시작하기
            </RouterLink>

            <!-- 로그인 되어 있으면 대시보드로 -->
            <RouterLink
              v-else
              :to="`/c/${authStore.companySlug}/dashboard`"
              class="rounded-xl px-6 py-3 font-semibold bg-amber-400 hover:bg-amber-300"
            >
              대시보드
            </RouterLink>
          <div class="flex items-center gap-4 text-slate-300">
            <button aria-label="알림" class="p-1 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"/></svg>
            </button>
            <button v-if="authStore.isLoggedIn" aria-label="계정" class="p-1 hover:text-gray-300">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            </button>

            <!--<button v-if="authStore.isLoggedIn" aria-label="로그아웃" class="p-1 hover:text-white" @click="authStore.logout()">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M14 3h7m0 0v7m0-7L10 14"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10v11h11"/>
              </svg>
            </button>-->

        <!--로그아웃 이모지 문모양으로 바꿈-->
          <button
          v-if="authStore.isLoggedIn"
          aria-label="로그아웃"
          class="p-1 hover:text-white"
          @click="authStore.logout()">
          <svg xmlns="http://www.w3.org/2000/svg" 
              class="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
        </button>

          </div>
        </div>
      </nav>
    </header>

    <!-- Hero -->
    <section class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
        <span class="underline decoration-sky-400 decoration-4 underline-offset-8">당신이 상상한 만큼</span><br />
        <span class="mt-2 inline-block underline decoration-sky-400 decoration-4 underline-offset-8">채용 오퍼레이션이 쉬워집니다.</span>
      </h1>
      <p class="mt-6 text-lg text-slate-600">채용 프로세스에 필요한 모든 것을 원하는 대로 자동화할 수 있는 채용 관리 솔루션, SpecGuard</p>
      <div class="mt-8 flex items-center justify-center gap-4">
        <RouterLink to="/company/login" class="rounded-xl px-6 py-3 font-semibold bg-amber-400 hover:bg-amber-300">무료로 시작하기</RouterLink>
        <a href="/company/join" class="rounded-xl px-6 py-3 font-semibold bg-slate-900 text-white hover:bg-slate-800">멤버십 가입하기</a>
      </div>
    </section>

    <!-- Feature Cards -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article class="rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="text-lg font-bold">채용 워크플로우 자동화</h3>
          <p class="mt-3 text-sm text-slate-600">복잡한 프로세스 관리, 이제는 작업할 때</p>
        </article>
        <article class="rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="text-lg font-bold">AI 요약 및 정합성 분석</h3>
          <p class="mt-3 text-sm text-slate-600">이력서, 자소서 서류 검사 자동화</p>
        </article>
        <article class="rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="text-lg font-bold">지원자 통합 관리</h3>
          <p class="mt-3 text-sm text-slate-600">모든 지원자를 효율적으로 관리</p>
        </article>
        <article class="rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="text-lg font-bold">지원자 연락</h3>
          <p class="mt-3 text-sm text-slate-600">지원자의 합/불 여부 메일로 알림</p>
        </article>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
      © {{ year }} SpecGuard. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const year = new Date().getFullYear()
</script>

<style scoped>
@media (max-width: 640px) {
  .decoration-4 { text-decoration-thickness: 3px; }
}
</style>
