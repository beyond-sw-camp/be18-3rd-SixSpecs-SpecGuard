<template>
<div class="min-h-screen bg-white text-slate-900">
<!-- Topbar -->
<header class="bg-slate-800 text-white">
    <div class="mx-auto max-w-6xl h-16 px-6 flex items-center">
    <div class="flex items-end gap-3">
        <span class="text-2xl font-extrabold tracking-tight">SPECGUARD</span>
        <span class="ml-3 text-[11px] leading-none text-slate-300">이력 검증 시스템</span>
    </div>
    </div>
</header>

<!-- Choice cards -->
<main class="mx-auto max-w-6xl px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
    <!-- 기업 회원가입 -->
    <RouterLink
        to="/company/signup/info"
        class="block rounded-[28px] bg-amber-400 p-10 shadow-sm ring-1 ring-black/5 hover:brightness-95 transition"
    >
        <div class="mx-auto flex h-56 w-full items-center justify-center">
        <!-- building icon -->
        <svg class="w-40 h-40 text-white" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
            stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="7" width="12" height="14" rx="2"></rect>
            <path d="M9 7V4a2 2 0 0 1 2-2h7v19H15"></path>
            <path d="M6 10h2M10 10h2M6 14h2M10 14h2M6 18h2M10 18h2M16 10h2M16 14h2M16 18h2"></path>
        </svg>
        </div>
        <h3 class="mt-6 text-center text-2xl font-extrabold">기업 회원가입</h3>
        <p class="mt-3 text-center text-slate-900/80">
        기업이 등록되지 않은 경우<br />기업을 등록합니다
        </p>
    </RouterLink>

    <!-- 기업개인 회원가입 -->
    <RouterLink
        to="/company/user/register"
        class="block rounded-[28px] bg-amber-400 p-10 shadow-sm ring-1 ring-black/5 hover:brightness-95 transition"
    >
        <div class="mx-auto flex h-56 w-full items-center justify-center">
        <!-- person icon -->
        <svg class="w-40 h-40 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="6">
            <circle cx="12" cy="8" r="4" fill="#fff"></circle>
            <path d="M4 21a8 8 0 0 1 16 0" fill="none" stroke="#fff"
            stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        <h3 class="mt-6 text-center text-2xl font-extrabold">기업개인 회원가입</h3>
        <p class="mt-3 text-center text-slate-900/80">
        기업이 등록된 경우<br />기업의 개인 사용자를 등록합니다
        </p>
    </RouterLink>
    </div>
</main>
</div>
</template>

<script>
export default { name: 'CompanyJoin' }
</script>

<style scoped>
/* 필요 시 추가 스타일 */
</style>
