<!-- ResumeHeader.vue -->
<script setup>
import { computed, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useResumeStore } from "@/stores/resumeStore"
import { defineProps, defineEmits } from "vue"

const props = defineProps({ 
  currentTab: String 
})
const router = useRouter()
const route = useRoute()
const resumeStore = useResumeStore()

onMounted(async () => {
  await resumeStore.fetchResumeAndTemplate()
})

const template = computed(() => resumeStore.template)
const applicantSlug = computed(() => route.params.applicantSlug)
const companySlug = computed(() => route.params.companySlug)

const emit = defineEmits(["tabClick"])

// 탭 라우트 정의
const tabs = computed(() => [
  { label: "1 기본정보", to: { name: "ResumeBasicInfo", params: { applicantSlug: applicantSlug.value }}},
  { label: "2 학력/연구/NCS", to: { name: "ResumeAcademicInfo", params: { applicantSlug: applicantSlug.value }}},
  { label: "3 어학/자격", to: { name: "ResumeCertificateInfo", params: { applicantSlug: applicantSlug.value }}},
  { label: "4 자기소개서/역량기술서", to: { name: "ResumeEssay", params: { applicantSlug: applicantSlug.value }}},
  { label: "5 최종제출", to: { name: "ResumeSubmit", params: { applicantSlug: applicantSlug.value }}},
])

function isActive(to) {
  const a = router.resolve(to).path.replace(/\/+$/, "")
  const b = route.path.replace(/\/+$/, "")
  return a === b
}

function handleTabClick(to) {
  emit("tabClick", to)
}

// 나가는 건 되는데, 저장을 하고, 나가는 지는 모르겠어요...(사실 안되는 듯)
function goLogin() {
  try {
    // (선택) 저장 로직이 있다면 먼저 실행
    // await save()

    // 그 다음 로그인 페이지로 이동
    router.push(`/${companySlug.value}/applicant/login`)
  } catch (e) {
    console.error("저장 후 나가기 실패:", e)
    alert("저장에 실패했습니다. 다시 시도해주세요.")
  }
}

</script>


<template>
  <header class="bg-white shadow-sm">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-center">
      <!-- template 데이터가 로드된 후만 렌더링 -->
      <h1 v-if="template" class="text-lg sm:text-xl font-bold">
        [{{ companySlug }}] {{ template.name }}
        ({{ template.department }} / {{ template.yearsOfExperience }}년 이상)
      </h1>
      <h1 v-else class="text-gray-400">불러오는 중...</h1>
    </div>

      <!-- 저장 후 나가기 버튼만 만들었어요. -->
      <div class="w-full flex justify-end pr-6">
      <button
        type="button"
        class="rounded-md bg-rose-500 px-4 py-2 text-white text-sm font-semibold hover:bg-rose-600 disabled:opacity-50"
        :disabled="saving"
        @click="goLogin"
      >
        {{ saving ? '저장 중...' : '저장 후 나가기' }}
      </button>
      </div>

    <!-- 탭 네비게이션 -->
    <nav class="grid grid-cols-5 border-b text-sm font-semibold">
      <button
        v-for="tab in tabs"
        :key="tab.label"
        class="col-span-1 p-3 text-center border-b-4 hover:bg-slate-100"
        :class="isActive(tab.to) ? 'border-sky-600 text-sky-600 font-bold' : 'border-transparent'"
        @click="handleTabClick(tab.to)"
      >
        {{ tab.label }}
      </button>
    </nav>
  </header>

</template>