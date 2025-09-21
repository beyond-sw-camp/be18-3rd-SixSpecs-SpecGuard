<!-- ResumeAcademicResearch.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <!-- Title + Steps -->
        <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-center">
            <h1 class="text-lg sm:text-xl font-bold">
               [SIXSPEC] 2025 우수인재 경력 채용 (DATA Intelligence 사업개발 및 제안)
            </h1>
        </div>
        <!-- Step Tabs -->
        <nav class="grid grid-cols-5 border-b text-sm font-semibold">
            <button
                v-for="tab in tabs"
                :key="tab.to"
                class="col-span-1 p-3 text-center border-b-4 hover:bg-slate-100"
                :class="isActive(tab.to) ? 'border-sky-600 text-sky-600 font-bold' : 'border-transparent'"
                @click="handleTabClick(tab.to)">
                {{ tab.label }}
            </button>
        </nav>
        </header>

        <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <!-- High school -->
        <section class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
            <h2 class="font-bold">고등학교 <span class="text-rose-500 text-xs align-top">* 필수항목</span></h2>
            </header>

            <div class="mt-6 space-y-6">
            <!-- 고등학교 입학구분 -->
            <div class="flex flex-wrap gap-2 items-center text-sm">
            <span class="font-semibold">입학구분</span>
            <div role="radiogroup" class="flex flex-wrap gap-2">
                <button
                v-for="opt in highStatusOptions"
                :key="opt.value"
                type="button"
                role="radio"
                :aria-checked="highAdmissionStatus === opt.value"
                :class="chipClass(highAdmissionStatus === opt.value)"
                @click="highAdmissionStatus = opt.value"
                >
                {{ opt.label }}
                </button>
            </div>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">학교명</span>
                </label>
                <input v-model.trim="hs.school" class="col-span-12 sm:col-span-3 rounded-md border border-slate-300 px-3 py-2" />
                <label class="col-span-12 sm:col-span-2 font-semibold sm:text-right">
                    <span class="text-red-500">* </span>    
                    <span class="text-black">학교소재지</span>
                </label>

                <!-- 시/도 -->
                <select
                v-model="hs.city"
                class="col-span-6 sm:col-span-2 rounded-md border border-slate-300 px-3 py-2"
                >
                <option value="">시/도</option>
                <option v-for="s in cities" :key="s" :value="s">{{ s }}</option>
                </select>

                <!-- 구/군 -->
                <select
                v-model="hs.district"
                :disabled="!hsdistricts.length"
                class="col-span-6 sm:col-span-2 rounded-md border border-slate-300 px-3 py-2"
                >
                <option value="">구/군</option>
                <option v-for="g in hsdistricts" :key="g" :value="g">{{ g }}</option>
                </select>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">재학기간</span>
                </label>
                <input v-model="hs.periodStart" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <span class="col-span-0 text-center">~</span>
                <input v-model="hs.periodEnd" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <p class="col-span-12 sm:col-span-4 text-xs text-slate-500">2025.08.01 이전 졸업(예정)만 최종학력으로 인정</p>
            </div>
            </div>

            <div class="mt-6 flex justify-end gap-3"></div>
        </section>

        <!-- University basic -->
        <section v-if="univ.length === 0" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
                <h2 class="font-bold">대학교</h2>
                <button type="button" class="rounded-md border px-3 py-1" @click="addUniv">추가</button>
            </header>
            <p class="mt-4 text-sm text-slate-500">등록된 대학교가 없습니다.</p>
        </section>
        <section v-for="(u, i) in univ" :key="u.id" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
                <h2 class="font-bold">대학교 {{ i+1 }} <span class="text-rose-500 text-xs align-top">* 필수항목</span></h2>
                <div class="flex gap-2">
                <button type="button" class="rounded-md border px-3 py-1" @click="addUniv">추가</button>
                <button type="button" class="rounded-md border px-3 py-1" @click="removeUniv(i)">삭제</button>
                </div>
            </header>

            <div class="mt-6 space-y-6">
            <!-- 대학교 학위구분 -->
            <div class="flex flex-wrap gap-2 items-center text-sm">
            <span class="font-semibold">학위구분</span>
            <div role="radiogroup" class="flex flex-wrap gap-2">
                <button
                v-for="opt in univDegreeOptions"
                :key="opt.value"
                type="button"
                role="radio"
                :aria-checked="u.degree === opt.value"
                :class="chipClass(u.degree === opt.value)"
                @click="u.degree = opt.value"
                >
                {{ opt.label }}
                </button>
            </div>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">학교명</span>
                </label>
                <input v-model.trim="u.school" class="col-span-12 sm:col-span-3 rounded-md border px-3 py-2" />
                <label class="col-span-12 sm:col-span-2 font-semibold sm:text-right">
                    <span class="text-red-500">* </span>
                    <span class="text-balck">학교소재지</span>
                </label>
                <div class="col-span-12 sm:col-span-4 flex gap-2">
                <select v-model="u.city" class="flex-1 rounded-md border px-3 py-2">
                    <option value="">시/도</option>
                    <option v-for="s in cities" :key="s" :value="s">{{ s }}</option>
                </select>
                <select v-model="u.district" :disabled="!univDistricts(u.city).length" 
                        class="flex-1 rounded-md border px-3 py-2">
                    <option value="">구/군</option>
                    <option v-for="g in univDistricts(u.city)" :key="g" :value="g">{{ g }}</option>
                </select>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">재학기간</span>
                </label>
                <input v-model="u.periodStart" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <span class="col-span-0 text-center">~</span>
                <input v-model="u.periodEnd" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <p class="col-span-12 sm:col-span-4 text-xs text-slate-500">2025.08.01 이전 졸업(예정)만 최종학력으로 인정</p>
            </div>

            <div class="flex flex-wrap gap-2 items-center text-sm">
                <span class="font-semibold">입학구분</span>
                <div class="flex flex-wrap gap-2">
                <button :class="chipClass(u.admission === 'REGULAR')" @click="u.admission = 'REGULAR'">일반</button>
                <button :class="chipClass(u.admission === 'TRANSFER')" @click="u.admission = 'TRANSFER'">편입</button>
                </div>
            </div>

            <div class="flex flex-wrap gap-2 items-center text-sm">
                <span class="font-semibold">졸업구분</span>
                <div class="flex flex-wrap gap-2">
                <button :class="chipClass(u.gradStatus === 'ENROLLED')" @click="u.gradStatus = 'ENROLLED'">재학</button>
                <button :class="chipClass(u.gradStatus === 'GRADUATED')" @click="u.gradStatus = 'GRADUATED'">졸업</button>
                <button :class="chipClass(u.gradStatus === 'EXPECTED')" @click="u.gradStatus = 'EXPECTED'">졸업예정</button>
                <button :class="chipClass(u.gradStatus === 'WITHDRAWN')" @click="u.gradStatus = 'WITHDRAWN'">중퇴</button>
                <button :class="chipClass(u.gradStatus === 'LEAVE_OF_ABSENCE')" @click="u.gradStatus = 'LEAVE_OF_ABSENCE'">휴학</button>
                </div>
            </div>
            <!-- </div>
        
            <div class="mt-6 space-y-6"> -->
            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">학과/전공</label>
                <div class="col-span-12 sm:col-span-10 flex gap-2">
                <select v-model="u.majorGroup" class="flex-1 rounded-md border px-3 py-2">
                    <option value="" disabled>학과계열 선택</option>
                    <option v-for="g in majorGroups" :key="g" :value="g">{{ g }}</option>
                </select>
                <select v-model="u.major" :disabled="!univMajors(u.majorGroup).length" class="flex-1 rounded-md border px-3 py-2">
                    <option value="" disabled>전공계열 선택</option>
                    <option v-for="m in univMajors(u.majorGroup)" :key="m" :value="m">{{ m }}</option>
                </select>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">성적</span>
                </label>
                <div class="col-span-12 sm:col-span-10 flex gap-2">
                <input 
                    type="number"
                    step="0.01"
                    v-model.number="u.gpa"
                    class="rounded-md border px-3 py-2 w-20" 
                    placeholder="평점"
                    min="0" 
                    :max="u.maxGpa"
                    @input="enforceMax(u)"
                />
                <select v-model.number="u.maxGpa" class="rounded-md border px-3 py-2">
                    <option disabled value="">--- 총점 ---</option>
                    <option value="4.0">4.0점</option>
                    <option value="4.5">4.5점</option>
                    <option value="5.0">5.0점</option>
                </select>
                </div>
            </div>
            </div>
        </section>

        <!-- Graduate school -->
        <section v-if="grad.length === 0" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
                <h2 class="font-bold">대학원</h2>
                <button type="button" class="rounded-md border px-3 py-1" @click="addGrad">추가</button>
            </header>
            <p class="mt-4 text-sm text-slate-500">등록된 대학원이 없습니다.</p>
        </section>

        <section v-for="(g, i) in grad" :key="g.id" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
                <h2 class="font-bold">대학원 {{ i+1 }} <span class="text-rose-500 text-xs align-top">* 필수항목</span></h2>
                <div class="flex gap-2">
                <button type="button" class="rounded-md border px-3 py-1" @click="addGrad">추가</button>
                <button type="button" class="rounded-md border px-3 py-1" @click="removeGrad(i)">삭제</button>
                </div>
            </header>

            <div class="mt-6 space-y-6">
            <div class="flex flex-wrap gap-2 items-center text-sm">
                <span class="font-semibold">학위구분</span>
                <div role="radiogroup" class="flex flex-wrap gap-2">
                <button
                v-for="opt in gradDegreeOptions"
                :key="opt.value"
                type="button"
                role="radio"
                :aria-checked="g.degree === opt.value"
                :class="chipClass(g.degree === opt.value)"
                @click="g.degree = opt.value"
                >
                {{ opt.label }}
                </button>
            </div>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">학교명</span>
                </label>
                <input v-model.trim="g.school" class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2" />
                <label class="col-span-12 sm:col-span-2 font-semibold sm:text-right">
                    <span class="text-red-500">* </span>
                    <span class="text-black">학교소재지</span>
                </label>
                <div class="col-span-12 sm:col-span-4 flex gap-2">
                <select v-model="g.city" class="flex-1 rounded-md border px-3 py-2">
                    <option value="">시/도</option>
                    <option v-for="s in cities" :key="s" :value="s">{{ s }}</option>
                </select>
                <select v-model="g.district" :disabled="!gradDistricts(g.city).length" class="flex-1 rounded-md border px-3 py-2">
                    <option value="">구/군</option>
                    <option v-for="d in gradDistricts(g.city)" :key="d" :value="d">{{ d }}</option>
                </select>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-balck">재학기간</span>
                </label>
                <input v-model="g.periodStart" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <span class="col-span-0 text-center">~</span>
                <input v-model="g.periodEnd" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <p class="col-span-12 sm:col-span-4 text-xs text-slate-500">2025.08.01 이전 졸업(예정)만 최종학력으로 인정</p>
            </div>

            <div class="flex flex-wrap gap-2 items-center text-sm">
                <span class="font-semibold">입학구분</span>
                <button :class="chipClass(g.admission === 'REGULAR')" @click="g.admission = 'REGULAR'">일반</button>
                <button :class="chipClass(g.admission === 'TRANSFER')" @click="g.admission = 'TRANSFER'">편입</button>
            </div>

            <div class="flex flex-wrap gap-2 items-center text-sm">
                <span class="font-semibold">졸업구분</span>
                <button :class="chipClass(g.gradStatus === 'GRADUATED')" @click="g.gradStatus = 'GRADUATED'">졸업</button>
                <button :class="chipClass(g.gradStatus === 'WITHDRAWN')" @click="g.gradStatus = 'WITHDRAWN'">중퇴</button>
                <button :class="chipClass(g.gradStatus === 'ENROLLED')" @click="g.gradStatus = 'ENROLLED'">재학</button>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">학과/전공</label>
                <div class="col-span-12 sm:col-span-10 flex gap-2">
                <select v-model="g.majorGroup" class="flex-1 rounded-md border px-3 py-2">
                    <option value="" disabled>학과계열 선택</option>
                    <option v-for="g in majorGroups" :key="g" :value="g">{{ g }}</option>
                </select>
                <select v-model="g.major" :disabled="!gradMajors(g.majorGroup).length" class="flex-1 rounded-md border px-3 py-2">
                    <option value="" disabled>전공계열 선택</option>
                    <option v-for="m in gradMajors(g.majorGroup)" :key="m" :value="m">{{ m }}</option>
                </select>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">성적</span>
                </label>
                <div class="col-span-12 sm:col-span-10 flex gap-2">
                <input 
                    type="number"
                    step="0.01"
                    v-model.number="g.gpa"
                    class="rounded-md border px-3 py-2 w-20" 
                    placeholder="평점"
                    min="0" 
                    :max="g.maxGpa"
                    @input="enforceMax(g)"
                />
                <select v-model.number="g.maxGpa" class="rounded-md border px-3 py-2">
                    <option disabled value="">--- 총점 ---</option>
                    <option value="4.0">4.0점</option>
                    <option value="4.5">4.5점</option>
                    <option value="5.0">5.0점</option>
                </select>
                </div>
            </div>
            </div>
        </section>

        <!-- Career -->
        <section v-if="career.length === 0" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
                <h2 class="font-bold">경력사항</h2>
                <button type="button" class="rounded-md border px-3 py-1" @click="addCareer">추가</button>
            </header>
            <p class="mt-4 text-sm text-slate-500">등록된 경력이 없습니다.</p>
        </section>

        <section v-for="(c, i) in career" :key="c.id" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
        <header class="flex items-center justify-between border-b pb-3">
            <h2 class="font-bold">경력사항 {{ i+1 }} <span class="text-rose-500 text-xs align-top">* 필수항목</span></h2>
            <div class="flex gap-2">
            <button type="button" class="rounded-md border px-3 py-1" @click="addCareer">추가</button>
            <button type="button" class="rounded-md border px-3 py-1" @click="removeCareer(i)">삭제</button>
            </div>
        </header>

        <div class="mt-6 space-y-6">
            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">고용형태</label>
                <select v-model="c.employmentType" class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2">
                <option disabled value="">----- 선택 ------</option>    
                <option value="EMPLOYED">재직중</option>
                <option value="RESIGNED">퇴사</option>
                <option value="CONTRACT_ENDED">계약종료</option>
                <option value="ON_LEAVE">휴직중</option>
                </select>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">회사명</span>
                </label>
                <input v-model.trim="c.company" class="col-span-12 sm:col-span-10 rounded-md border px-3 py-2" placeholder="회사명을 입력하세요" />
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">근무기간</span>
                </label>
                <input v-model="c.periodStart" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <span class="col-span-0 text-center">~</span>
                <input v-model="c.periodEnd" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">부서</span>
                </label>
                <input v-model.trim="c.department" class="col-span-12 sm:col-span-10 rounded-md border px-3 py-2" />
            </div>

            <div class="grid grid-cols-12 gap-3 items-start">
                <label class="col-span-12 sm:col-span-2 font-semibold">
                    <span class="text-red-500">* </span>
                    <span class="text-black">직급</span>
                </label>
                <input v-model.trim="c.rank" class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2" placeholder="직급" />
                <label class="col-span-12 sm:col-span-2 font-semibold sm:text-right">담당업무</label>
                <input v-model.trim="c.role" class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2" placeholder="담당업무를 입력하세요" />
            </div>

        </div>
        </section>


        <section v-for="(l, i) in links" :key="l.id" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
        
            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">{{ l.linkType.toLocaleLowerCase() }}</label>
                <input v-model.trim="l.url" type="url" class="col-span-12 sm:col-span-10 rounded-md border px-3 py-2" :placeholder="l.linkType.toLocaleLowerCase() + ' 링크첨부' " />
            </div>
            
            <div class="mt-6 flex justify-end gap-3"></div>
        </section>
        </main>

        <footer class="sticky bottom-0 bg-white border-t">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
            <button class="rounded-md bg-sky-600 px-6 py-2 text-white" type="button" @click="goNext">다음</button>
        </div>
        </footer>
    </div>
    </template>

    <script setup>
    import { ref, computed } from 'vue'
    import { useRoute, useRouter} from 'vue-router'
    import { onMounted } from 'vue'
    import { useResumeStore } from '@/stores/resumeStore'
    import axios from 'axios'

    const resumeStore = useResumeStore();
    const API = import.meta.env.VITE_API_URL
    const router = useRouter()
    const route = useRoute()

    const applicantSlug = route.params.applicantSlug
    // 탭
    const tabs = [
    { label: "1 기본정보", to: { name: 'ResumeBasicInfo', params: { applicantSlug }}},
    { label: "2 학력/연구/NCS", to: { name: 'ResumeAcademicInfo', params: { applicantSlug }}},
    { label: "3 어학/자격", to: { name: 'ResumeCertificateInfo', params: { applicantSlug }}},
    { label: "4 자기소개서/역량기술서", to: { name: 'ResumeEssay', params: { applicantSlug }}},
    { label: "5 최종제출", to: { name: 'ResumeSubmit', params: { applicantSlug }}},
    ]
    function isActive(to) {
        const a = router.resolve(to).path.replace(/\/+$/, '')
        const b = route.path.replace(/\/+$/, '')
        return a === b
    }




    // 공통 버튼 클래스
    const chipClass = (active) => `px-3 py-1 rounded-md border ${active ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`

    // 지역 데이터
    const KR_REGIONS = {
    '서울특별시': ['강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구'],
    '부산광역시': ['강서구','금정구','기장군','남구','동래구','부산진구','북구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구','동구'],
    '대구광역시': ['남구','달서구','달성군','동구','북구','서구','수성구','중구'],
    '인천광역시': ['강화군','계양구','남동구','동구','미추홀구','부평구','서구','연수구','옹진군','중구'],
    '광주광역시': ['광산구','남구','동구','북구','서구'],
    '대전광역시': ['대덕구','동구','서구','유성구','중구'],
    '울산광역시': ['남구','동구','북구','중구','울주군'],
    '세종특별자치시': ['세종시'],
    '경기도': ['가평군','고양시 덕양구','고양시 일산동구','고양시 일산서구','과천시','광명시','광주시','구리시','군포시','김포시','남양주시','동두천시','부천시','성남시 분당구','성남시 수정구','성남시 중원구','수원시 권선구','수원시 영통구','수원시 장안구','수원시 팔달구','시흥시','안산시 단원구','안산시 상록구','안성시','안양시 동안구','안양시 만안구','양주시','양평군','여주시','연천군','오산시','용인시 기흥구','용인시 수지구','용인시 처인구','의왕시','의정부시','이천시','파주시','평택시','포천시','하남시','화성시'],
    '강원도': ['강릉시','고성군','동해시','삼척시','속초시','양구군','양양군','영월군','원주시','인제군','정선군','철원군','춘천시','태백시','평창군','홍천군','화천군','횡성군'],
    '충청북도': ['괴산군','단양군','보은군','영동군','옥천군','음성군','제천시','증평군','진천군','청주시 상당구','청주시 서원구','청주시 청원구','청주시 흥덕구','충주시'],
    '충청남도': ['계룡시','공주시','금산군','논산시','당진시','보령시','부여군','서산시','서천군','아산시','예산군','천안시 동남구','천안시 서북구','청양군','태안군','홍성군'],
    '전라북도': ['고창군','김제시','남원시','무주군','부안군','순창군','완주군','익산시','임실군','장수군','전주시 덕진구','전주시 완산구','정읍시','진안군'],
    '전라남도': ['강진군','고흥군','곡성군','광양시','구례군','나주시','담양군','목포시','무안군','보성군','순천시','신안군','여수시','영광군','영암군','완도군','장성군','장흥군','진도군','함평군','해남군','화순군'],
    '경상북도': ['경산시','경주시','고령군','구미시','군위군','김천시','문경시','봉화군','상주시','성주군','안동시','영덕군','영양군','영주시','영천시','예천군','울릉군','울진군','의성군','청도군','청송군','칠곡군','포항시 남구','포항시 북구'],
    '경상남도': ['거제시','거창군','고성군','김해시','남해군','밀양시','사천시','산청군','양산시','의령군','진주시','창녕군','창원시 마산합포구','창원시 마산회원구','창원시 성산구','창원시 의창구','창원시 진해구','통영시','하동군','함안군','함양군','합천군'],
    '제주특별자치도': ['서귀포시','제주시'],
    }

    const MAJORS = {
        인문 : ['국어국문학', '영어영문학', '철학', '역사학'],
        사회 : ['정치외교학', '행정학', '언론정보학', '사회학'],
        공학 : ['컴퓨터공학', '전기전자공학', '기계공학', '화학공학', '건축학','토목공학'],
        자연과학 : ['수학', '물리', '화학', '생명과학', '천문학'],
        예체능 : ['디자인', '음악', '체육'],
        교육 : ['가정교육과', '초등교육과', '특수교육과'],
        보건 : ['물리치료학', '임상병리학', '방사선학', '치위생학'],
    }

    // 고등학교 상태
    const highStatusOptions = [
        { value: 'ENROLLED', label: '재학' },
        { value: 'GRADUATED', label: '졸업' },
        { value: 'EXPECTED', label: '졸업예정' },
        { value: 'WITHDRAWN', label: '중퇴' },
        { value: 'LEAVE_OF_ABSENCE', label: '휴학' },
    ]

    // 대학교 상태
    const univDegreeOptions = [
    { value: 'BACHELOR', label: '학사' },
    { value: 'ASSOCIATE', label: '전문학사' },
    { value: 'OTHER', label: '기타' },
    ]

    // 대학원 상태
    const gradDegreeOptions = [
    { value: 'MASTER', label: '학사' },
    { value: 'DOCTORATE', label: '박사' },
    { value: 'OTHER', label: '기타' },
    ]

    const cities = Object.keys(KR_REGIONS)
    const highAdmissionStatus = ref('GRADUATED')
    
    const hsdistricts = computed(() => KR_REGIONS[hs.value.city] ?? [])
    const univDistricts = (city) => KR_REGIONS[city] ?? []
    const gradDistricts = (city) => KR_REGIONS[city] ?? []

    
    const majorGroups = Object.keys(MAJORS)
    const univMajors    = (group) => MAJORS[group] ?? []
    const gradMajors    = (group) => MAJORS[group] ?? []

    const links = ref([
      {id: null, linkType: "GITHUB", url: "" },
      {id: null, linkType: "NOTION", url: "" },
      {id: null, linkType: "VELOG", url: "" },
    ])
    
    const hs = ref({
        id: null,
        school: '',
        degree: 'OTHER',
        city: '',
        district: '',
        periodStart: '',
        periodEnd: '',
        admission: "REGULAR",
        gradStatus: highAdmissionStatus,
        majorGroups: null,
        major: null,
        gpa: null,
        maxGpa: null
    })
    const makeUniv = () => ({
        id: null,
        school: '',
        degree: 'BACHELOR',
        city: '',
        district: '',
        periodStart: '',
        periodEnd: '',
        admission: '',
        gradStatus: '',
        majorGroup: '',
        major: '',
        gpa: null,
        maxGpa: '',
    })

    // 대학원 상태
    const makeGrad = () => ({
        id: null,
        school: '',
        degree: 'MASTER',
        city: '',
        district: '',
        periodStart: '',
        periodEnd: '',
        admission: '',
        gradStatus: '',
        majorGroup: '',
        major: '',
        gpa: null,
        maxGpa: '',
    })

    // 경력
    const makeCareer = () => ({
        id: null,
        company: '',
        department: '',
        rank: '',
        role: '',
        periodStart: '',
        periodEnd: '',
        employmentType: '',
    })


    const univ = ref([makeUniv()])
    const career = ref([makeCareer()])
    const grad = ref([makeGrad()])

    function addUniv(){ univ.value.push(makeUniv()) }
    function removeUniv(i){ univ.value.splice(i,1) }

    function addGrad(){ grad.value.push(makeGrad()) }
    function removeGrad(i){ grad.value.splice(i,1) }
    
    function addCareer(){ career.value.push(makeCareer()) }
    function removeCareer(i){ career.value.splice(i,1) }

    function enforceMax(item) {
        // 총점에 따른 최대값
        const max = item.maxGpa;
        let v = Number(item.gpa);

        if (Number.isNaN(v)) { item.gpa = null; return; }

        // 범위 보정
        if (v > max) v = max;
        if (v < 0)   v = 0;

        // 소수점 2자리 고정
        item.gpa = Math.round(v * 100) / 100;
    }

    function validateForm() {
        if (!hs.value.school)      return alert('고등학교 학교명을 입력하세요.'), false
        if (!hs.value.city)        return alert('고등학교 시/도를 선택하세요.'), false
        if (!hs.value.district)    return alert('고등학교 구/군을 선택하세요.'), false
        if (!hs.value.periodStart) return alert('고등학교 재학 시작일을 입력하세요.'), false
        if (!hs.value.periodEnd)   return alert('고등학교 재학 종료일을 입력하세요.'), false

        if (univ.value.length > 0) {
            for (const [i, u] of univ.value.entries()) {
                if (!u.school)      return alert(`대학교 ${i+1}: 학교명`), false
                if (!u.city)        return alert(`대학교 ${i+1}: 시/도`), false
                if (!u.district)    return alert(`대학교 ${i+1}: 구/군`), false
                if (!u.periodStart) return alert(`대학교 ${i+1}: 재학 시작일`), false
                if (!u.periodEnd)   return alert(`대학교 ${i+1}: 재학 종료일`), false
                if (u.gpa == null || u.gpa === '') return alert(`대학교 ${i+1}: 평점`), false
                if (!u.maxGpa)   return alert(`대학교 ${i+1}: 총점`), false
            }
        }

        if (grad.value.length > 0) {
            for (const [i, g] of grad.value.entries()) {
                if (!g.degree)      return alert(`대학원 ${i+1}: 학위구분`), false
                if (!g.school)      return alert(`대학원 ${i+1}: 학교명`), false
                if (!g.city)        return alert(`대학원 ${i+1}: 시/도`), false
                if (!g.district)    return alert(`대학원 ${i+1}: 구/군`), false
                if (!g.periodStart) return alert(`대학원 ${i+1}: 재학 시작일`), false
                if (!g.periodEnd)   return alert(`대학원 ${i+1}: 재학 종료일`), false
                if (g.gpa == null || g.gpa === '') return alert(`대학원 ${i+1}: 평점`), false
                if (!g.maxGpa)   return alert(`대학원 ${i+1}: 총점`), false
            }
        }

        if (career.value.length > 0) {
            for (const [i, c] of career.value.entries()) {
                if (!c.company)     return alert(`경력 ${i+1}: 회사명`), false
                if (!c.periodStart) return alert(`경력 ${i+1}: 근무 시작일`), false
                if (!c.periodEnd)   return alert(`경력 ${i+1}: 근무 종료일`), false
                if (!c.department)  return alert(`경력 ${i+1}: 부서`), false
                if (!c.rank)        return alert(`경력 ${i+1}: 직급`), false
            }
        }
    return true
    }
    
    onMounted(async () => {

            console.log("onMounted edu-exp-link info saved:", resumeStore.resume);
            if (!resumeStore.resume) {
                try {
                const res = await axios.get(`${API}/api/v1/resumes`, {
                    withCredentials: true
                });
                resumeStore.resume = res.data;
                } catch (e) {
                console.error("Failed to fetch resume:", e);
                }
            }
            console.log("Resume store in eduexplinks info:", resumeStore.resume);
            const data = resumeStore.resume;
                
            if (data?.educations?.length) {
                // 고등학교/대학교/대학원 구분하여 초기값 설정
                const highSchool = data.educations.find(e => e.schoolType === "HIGH");
                if (highSchool) {
                    hs.value = {
                        id: highSchool.id || null,
                        school: highSchool.schoolName || '',
                        degree: highSchool.degree || 'HIGH_SCHOOL',
                        city: highSchool.city || '',
                        district: highSchool.district || '',
                        periodStart: highSchool.startDate || '',
                        periodEnd: highSchool.endDate || '',
                        admission: highSchool.admissionType || "REGULAR",
                        gradStatus: highSchool.graduationStatus || '',
                        majorGroups: null,
                        major: highSchool.major || null,
                        gpa: highSchool.gpa || null,
                        maxGpa: highSchool.maxGpa || null
                    };
                }

                univ.value = data.educations
                    .filter(e => e.schoolType === "UNIV")
                    .map(u => ({
                        id: u.id || null,
                        school: u.schoolName || '',
                        degree: u.degree || 'BACHELOR',
                        city: u.city || '',
                        district: u.district || '',
                        periodStart: u.startDate || '',
                        periodEnd: u.endDate || '',
                        admission: u.admissionType || '',
                        gradStatus: u.graduationStatus || '',
                        majorGroup: u.major?.split(' ')[0] || '',
                        major: u.major?.split(' ')[1] || '',
                        gpa: u.gpa || null,
                        maxGpa: u.maxGpa || ''
                    }));

                grad.value = data.educations
                    .filter(g => g.schoolType === "GRAD")
                    .map(g => ({
                        id: g.id || null,
                        school: g.schoolName || '',
                        degree: g.degree || 'MASTER',
                        city: g.city || '',
                        district: g.district || '',
                        periodStart: g.startDate || '',
                        periodEnd: g.endDate || '',
                        admission: g.admissionType || '',
                        gradStatus: g.graduationStatus || '',
                        majorGroup: g.major?.split(' ')[0] || '',
                        major: g.major?.split(' ')[1] || '',
                        gpa: g.gpa || null,
                        maxGpa: g.maxGpa || ''
                    }));
                }
                
                if (data?.experiences) {
                    career.value = data.experiences?.map(c => ({
                            id: c.id || null,
                            company: c.companyName || '',
                            department: c.department || '',
                            rank: c.position || '',
                            role: c.responsibilities || '',
                            periodStart: c.startDate || '',
                            periodEnd: c.endDate || '',
                            employmentType: c.employmentStatus || ''
                    }));
                 }

                if(data?.links) {
                    links.value = data.links?.map(l => ({
                        id: l.id || null,
                        url: l.url || '',
                        linkType: l.linkType || ''
                    })) || [
                        { id: null, linkType: "GITHUB", url: "" },
                        { id: null, linkType: "NOTION", url: "" },
                        { id: null, linkType: "VELOG", url: "" }
                    ];
                }
        }
    )


    function handleTabClick(to) {
    if (!validateForm()) return
    router.push(to)
    }


    async function goNext() {
     console.log("Academic info saved:", resumeStore.resume);
    if (!validateForm()) return
    
    const payload = {
        educations: [
            // ✅ 고등학교
            {
                id: hs.value.id,
                admissionType:  "REGULAR",
                schoolName: hs.value.school,
                city: hs.value.city,
                district: hs.value.district,
                startDate: hs.value.periodStart,
                endDate: hs.value.periodEnd,
                graduationStatus: hs.value.gradStatus,
                schoolType:"HIGH",
                degree: "HIGH_SCHOOL"
            },
        // ✅ 대학교들
        ...univ.value.map(u => ({
            id: u.id,
            schoolName: u.school,
            city: u.city,
            district: u.district,
            startDate: u.periodStart,
            endDate: u.periodEnd,
            admissionType: u.admission,
            graduationStatus: u.gradStatus,
            degree: u.degree, // BACHELOR, MASTER, DOCTOR 등
            major: u.majorGroup + " " + u.major,
            schoolType:"UNIV",
            gpa: u.gpa,
            maxGpa: u.maxGpa    })),
            // ✅ 대학원들
        ...grad.value.map(g => ({
            id: g.id,
            schoolName: g.school,
            maxGpa: g.maxGpa,
            city: g.city,
            district: g.district,
            startDate: g.periodStart,
            endDate: g.periodEnd,
            admissionType: g.admission,
            graduationStatus: g.gradStatus,
            schoolType:"GRAD",
            degree: g.degree,
            major: g.majorGroup + " " + g.major,
            gpa: g.gpa,
            maxGpa: g.maxGpa    }))
        ],
        experiences: [
        ...career.value.map(c => ({
            id: c.id,
            companyName: c.company,
            department: c.department,
            position: c.rank,
            responsibilities: c.role,
            employmentStatus: c.employmentType,
            startDate: c.periodStart,
            endDate: c.periodEnd,
        }))],
        links: [
            ...links.value.map(l => ({
                id: l.id,
                url: l.url,
                linkType: l.linkType
            }))
        ]
        }

    console.log(payload);

    try {
        await axios.post(`${API}/api/v1/resumes/edu-exp-link`, payload, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });

        resumeStore.resume.educations =  [
            // ✅ 고등학교
            {
                id: hs.value.id,
                admissionType:  "REGULAR",
                schoolName: hs.value.school,
                city: hs.value.city,
                district: hs.value.district,
                startDate: hs.value.periodStart,
                endDate: hs.value.periodEnd,
                graduationStatus: hs.value.gradStatus,
                schoolType:"HIGH",
                degree: "HIGH_SCHOOL"
            },
        // ✅ 대학교들
        ...univ.value.map(u => ({
            id: u.id,
            schoolName: u.school,
            city: u.city,
            district: u.district,
            startDate: u.periodStart,
            endDate: u.periodEnd,
            admissionType: u.admission,
            graduationStatus: u.gradStatus,
            degree: u.degree, // BACHELOR, MASTER, DOCTOR 등
            major: u.majorGroup + " " + u.major,
            schoolType:"UNIV",
            gpa: u.gpa,
            maxGpa: u.maxGpa    })),
            // ✅ 대학원들
        ...grad.value.map(g => ({
            id: g.id,
            schoolName: g.school,
            maxGpa: g.maxGpa,
            city: g.city,
            district: g.district,
            startDate: g.periodStart,
            endDate: g.periodEnd,
            admissionType: g.admission,
            graduationStatus: g.gradStatus,
            schoolType:"GRAD",
            degree: g.degree,
            major: g.majorGroup + " " + g.major,
            gpa: g.gpa,
            maxGpa: g.maxGpa    }))
        ]

        resumeStore.resume.experiences = 
        [
        ...career.value.map(c => ({
            id: c.id,
            companyName: c.company,
            department: c.department,
            position: c.rank,
            responsibilities: c.role,
            employmentStatus: c.employmentType,
            startDate: c.periodStart,
            endDate: c.periodEnd,
        }))]

        resumeStore.resume.links = 
        [
            ...links.value.map(l => ({
                id: l.id,
                url: l.url,
                linkType: l.linkType
            }))
        ]

    }
    catch (error) {
        console.log(error);
        alert(error);
        return;
    }
    router.push({ name: 'ResumeCertificateInfo', params: { applicantSlug } })
    }
</script>

<style scoped></style>
