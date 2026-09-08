<template>
    <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-slate-950/90 p-6 text-center text-slate-50 sm:p-8"
    >
        <p class="text-lg font-semibold">
            Guide your monster around the grid and eat the correctly spelled words!
        </p>
        <ul class="space-y-1 text-left text-sm text-slate-300">
            <li>🍴 Eat correct tiles to score points and clear the round.</li>
            <li>⚠️ Eating a wrong tile or touching an enemy costs a life.</li>
            <li>📱 Move with arrow keys/WASD or the on-screen controls.</li>
        </ul>
        <button
            class="rounded-lg bg-emerald-600 px-6 py-3 font-semibold hover:bg-emerald-500"
            @click="$emit('start')"
        >
            Start Game
        </button>
    </div>
</template>

<script setup>
defineEmits(['start'])
</script>
