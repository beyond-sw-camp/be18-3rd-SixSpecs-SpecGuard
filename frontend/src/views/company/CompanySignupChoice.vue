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
<!-- Choice cards -->
<main class="mx-auto max-w-6xl px-6 py-12">
  <div class="grid place-items-center">
    <!-- 기업 회원가입 -->
    <RouterLink
      to="/company/signup/info"
      class="block rounded-[28px] bg-amber-400 p-10 shadow-sm ring-1 ring-black/5 hover:brightness-95 transition"
    >
      <!-- building icon -->
    <div class="text-8xl text-white text-center">🏢</div>

      <h3 class="mt-6 text-center text-2xl font-extrabold">기업 회원가입</h3>
      <p class="mt-3 text-center text-slate-900/80">
        기업이 등록되지 않은 경우<br />기업을 등록합니다
      </p>
    </RouterLink>

    <!-- 기업개인 회원가입 삭제 완료-->
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
