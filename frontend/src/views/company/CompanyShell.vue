<template>
    <div>
        <header class="border-b">
        <CompanySwitcher :activeSlug="companySlug" />
        </header>
        <RouterView :companySlug="companySlug" />
    </div>
</template>

<script setup>
const props = defineProps({
    companySlug: { type: String, required: true }
})
const companySlug = props.companySlug
</script>