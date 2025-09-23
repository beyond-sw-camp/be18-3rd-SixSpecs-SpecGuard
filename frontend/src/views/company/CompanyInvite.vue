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
                    <option value="OWNER">OWNER</option>
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
                <h3 class="text-1xl font-extrabold tracking-tight"> - OWNER</h3>
                <br>
                <h4 class="text-1xl font-extrabold tracking-tight"> - MANABER</h4>
                <br>
                <h4 class="text-1xl font-extrabold tracking-tight"> - VIEWER</h4>

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

const router = useRouter()
const route = useRoute()

const companySlug = route.params.companySlug

const form = reactive({
  role: '',
  email: ''
})

const errors = reactive({
  role: '',
  email: ''
})

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

function validateAll() {
  errors.role = form.role ? '' : '권한을 선택하세요.'
  errors.email = isEmail(form.email) ? '' : '이메일 형식이 올바르지 않습니다.'
  return !errors.role && !errors.email
}

const isValid = computed(() => validateAll())

async function nextStep() {
  if (!validateAll()) return
  sessionStorage.setItem('specguard.signup.form', JSON.stringify({ ...form }))
  router.push({ name: 'CompanyDashboard', params: { companySlug } })
}
</script>
