<template>
    <div>
        <header class="border-b">
        <CompanySwitcher :activeSlug="applicantSlug" />
        <nav class="flex gap-4 p-3 text-sm">
            <RouterLink :to="{ name:'ResumeBasicInfo', params:{ applicantSlug } }">기본</RouterLink>
        </nav>
        </header>
        <RouterView :applicantSlug="applicantSlug" />
    </div>
</template>

<script setup>
const props = defineProps({
    applicantSlug: { type: String, required: true }
})
const applicantSlug = props.applicantSlug
</script>