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
        to="/company/register"
        class="block rounded-[28px] bg-amber-400 p-10 shadow-sm ring-1 ring-black/5 hover:brightness-95 transition"
    >
        <div class="mx-auto flex h-56 w-full items-center justify-center">
        <!-- building icon -->
        <svg class="w-40 h-40 text-white" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
            <rect x="10" y="18" width="44" height="34" rx="2"></rect>
            <rect x="18" y="26" width="6" height="6" fill="#fff"></rect>
            <rect x="28" y="26" width="6" height="6" fill="#fff"></rect>
            <rect x="38" y="26" width="6" height="6" fill="#fff"></rect>
            <rect x="18" y="36" width="6" height="6" fill="#fff"></rect>
            <rect x="28" y="36" width="6" height="6" fill="#fff"></rect>
            <rect x="38" y="36" width="6" height="6" fill="#fff"></rect>
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
            <circle cx="32" cy="22" r="10" fill="white" stroke="white"></circle>
            <path d="M12 52c0-8 12-14 20-14s20 6 20 14" stroke="white" stroke-linecap="round"></path>
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
