<!-- PhoneVerifyPopup.vue -->
<template>
    <div class="fixed inset-0 bg-black/60">
        <!-- Modal -->
        <div class="w-full h-full bg-white">
        <!-- Header -->
        <div class="flex items-center justify-between px-8 py-4 border-b">
            <h1 class="text-2xl sm:text-3xl font-extrabold">휴대전화 인증</h1>
        </div>

        <!-- Body -->
        <div class="px-8 py-8">
            <!-- Row: input + action -->
            <div class="grid grid-cols-12 gap-4 items-center">
            <div class="col-span-9">
                <input
                v-model.trim="phone"
                type="tel"
                placeholder="전화번호를 입력하세요"
                class="w-full h-14 rounded-md border border-slate-300 px-5 text-lg outline-none"
                />
            </div>
            <div class="col-span-3 flex justify-end">
                <button
                class="h-14 w-full sm:w-auto px-6 rounded-xl border-2 border-sky-400 text-sky-600 font-semibold bg-white"
                type="button"
                @click="generateCode"
                >
                인증번호생성
                </button>
            </div>
            </div>

            <!-- Row: timer + text + QR -->
            <div class="mt-8 grid grid-cols-12 gap-6 items-center">
            <!-- Timer -->
            <div class="col-span-3 flex items-center gap-4">
                <svg viewBox="0 0 100 100" class="w-28 h-28">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="3"/>
                <circle
                    cx="50" cy="50" r="45" fill="none" stroke="#fbbf24" stroke-width="4"
                    :style="ringStyle"
                    transform="rotate(-90 50 50)"
                />
                <line x1="50" y1="50" x2="50" y2="20" stroke="#111827" stroke-width="2"
                        :transform="handTransform"/>
                </svg>
            </div>

            <!-- Helper text -->
            <div class="col-span-6">
                <p class="font-semibold">인증 만료까지 남은시간</p>
                <p class="text-lg mt-1">{{ leftText }}</p>
                <p class="mt-4 text-slate-700">우측의 QR 코드를 촬영하여 인증번호를 발송해주세요.</p>
            </div>

            <!-- QR -->
            <div class="col-span-3 flex justify-end">
                <div class="p-2 border rounded-xl">
                <img :alt="`QR for ${phone}`" class="w-40 h-40" :src="qrUrl"/>
                </div>
            </div>
            </div>

            <!-- CTA -->
            <div class="mt-10">
            <button class="w-full h-16 rounded-xl bg-[#4F8EF7] text-white text-2xl font-extrabold" type="button">
                인증 대기중
            </button>
            </div>
        </div>
        </div>
    </div>
    </template>

    <script setup>
    import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

    const emit = defineEmits(['close'])

    const total = 180
    const t = ref(total)
    const phone = ref('01000000000')
    const code = ref('123456')

    const C = 2 * Math.PI * 45
    const ratio = computed(() => 1 - t.value / total)
    const ringStyle = computed(() => ({
    strokeDasharray: `${C}`,
    strokeDashoffset: `${C * ratio.value}`,
    }))
    const handTransform = computed(() => `rotate(${360 * ratio.value - 90} 50 50)`)

    const leftText = computed(() => {
    const mm = String(Math.floor(t.value / 60)).padStart(2, '0')
    const ss = String(t.value % 60).padStart(2, '0')
    return `${mm}:${ss} / 03:00`
    })

    const qrUrl = computed(() => {
    // SMSTO:<phone>:인증번호: <code>
    const payload = `SMSTO:${phone.value}:인증번호: ${code.value}`
    const u = encodeURIComponent(payload)
    return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${u}`
    })

    let id = null

    function tick() {
    if (t.value > 0) t.value -= 1
    else clear()
    }
    function start() {
    clear()
    t.value = total
    id = setInterval(tick, 1000)
    }
    function clear() {
    if (id) {
        clearInterval(id)
        id = null
    }
    }
    function generateCode() {
    code.value = String(Math.floor(100000 + Math.random() * 900000))
    start()
    }
    function close() {
    emit('close')
    if (window && typeof window.close === 'function') window.close()
    }

    function onEsc(e) {
    if (e.key === 'Escape') close()
    }

    onMounted(() => {
    start()
    window.addEventListener('keydown', onEsc)
    })
    onBeforeUnmount(() => {
    clear()
    window.removeEventListener('keydown', onEsc)
    })
</script>

<style scoped>
.dash { stroke-dasharray: 283; stroke-dashoffset: 0; transition: stroke-dashoffset .3s linear; }
</style>
