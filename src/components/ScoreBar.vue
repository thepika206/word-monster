<template>
    <div
        class="mx-auto flex w-full max-w-xl items-center justify-between px-2 text-sm font-semibold text-slate-100 sm:text-base"
    >
        <span>Score: {{ score }}</span>
        <span>Round: {{ round }}</span>
        <span aria-label="lives remaining">{{
            '❤️'.repeat(Math.max(lives, 0)) || 'No lives left'
        }}</span>
    </div>
</template>

<script setup>
defineProps({
    score: { type: Number, required: true },
    round: { type: Number, required: true },
    lives: { type: Number, required: true },
})
</script>
