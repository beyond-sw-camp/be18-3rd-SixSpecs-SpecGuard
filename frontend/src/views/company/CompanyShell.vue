<template>
    <div>
        <header class="border-b">
        <CompanySwitcher :activeSlug="companySlug" />
        <nav class="flex gap-4 p-3 text-sm">
            <RouterLink :to="{ name:'CompanyDashboard', params:{ companySlug } }">대시보드</RouterLink>
        </nav>
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