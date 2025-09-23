<!-- ApplicantResumeBasic.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <!-- Top Title -->
        <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <!-- Panel: 기본정보 -->
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
            <h2 class="font-bold">
                기본정보 <span class="text-rose-500 text-xs align-top">* 필수항목</span>
            </h2>
            </header>

            <div class="mt-6 space-y-6">
            <!-- 영문이름 / 생년월일 -->
            <div class="grid grid-cols-12 gap-4 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-balck">한글이름</span>
                </label>
                <input 
                v-model.trim="form.korName"
                class="col-span-12 sm:col-span-4 rounded-md border border-slate-300 px-3 py-2"
                placeholder="성명"
                readonly
                />
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">영문이름</span>
                </label>
                <input
                v-model.trim="form.englishName"
                class="col-span-12 sm:col-span-4 rounded-md border border-slate-300 px-3 py-2"
                placeholder="First Last"
                />
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">생년월일</span>
                </label>
                <input
                v-model="form.birthDate"
                type="date"
                class="col-span-12 sm:col-span-4 rounded-md border border-slate-300 px-3 py-2"
                />
            </div>

            <!-- 성별 / 국적 -->
            <div class="grid grid-cols-12 gap-4 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">성별</span>
                </label>
                <div class="col-span-12 sm:col-span-4 flex gap-4">
                <label class="inline-flex items-center gap-2">
                    <input type="radio" value="M" v-model="form.gender" /> 남
                </label>
                <label class="inline-flex items-center gap-2">
                    <input type="radio" value="F" v-model="form.gender" /> 여
                </label>
                </div>
                <label class="col-span-12 sm:col-span-2 font-semibold sm:text-right">
                    <span class="text-red-500">* </span>
                    <span class="text-black">국적</span>
                </label>
                <select v-model="form.nationality" class="col-span-12 sm:col-span-4 rounded-md border border-slate-300 px-3 py-2">
                <option disabled value="">----- 선택 -----</option>
                        <option value="KOR">대한민국</option>
                        <option value="USA">미국</option>
                        <option value="CHN">중국</option>
                        <option value="JPN">일본</option>
                        <option value="GBR">영국</option>
                        <option value="DEU">독일</option>
                        <option value="FRA">프랑스</option>
                        <option value="CAN">캐나다</option>
                        <option value="AUS">호주</option>
                        <option value="IND">인도</option>
                        <option value="RUS">러시아</option>
                        <option value="BRA">브라질</option>
                        <option value="MEX">멕시코</option>
                        <option value="ITA">이탈리아</option>
                        <option value="ESP">스페인</option>
                        <option value="SGP">싱가포르</option>
                        <option value="VNM">베트남</option>
                        <option value="PHL">필리핀</option>
                        <option value="THA">태국</option>
                        <option value="IDN">인도네시아</option>
                        <option value="OTHER">기타</option>
                </select>
            </div>
            
            </div>
        </section>

        <!-- Panel: 인적사항 -->
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
            <h2 class="font-bold">
                인적사항 <span class="text-rose-500 text-xs align-top">* 필수항목</span>
            </h2>
            </header>

            <div class="mt-6 grid grid-cols-12 gap-6">
            <!-- 사진 -->
            <div class="col-span-12 sm:col-span-4">
                <div
                class="relative aspect-[4/5] w-full max-w-[200px] rounded-md border border-dashed border-slate-300 bg-slate-50 overflow-hidden"
                >
                <img
                    v-if="photoPreview"
                    :src="photoPreview"
                    alt="증명사진 미리보기"
                    class="absolute inset-0 w-full h-full object-cover"
                />
                <span 
                v-else 
                class="absolute inset-0 flex items-center justify-center text-slate-500 text-sm"
                >
                    160×200<br />사진 업로드
                </span>
                </div>

                <div class="mt-3 flex gap-2">
                <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
                <button type="button" class="rounded-md bg-slate-800 text-white px-4 py-2 text-sm" @click="triggerFile">
                    사진등록
                </button>
                <button type="button" class="rounded-md border px-4 py-2 text-sm" @click="clearPhoto">
                    삭제
                </button>
                </div>
            </div>

            <!-- 주소/연락처 -->
            <div class="col-span-12 sm:col-span-8 space-y-4">
                <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-3 font-semibold">주소</label>
                <input v-model.trim="form.address" class="col-span-12 sm:col-span-9 rounded-md border border-slate-300 px-3 py-2" placeholder="현주소" />
                </div>
                <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-3 font-semibold">우편번호</label>
                <div class="col-span-12 sm:col-span-9 flex gap-2">
                    <input v-model.trim="form.zip" class="w-32 rounded-md border border-slate-300 px-3 py-2" placeholder="우편번호" />
                    <button type="button" class="rounded-md border px-3 py-2">검색</button>
                </div>
                </div>
                <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-3 font-semibold">특기</label>
                <input v-model.trim="form.specialty" class="col-span-12 sm:col-span-9 rounded-md border border-slate-300 px-3 py-2" />
                </div>
                <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-3 font-semibold">취미</label>
                <input v-model.trim="form.hobbies" class="col-span-12 sm:col-span-9 rounded-md border border-slate-300 px-3 py-2" />
                </div>
            </div>
            </div>
        </section>
        </main>

        <!-- Footer navigation -->
        <footer class="sticky bottom-0 bg-white border-t">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
            <button type="button" class="rounded-md bg-sky-600 px-6 py-2 text-white" @click="goNext">다음</button>
        </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useResumeStore } from '@/stores/resumeStore'
