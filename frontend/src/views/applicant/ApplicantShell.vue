<template>
    <div>
        <header class="border-b">
        <CompanySwitcher :activeSlug="applicantSlug" />
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