<template>
  <div class="oauth2-failure">
    <h2>소셜 로그인 실패</h2>
    <p class="error-msg">{{ displayMessage }}</p>

    <div class="actions">
      <button @click="goLogin">로그인 페이지로 가기</button>
      <button v-if="token" @click="goInvite">초대 가입으로 돌아가기</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";

// ✅ props로 받아오기
const props = defineProps({
  code: { type: String, default: "UNKNOWN" },
  message: { type: String, default: "알 수 없는 오류가 발생했습니다." },
  token: { type: String, default: "" }
});

const router = useRouter();

const displayMessage = computed(() => props.message);

const goLogin = () => {
  router.push("/login");
};

const goInvite = () => {
  // ✅ 초대 페이지로 이동할 때 에러 메시지도 같이 전달
  router.push({
    path: "/signup/invite",
    query: {
      token: props.token,
      errorCode: props.code,
      errorMessage: props.message
    }
  });
};
</script>

<style scoped>
.error-msg {
  color: red;
  margin: 1rem 0;
}
.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:first-child {
  background: #2196f3;
  color: #fff;
}
button:last-child {
  background: #4caf50;
  color: #fff;
}
</style>