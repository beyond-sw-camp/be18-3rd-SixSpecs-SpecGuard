<template>
  <div>
    <!-- Header 탭 -->
    <ResumeHeader @tabClick="handleTabClick" />

    <!-- 현재 페이지 렌더링 -->
    <router-view v-slot="{ Component }">
      <component
        :is="Component"
        ref="currentPageRef"
        :applicantSlug="applicantSlug"
      />
    </router-view>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import ResumeHeader from "./ResumeHeader.vue"

const router = useRouter()
const route = useRoute()

const applicantSlug = route.params.applicantSlug
const currentPageRef = ref(null) // 현재 페이지 인스턴스

// 탭 클릭 이벤트 처리
async function handleTabClick(to) {
  if (currentPageRef.value?.save) {
    const success = await currentPageRef.value.save()
    if (!success) return // 저장 실패 시 이동 차단
  }
  router.push(to)
}
</script>
