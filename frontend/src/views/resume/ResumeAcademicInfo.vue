<!-- ResumeAcademicResearch.vue -->
<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
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
                <p class="col-span-12 sm:col-span-4 text-xs text-slate-500">2026.02.28 이전 졸업(예정)만 최종학력으로 인정</p>
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
                <p class="col-span-12 sm:col-span-4 text-xs text-slate-500">2026.02.28 이전 졸업(예정)만 최종학력으로 인정</p>
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
                    <option :value="4.0">4.0점</option>
                    <option :value="4.5">4.5점</option>
                    <option :value="5.0">5.0점</option>
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
                <!--하반기는 26년 2월 졸업예정자까지 받아서, 그거에 맞춰서 수정했습니다.-->
                <p class="col-span-12 sm:col-span-4 text-xs text-slate-500">2026.02.28 이전 졸업(예정)만 최종학력으로 인정</p>
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
                    <option :value="4.0">4.0점</option>
                    <option :value="4.5">4.5점</option>
                    <option :value="5.0">5.0점</option>
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


        <section v-for="(l, i) in links" :key="l.id ?? i" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
        
            <div class="col-span-12 sm:col-span-10">
            <input
                v-model.trim="l.url"
                type="url"
                class="w-full rounded-md border px-3 py-2"
                :placeholder="l.linkType.toLocaleLowerCase() + ' 링크 첨부'"
            />
            <p class="text-sm text-gray-500 mt-1">
                <span v-if="l.linkType === 'NOTION'">공개 설정된 Notion 페이지 링크를 입력해주세요.</span>
                <span v-else-if="l.linkType === 'GITHUB'">깃허브 메인 프로필 페이지 (예: https://github.com/username)</span>
                <span v-else-if="l.linkType === 'VELOG'">Velog 블로그 (예: https://velog.io/@username/posts) <br/> * /posts가 포함되어있는 꼭! 확인해주세요.</span>
            </p>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useResumeStore } from '@/stores/resumeStore'

import { KR_REGIONS, MAJORS, highStatusOptions, univDegreeOptions, gradDegreeOptions } from "@/constants/education";
import { makeUniv, makeGrad, makeCareer, enforceMax } from "@/utils/education";
import applicantApi from '../../api/applicantApi';

const resumeStore = useResumeStore();
const router = useRouter()
const route = useRoute()
const applicantSlug = route.params.applicantSlug

// 공통 버튼 클래스
const chipClass = (active) => `px-3 py-1 rounded-md border ${active ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`

const highAdmissionStatus = ref('GRADUATED')
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
const univ = ref([makeUniv()])
const career = ref([makeCareer()])
const grad = ref([makeGrad()])
const links = ref([
    {id: null, linkType: "GITHUB", url: "" },
    {id: null, linkType: "NOTION", url: "" },
    {id: null, linkType: "VELOG", url: "" },
])


const cities = Object.keys(KR_REGIONS)

const hsdistricts = computed(() => KR_REGIONS[hs.value.city] ?? [])
const univDistricts = (city) => KR_REGIONS[city] ?? []
const gradDistricts = (city) => KR_REGIONS[city] ?? []

const majorGroups = Object.keys(MAJORS)
const univMajors    = (group) => MAJORS[group] ?? []
const gradMajors    = (group) => MAJORS[group] ?? []

function addUniv(){ univ.value.push(makeUniv()) }
function removeUniv(i){ univ.value.splice(i,1) }

function addGrad(){ grad.value.push(makeGrad()) }
function removeGrad(i){ grad.value.splice(i,1) }

function addCareer(){ career.value.push(makeCareer()) }
function removeCareer(i){ career.value.splice(i,1) }

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
    await resumeStore.fetchResumeAndTemplate();

    if (!resumeStore.canAccess()) {
        alert('접근할 수 없는 페이지입니다.')
        router.push({ name: 'ApplicantLogin', params: { companySlug: route.params.companySlug }})
        return
    }
    
    const data = resumeStore.resume;
    console.log(data);

    const highSchool = data.educations?.find(e => e.schoolType === "HIGH");

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

    univ.value = data.educations?.filter(e => e.schoolType === "UNIV").map(u => ({
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
    })) || [makeUniv()];

    grad.value = data.educations?.filter(g => g.schoolType === "GRAD").map(g => ({
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
    })) || [makeGrad()];
            
    career.value = data.experiences?.map(c => ({
        id: c.id || null,
        company: c.companyName || '',
        department: c.department || '',
        rank: c.position || '',
        role: c.responsibilities || '',
        periodStart: c.startDate || '',
        periodEnd: c.endDate || '',
        employmentType: c.employmentStatus || ''
    })) || [makeCareer()];

    links.value = (data.links && data.links.length > 0)
    ? data.links.map((l, i) => ({
        id: l.id ?? null,
        url: l.url ?? '',
        linkType: l.linkType || ['GITHUB','NOTION','VELOG'][i]
    }))
    : [
        { id: null, linkType: "GITHUB", url: "" },
        { id: null, linkType: "NOTION", url: "" },
        { id: null, linkType: "VELOG", url: "" }
    ];
});

async function save() {
    console.log("Academic info saved:", resumeStore.resume);
    if (!validateForm()) return false;
    
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
        await applicantApi.post(`/resumes/edu-exp-link`, payload);

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
        
        alert("저장 완료했습니다.")
        return true;
    }
    catch (error) {
        console.log(error);
        alert(error);
        return false;
    }
}

async function goNext() {
    const success = await save()
    if (success) {
        router.push({ name: 'ResumeCertificateInfo', params: { applicantSlug } })
    }
}

defineExpose({ save })

</script>

<style scoped></style>
