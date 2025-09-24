<template>
  <div class="min-h-screen bg-white text-slate-900">
    <!-- Header -->
    <header class="sticky top-0 z-30 bg-slate-800 text-white">
      <div class="mx-auto max-w-10xl h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="flex items-end gap-3">
          <span class="text-2xl font-extrabold tracking-tight">SPECGUARD</span>
          <span class="text-[11px] leading-none text-slate-300 mb-1">이력 검증 시스템</span>
        </div>
        <div class="flex items-center gap-6">
          <RouterLink
            v-if="companySlug"
            :to="{ name: 'CompanyInvite', params: { companySlug } }"
            class="rounded-md bg-amber-400 text-slate-900 px-4 py-1.5 text-sm font-semibold hover:bg-amber-300"
          >
            초대하기
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Body -->
    <main class="mx-auto max-w-6xl px-6 py-12">
      <div class="mx-auto max-w-md bg-white rounded-2xl shadow-sm p-8 text-center">
        <h2 class="text-2xl font-extrabold">회원가입 방법 선택</h2>

        <p v-if="errorMessage" class="mt-3 text-sm font-semibold text-red-600">{{ errorMessage }}</p>

        <div class="mt-5 space-y-1 text-sm">
          <p>초대받은 이메일: <span class="font-semibold">{{ inviteInfo?.email }}</span></p>
          <p>회사: <span class="font-semibold">{{ inviteInfo?.companyName }}</span></p>
          <p>역할: <span class="font-semibold">{{ inviteInfo?.role }}</span></p>
        </div>
        <div class="mt-8 space-y-3">
          <button
            @click="goForm"
            class="w-full rounded-md bg-amber-400 text-slate-900 px-4 py-2 font-semibold hover:bg-amber-300"
          >
            직접 정보 입력하기
          </button>
          <button
            @click="goGoogleLogin"
            class="w-full rounded-md bg-amber-400 text-slate-900 px-4 py-2 font-semibold hover:bg-amber-300"
          >
            구글로 가입하기
          </button>
          <button
            @click="goNaverLogin"
            class="w-full rounded-md bg-amber-400 text-slate-900 px-4 py-2 font-semibold hover:bg-amber-300"
          >
            네이버로 가입하기
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import api from "@/api/axios"

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/,"")

// 먼저 라우터 훅과 토큰
const route = useRoute()
const router = useRouter()
const token = String(route.query.token || "")

// 초대 정보
const inviteInfo = ref(null)

// 헤더용 companySlug
const companySlug = computed(() =>
  inviteInfo.value?.companySlug || route.params.companySlug || route.query.companySlug || ""
)

// 에러 메시지
const errorMessage = ref(route.query.message || null)

onMounted(async () => {
  try {
    const res = await api.get(`/auth/signup/invite/check?token=${encodeURIComponent(token)}`)
    inviteInfo.value = res.data
  } catch (err) {
    console.error("초대 검증 실패:", err)
  }
})

const goForm = () => {
  router.push({ name: "CompanyInviteSignup", query: { token } });
}
const goNaverLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/naver?inviteToken=${token}`;
};
const goGoogleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google?inviteToken=${token}`;
};
</script>

<style scoped>

</style>