import ResumeHeader from './ResumeHeader.vue'
import applicantApi from '@/api/applicantApi'

const router = useRouter()
const route = useRoute()
const applicantSlug = route.params.applicantSlug

const pageRef = ref(null)

const resumeStore = useResumeStore();

// 폼 상태
const form = ref({
    korName: '',
    englishName: '',
    birthDate: '',
    gender: '',
    nationality: 'KOR',
    address: '',
    zip: '',
    hobbies: '',
    specialty: '',
})

// 사진 업로드
const fileInput = ref(null)
const photoPreview = ref('')
let objectUrl // revoke 용

// ======================
// onMounted 초기화
// ======================
onMounted(async () => {
    await resumeStore.fetchResumeAndTemplate();

    if (!resumeStore.canAccess()) {
        alert('접근할 수 없는 페이지입니다.')
        router.push({ name: 'ApplicantLogin', params: { companySlug: route.params.companySlug }})
        return
    }

    const resume = resumeStore.resume
    console.log("onMounted basic resume : ", resume)
    form.value.korName = resume?.name || ''

    if (resume?.basic) {
        Object.assign(form.value, {
        englishName: resume.basic.englishName || '',
        birthDate: resume.basic.birthDate || '',
        gender: resume.basic.gender || '',
        nationality: resume.basic.nationality || 'KOR',
        address: resume.basic.address || '',
        zip: resume.basic.zip || '',
        hobbies: resume.basic.hobbies || '',
        specialty: resume.basic.specialty || '',
        position: resume.basic.position || '',
        })
        if (resume.basic.profileImageUrl) {
            photoPreview.value = resume.basic.profileImageUrl;
        }
    }
})
    

// ======================
// 파일 업로드 관리
// ======================
const MAX_MB = 5
    
function triggerFile() {
    fileInput.value?.click()
}
    
function onFileChange(e) {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.')
        e.target.value = ''
        return
    }
    if (f.size > MAX_MB * 1024 * 1024) {
        alert('최대 5MB까지 업로드 가능합니다.')
        e.target.value = ''
        return
    }
    // if (objectUrl) URL.revokeObjectURL(objectUrl)
    // objectUrl = URL.createObjectURL(f)
    if (photoPreview.value) URL.revokeObjectURL(photoPreview.value)
    photoPreview.value = URL.createObjectURL(f)

    // photoUrl.value = objectUrl
    // form.value.photoUrl = objectUrl // <- 폼에도 반영
}

function clearPhoto() {
    if (photoPreview.value) URL.revokeObjectURL(photoPreview.value)
    photoPreview.value = ""
    if (fileInput.value) fileInput.value = ""
}

onBeforeUnmount(() => {
    if (objectUrl) URL.revokeObjectURL(objectUrl)
})

// ======================
// 검증 로직
// ======================
function validateForm() {
  const requiredFields = {
    korName: '한글이름을 입력해주세요.',
    englishName: '영문이름을 입력해주세요.',
    birthDate: '생년월일을 입력해주세요.',
    nationality: '국적을 선택해주세요.',
    gender: '성별을 입력해주세요.',
    address: '주소를 입력해주세요.',
    zip: '우편번호를 입력해주세요.',
  }

  for (const [key, msg] of Object.entries(requiredFields)) {
    if (!form.value[key]) {
      alert(msg)
      return false
    }
  }

  const noPhoto =
    (!photoPreview.value || photoPreview.value.trim() === "")

  if (noPhoto) {
    alert('사진을 첨부해주세요.')
    return false
  }

  return true
}

// ======================
// 저장 & 다음 단계 이동
// ======================
async function save() {
    if (!validateForm()) return false

    const formData = new FormData();

    // JSON → String 변환해서 넣기
    formData.append("basic", new Blob([JSON.stringify(form.value)], { type: "application/json" }));

    // 파일 추가
    if (fileInput.value.files[0]) {
      formData.append("profileImage", fileInput.value.files[0]);
    }   

    try {
        const res = await applicantApi.post(`/resumes/basic`, formData);

        console.log("Basic info saved:", res.data);
        // 저장된 기본정보를 store에 반영
        resumeStore.resume.basic = {
            englishName: res.data.englishName,
            birthDate: res.data.birthDate,
            gender: res.data.gender,
            nationality: res.data.nationality,
            address: res.data.address,
            zip: res.data.zip,
            hobbies: res.data.hobbies,
            specialty: res.data.specialty,
            position: res.data.position,
            profileImageUrl: res.data.profileImageUrl,
        }

        console.log("Resume store updated:", resumeStore.resume);
        alert("저장 완료했습니다.")
        return true
    }
    catch (error) {
        if (error.response) {
            console.error("에러 응답:", error.response.data);
            alert(error.response.data?.message || "기본 정보 저장 실패");
        }
        return false
    }
}

async function goNext() {
    const success = await save()
    if (success) {
        router.push({ name: 'ResumeAcademicInfo', params: { applicantSlug } })
    }
}


defineExpose({ save })

</script>


<style scoped></style>
