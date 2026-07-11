<template>
    <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-slate-950/80 text-slate-50"
    >
        <p class="text-2xl font-bold">Round {{ round }} complete!</p>
        <p class="text-lg">Score: {{ score }}</p>
        <button
            class="rounded-lg bg-emerald-600 px-4 py-2 font-semibold hover:bg-emerald-500"
            @click="$emit('continue')"
        >
            Continue
        </button>
    </div>
</template>
<script setup>
defineProps({
    round: { type: Number, required: true },
    score: { type: Number, required: true },
})
defineEmits(['continue'])
</script>
