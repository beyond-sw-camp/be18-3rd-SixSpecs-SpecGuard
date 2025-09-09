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
            <RouterLink
            v-for="tab in tabs"
            :key="tab.to"
            :to="tab.to"
            class="col-span-1 p-3 text-center border-b-4 hover:bg-slate-100"
            :class="isActive(tab.to) ? 'border-sky-600 text-sky-600 font-bold' : 'border-transparent'"
            >
            {{ tab.label }}
            </RouterLink>
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
                <label class="col-span-12 sm:col-span-2 font-semibold">*학교명</label>
                <input v-model.trim="hs.school" class="col-span-12 sm:col-span-3 rounded-md border border-slate-300 px-3 py-2" />
                <label class="col-span-12 sm:col-span-2 font-semibold sm:text-right">*학교소재지</label>

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
                <label class="col-span-12 sm:col-span-2 font-semibold">*재학기간</label>
                <input v-model="hs.periodStart" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <span class="col-span-0 text-center">~</span>
                <input v-model="hs.periodEnd" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <p class="col-span-12 sm:col-span-4 text-xs text-slate-500">2025.08.01 이전 졸업(예정)만 최종학력으로 인정</p>
            </div>
            </div>

            <div class="mt-6 flex justify-end gap-3"></div>
        </section>

        <!-- University basic -->
        <section v-for="(u, i) in univ" :key="i" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
            <h2 class="font-bold">대학교 {{ i+1 }}<span class="text-rose-500 text-xs align-top">* 필수항목</span></h2>
            <div class="flex gap-2">
                <button type="button" class="rounded-md border px-3 py-1" @click="addUniv">추가</button>
                <button v-if="univ.length>1" type="button" class="rounded-md border px-3 py-1"
                        @click="removeUniv(i)">삭제</button>
            </div>
            </header>

            <div class="mt-6 space-y-6">
            <!-- 대학교 학위구분 -->
            <div class="flex flex-wrap gap-2 items-center text-sm">
            <span class="font-semibold">학위구분</span>
            <div role="radiogroup" class="flex flex-wrap gap-2">
                <button
                v-for="opt in degreeOptions"
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
                <label class="col-span-12 sm:col-span-2 font-semibold">*학교명</label>
                <input v-model.trim="u.school" class="col-span-12 sm:col-span-3 rounded-md border px-3 py-2" />
                <label class="col-span-12 sm:col-span-2 font-semibold sm:text-right">*학교소재지</label>
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
                <label class="col-span-12 sm:col-span-2 font-semibold">*재학기간</label>
                <input v-model="u.periodStart" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <span class="col-span-0 text-center">~</span>
                <input v-model="u.periodEnd" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <p class="col-span-12 sm:col-span-4 text-xs text-slate-500">2025.08.01 이전 졸업(예정)만 최종학력으로 인정</p>
            </div>

            <div class="flex flex-wrap gap-2 items-center text-sm">
                <span class="font-semibold">입학구분</span>
                <div class="flex flex-wrap gap-2">
                <button :class="chipClass(u.admission === '일반')" @click="u.admission = '일반'">일반</button>
                <button :class="chipClass(u.admission === '편입')" @click="u.admission = '편입'">편입</button>
                </div>
            </div>

            <div class="flex flex-wrap gap-2 items-center text-sm">
                <span class="font-semibold">졸업구분</span>
                <div class="flex flex-wrap gap-2">
                <button :class="chipClass(u.gradStatus === '졸업')" @click="u.gradStatus = '졸업'">졸업</button>
                <button :class="chipClass(u.gradStatus === '수료')" @click="u.gradStatus = '수료'">수료</button>
                <button :class="chipClass(u.gradStatus === '중퇴')" @click="u.gradStatus = '중퇴'">중퇴</button>
                <button :class="chipClass(u.gradStatus === '재학')" @click="u.gradStatus = '재학'">재학</button>
                </div>
            </div>
            <!-- </div>
        
            <div class="mt-6 space-y-6"> -->
            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">*학과/전공</label>
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
                <label class="col-span-12 sm:col-span-2 font-semibold">*성적</label>
                <div class="col-span-12 sm:col-span-10 flex gap-2">
                <input 
                    type="number"
                    step="0.01"
                    v-model.number="u.gpa"
                    class="rounded-md border px-3 py-2 w-20" 
                    placeholder="평점"
                    min="0" 
                    :max="univGpaMax(u.semesters)"
                    @input="enforceMax(u, univGpaMax)"
                />
                <select v-model="u.semesters" class="rounded-md border px-3 py-2">
                    <option disabled value="">--- 총점 ---</option>
                    <option value="univTotal4.5">4.5점</option>
                    <option value="univTotal5.0">5.0점</option>
                </select>
                </div>
            </div>
            </div>
        </section>

        <!-- Graduate school -->
        <section v-for="(g, i) in grad" :key="i" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
            <h2 class="font-bold">대학원 {{ i+1 }}<span class="text-rose-500 text-xs align-top">* 필수항목</span></h2>
            <div class="flex gap-2">
                <button type="button" class="rounded-md border px-3 py-1" @click="addGrad">추가</button>
                <button v-if="grad.length>1" type="button" class="rounded-md border px-3 py-1"
                        @click="removeGrad(i)">삭제</button>
            </div>
            </header>

            <div class="mt-6 space-y-6">
            <div class="flex flex-wrap gap-2 items-center text-sm">
                <span class="font-semibold">학위구분</span>
                <button :class="chipClass(g.degree === '석사')" @click="g.degree = '석사'">석사</button>
                <button :class="chipClass(g.degree === '박사')" @click="g.degree = '박사'">박사</button>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">*학교명</label>
                <input v-model.trim="g.school" class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2" />
                <label class="col-span-12 sm:col-span-2 font-semibold sm:text-right">*학교소재지</label>
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
                <label class="col-span-12 sm:col-span-2 font-semibold">*재학기간</label>
                <input v-model="g.periodStart" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <span class="col-span-0 text-center">~</span>
                <input v-model="g.periodEnd" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <p class="col-span-12 sm:col-span-4 text-xs text-slate-500">2025.08.01 이전 졸업(예정)만 최종학력으로 인정</p>
            </div>

            <div class="flex flex-wrap gap-2 items-center text-sm">
                <span class="font-semibold">입학구분</span>
                <button :class="chipClass(g.admission === '일반')" @click="g.admission = '일반'">일반</button>
                <button :class="chipClass(g.admission === '편입')" @click="g.admission = '편입'">편입</button>
            </div>

            <div class="flex flex-wrap gap-2 items-center text-sm">
                <span class="font-semibold">졸업구분</span>
                <button :class="chipClass(g.gradStatus === '졸업')" @click="g.gradStatus = '졸업'">졸업</button>
                <button :class="chipClass(g.gradStatus === '수료')" @click="g.gradStatus = '수료'">수료</button>
                <button :class="chipClass(g.gradStatus === '중퇴')" @click="g.gradStatus = '중퇴'">중퇴</button>
                <button :class="chipClass(g.gradStatus === '재학')" @click="g.gradStatus = '재학'">재학</button>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">*학과/전공</label>
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
                <label class="col-span-12 sm:col-span-2 font-semibold">*성적</label>
                <div class="col-span-12 sm:col-span-10 flex gap-2">
                <input 
                    type="number"
                    step="0.01"
                    v-model.number="g.gpa"
                    class="rounded-md border px-3 py-2 w-20" 
                    placeholder="평점"
                    min="0" 
                    :max="gradGpaMax(g.semesters)"
                    @input="enforceMax(g, gradGpaMax)"
                />
                <select v-model="g.semesters" class="rounded-md border px-3 py-2">
                    <option disabled value="">--- 총점 ---</option>
                    <option value="gradTotal4.5">4.5점</option>
                    <option value="gradTotal5.0">5.0점</option>
                </select>
                </div>
            </div>
            </div>
        </section>

        <!-- Career -->
        <section v-for="(c, i) in career" :key="i" class="bg-white shadow-sm ring-1 ring-slate-200 p-6">
            <header class="flex items-center justify-between border-b pb-3">
            <h2 class="font-bold">경력사항 {{ i+1 }} <span class="text-rose-500 text-xs align-top">* 필수항목</span></h2>
            <div class="flex gap-2">
                <button type="button" class="rounded-md border px-3 py-1" @click="addCareer">추가</button>
                <button v-if="career.length>1" type="button" class="rounded-md border px-3 py-1"
                        @click="removeCareer(i)">삭제</button>
            </div>
            </header>

            <div class="mt-6 space-y-6">
            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">고용형태</label>
                <select v-model="c.employmentType" class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2">
                <option disabled value="">----- 선택 ------</option>    
                <option value="REGULAR">정규직</option>
                <option value="TEMPORARY">계약직</option>
                </select>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">*회사명</label>
                <input v-model.trim="c.company" class="col-span-12 sm:col-span-10 rounded-md border px-3 py-2" placeholder="회사명을 입력하세요" />
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">*근무기간</label>
                <input v-model="c.periodStart" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
                <span class="col-span-0 text-center">~</span>
                <input v-model="c.periodEnd" type="date" class="col-span-5 sm:col-span-2 rounded-md border px-3 py-2" />
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">부서</label>
                <input v-model.trim="c.department" class="col-span-12 sm:col-span-10 rounded-md border px-3 py-2" />
            </div>

            <div class="grid grid-cols-12 gap-3 items-start">
                <label class="col-span-12 sm:col-span-2 font-semibold">*직급</label>
                <input v-model.trim="c.rank" class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2" placeholder="직급" />
                <label class="col-span-12 sm:col-span-2 font-semibold sm:text-right">담당업무</label>
                <input v-model.trim="c.role" class="col-span-12 sm:col-span-4 rounded-md border px-3 py-2" placeholder="담당업무를 입력하세요" />
            </div>

            <div>
                <label class="block font-semibold mb-2">경험 및 역량기술서</label>
                <textarea v-model="c.summary" rows="5" 
                    class="w-full rounded-md border px-3 py-2" 
                    placeholder="성과 중심으로 작성"
                    maxlength="500">
                </textarea>
                <div class="text-right text-xs text-slate-500">
                    {{ (c.summary || '').length }} / 500
                </div>
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">포트폴리오 첨부</label>
                <input v-model.trim="c.portfolioUrl" class="col-span-12 sm:col-span-10 rounded-md border px-3 py-2" placeholder="링크첨부" />
            </div>

            <div class="grid grid-cols-12 gap-3 items-center">
                <label class="col-span-12 sm:col-span-2 font-semibold">경력기술서 첨부</label>
                <input v-model.trim="c.cvUrl" class="col-span-12 sm:col-span-10 rounded-md border px-3 py-2" placeholder="링크첨부" />
            </div>
            </div>

            <div class="mt-6 flex justify-end gap-3"></div>
        </section>
        </main>

        <footer class="sticky bottom-0 bg-white border-t">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
            <button class="rounded-md border px-5 py-2" type="button" @click="saveDraft">임시저장</button>
            <button class="rounded-md bg-sky-600 px-6 py-2 text-white" type="button" @click="goNext">다음</button>
        </div>
        </footer>
    </div>
    </template>

    <script setup>
    import { ref, computed } from 'vue'
    import { useRoute, useRouter, RouterLink } from 'vue-router'

    const router = useRouter()
    const route = useRoute()

    // 탭
    const tabs = [
    { label: '1 기본정보', to: '/resume/basic-info' },
    { label: '2 학력/연구/NCS', to: '/resume/academic-info' },
    { label: '3 어학/자격', to: '/resume/certificate-info' },
    { label: '4 자기소개서/역량기술서', to: '/resume/essay' },
    { label: '5 최종제출', to: '/resume/final-submit' },
    ]
    const isActive = (to) => {
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

    const cities = Object.keys(KR_REGIONS)

    // 고등학교 상태
    const highStatusOptions = [
    { value: 'GRADUATED', label: '졸업' },
    { value: 'EXPECTED', label: '졸업예정' },
    { value: 'DROPPED', label: '중퇴' },
    { value: 'LEAVE', label: '휴학' },
    { value: 'ENROLLED', label: '재학' },
    ]
    const highAdmissionStatus = ref('GRADUATED')
    const hs = ref({
    school: '',
    city: '',
    district: '',
    periodStart: '',
    periodEnd: '',
    })
    const hsdistricts = computed(() => KR_REGIONS[hs.value.city] ?? [])
    const univDistricts = (city) => KR_REGIONS[city] ?? []
    const gradDistricts = (city) => KR_REGIONS[city] ?? []

    const MAJORS = {
        인문 : ['국어국문학', '영어영문학', '철학', '역사학'],
        사회 : ['정치외교학', '행정학', '언론정보학', '사회학'],
        공학 : ['컴퓨터공학', '전기전자공학', '기계공학', '화학공학', '건축학','토목공학'],
        자연과학 : ['수학', '물리', '화학', '생명과학', '천문학'],
        예체능 : ['디자인', '음악', '체육'],
        교육 : ['가정교육과', '초등교육과', '특수교육과'],
        보건 : ['물리치료학', '임상병리학', '방사선학', '치위생학'],
    }

    const majorGroups = Object.keys(MAJORS)
    const univMajors    = (group) => MAJORS[group] ?? []
    const gradMajors    = (group) => MAJORS[group] ?? []

    // 대학교 상태
    const degreeOptions = [
    { value: 'BACHELOR', label: '학사' },
    { value: 'ASSOCIATE', label: '전문학사' },
    ]

    const makeUniv = () => ({
    degree: 'BACHELOR',
    school: '',
    city: '',
    district: '',
    periodStart: '',
    periodEnd: '',
    admission: '',
    gradStatus: '',
    majorGroup: '',
    major: '',
    majorType: '',
    majorDetail: '',
    gpaType: '',
    semesters: '',
    })

    const univ = ref([makeUniv()])

    function addUniv(){ univ.value.push(makeUniv()) }
    function removeUniv(i){ univ.value.splice(i,1) }

    const univGpaMax    = (sem) => (sem === 'univTotal5.0' ? 5.0 : 4.5)


    // 대학원 상태
    const makeGrad = () => ({
    gpa: null,
    semesters: '',
    degree: '',
    school: '',
    city: '',
    district: '',
    periodStart: '',
    periodEnd: '',
    admission: '',
    gradStatus: '',
    majorGroup: '',
    major: '',
    gpaType: '',
    })
    
    const grad = ref([makeGrad()])

    function addGrad(){ grad.value.push(makeGrad()) }
    function removeGrad(i){ grad.value.splice(i,1) }
    
    // 대학원 성적 - 총점 선택에 따른 max 값
    const gradGpaMax    = (sem) => (sem === 'gradTotal5.0' ? 5.0 : 4.5)

    function enforceMax(item, getMax) {
        const max = getMax(item.semesters);          // 총점(semesters)에 따른 최대값
        let v = Number(item.gpa);

        if (Number.isNaN(v)) { item.gpa = null; return; }

        // 범위 보정
        if (v > max) v = max;
        if (v < 0)   v = 0;

        // 소수점 2자리 고정
        item.gpa = Math.round(v * 100) / 100;
    }



    // 경력
    const makeCareer = () => ({
        employmentType: '',
        company: '',
        periodStart: '',
        periodEnd: '',
        department: '',
        rank: '',
        role: '',
        summary: '',
        portfolioUrl: '',
        cvUrl: '',
    })

    const career = ref([makeCareer()])

    function addCareer(){ career.value.push(makeCareer()) }
    function removeCareer(i){ career.value.splice(i,1) }
    


    function saveDraft() {
    // TODO: 임시저장 API 연동
    alert('임시저장 처리 가정')
    }
    function goNext() {
    router.push('/resume/certificate-info')
    }
</script>

<style scoped></style>
