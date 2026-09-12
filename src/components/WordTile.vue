<template>
    <div
        class="aspect-square flex min-w-0 items-center justify-center overflow-hidden rounded-md px-1 pt-2 text-center text-[0.65rem] font-semibold uppercase leading-tight transition-opacity duration-200 sm:text-sm"
        :class="[
            tile.eaten ? 'opacity-0' : 'border text-emerald-50',
            revealCorrect && tile.correct && !tile.eaten
                ? 'border-amber-300 bg-amber-500/40 shadow-[inset_0_0_0_2px_rgba(252,211,77,0.9)]'
                : 'border-emerald-600/50 bg-emerald-800/40',
        ]"
    >
        <span v-if="!tile.eaten" class="self-end">{{ tile.word }}</span>
    </div>
</template>

<script setup>
defineProps({
    tile: { type: Object, required: true },
    revealCorrect: { type: Boolean, default: false },
})
</script>
