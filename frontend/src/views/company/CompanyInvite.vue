<template>
    <main class="mx-auto max-w-6xl px-6 py-12">
        <!-- form으로 감싸기 -->
        <form @submit.prevent="nextStep">
        <section class="rounded-[28px] bg-amber-400/90 p-10 shadow-sm ring-1 ring-black/5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

            <!-- 계정 정보 -->
            <div>
                <h2 class="text-2xl font-extrabold tracking-tight">초대 계정 정보</h2>
                <label class="mt-5 block text-sm font-semibold">계정 권한 *</label>
                <div class="mt-2 flex gap-3">
                <select v-model="form.role" required
                        class="flex-1 rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none">
                    <option disabled value="">권한을 선택하세요</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="VIEWER">VIEWER</option>
                </select>
                </div>
                <p v-if="errors.role" class="mt-1 text-xs text-red-600">{{ errors.role }}</p>

                <label class="mt-5 block text-sm font-semibold">이메일 *</label>
                <div class="mt-2 flex gap-3">
                    <input v-model.trim="form.email" type="email" required
                            class="flex-1 rounded-md border border-slate-300 bg-slate-100 px-4 py-2 outline-none"/>
                </div>
                <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
                
            </div>

            <div>
                <h2 class="text-2xl font-extrabold tracking-tight">계정 권한 정보</h2>
                <br><br>
                <h3 class="text-1xl font-extrabold tracking-tight"> 
                    - MANABER <br> 
                    VIEWR의 권한을 포함하고 지원서 정합성 결과 열람/의견 작성 가능
                </h3>
                <br>
                <h3 class="text-1xl font-extrabold tracking-tight">
                    - VIEWER <br>
                    결과 열람만 가능한 권한이다.
                </h3>

            </div>


            <!-- next -->
            <div class="md:col-span-2 flex justify-end">
                <button type="submit"
                :disabled="!isValid"
                class="rounded-md px-6 py-2 font-semibold text-white
                        transition disabled:cursor-not-allowed
                        disabled:bg-slate-400 bg-slate-800 hover:bg-slate-700">
                다음
                </button>
            </div>
            </div>
        </section>
        </form>
    </main>
</template>

<script setup>

import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from "@/api/axios";
import { onMounted, ref } from "vue";
import { sendInvite } from "@/api/invite";
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();
const user = ref(authStore.user);
const companyName = ref("");

const router = useRouter()
const route = useRoute()
const companySlug = route.params.companySlug ?? authStore.companySlug ?? ''

const form = reactive({
  role: '',
  email: ''
})

const errors = reactive({
  role: '',
  email: ''
})

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const isValid = computed(() => validateAll())

function validateAll() {
  errors.role = form.role ? '' : '권한을 선택하세요.'
  errors.email = isEmail(form.email) ? '' : '이메일 형식이 올바르지 않습니다.'
  return !errors.role && !errors.email
}


async function nextStep() {
if (!validateAll()) return

try {
    // 초대 발송
    const email = (form.email ?? '').trim()
    const role  = form.role || 'VIEWER' // 미선택 시 기본값

    await sendInvite(companySlug, { email, role })
    alert('초대가 성공적으로 발송되었습니다!')
    } catch (err) {
    console.error('초대 실패:', err)
    alert('초대 중 오류가 발생했습니다.')
    return // 실패 시 저장·이동 중단
    }

    // 상태 저장 후 라우팅
    sessionStorage.setItem('specguard.signup.form', JSON.stringify({ ...form }))
    router.push({ name: 'CompanyDashboard', params: { companySlug } })
}

onMounted(async () => {
  if (!user.value && authStore.companySlug) {
    try {
      const res = await api.get(`/company/${authStore.companySlug}/users/me`, {
        headers: { Authorization: `Bearer ${authStore.accessToken}` },
      });
      user.value = res.data;
      authStore.user = res.data;
      localStorage.setItem("user", JSON.stringify(res.data));

      companyName.value = res.data.company?.name || "";
    } catch (err) {
      console.error("유저 정보 불러오기 실패", err);
    }
  } else if (user.value) {
    companyName.value = user.value.company?.name || "";
  }
});

</script>
