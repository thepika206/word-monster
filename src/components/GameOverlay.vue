<template>
    <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-slate-950/80 text-slate-50"
    >
        <p class="text-2xl font-bold">Game Over</p>
        <p class="text-lg">Score: {{ score }}</p>
        <button
            class="rounded-lg bg-emerald-600 px-4 py-2 font-semibold hover:bg-emerald-500"
            @click="$emit('restart')"
        >
            Play Again
        </button>
    </div>
</template>

<script setup>
defineProps({
    score: { type: Number, required: true },
})
defineEmits(['restart'])
</script>
