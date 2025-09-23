<template>
  <div>로그인 중입니다... 잠시만 기다려주세요.</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    //  최초 OAuth2 로그인 → Refresh 쿠키 기반으로 AccessToken 발급
    await authStore.loginWithOAuth2();

    //  로그인 성공 후 대시보드 이동
    const slug = authStore.companySlug;
    router.push(`/c/${slug}/dashboard`);
  } catch (err) {
    console.error("OAuth2 토큰 발급 실패", err);
    router.push("/company/login"); // 실패 시 로그인 페이지로
  }
});
</script>