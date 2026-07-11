<template>
    <div
        class="mx-auto grid w-48 grid-cols-3 grid-rows-3 gap-2 sm:hidden"
        aria-label="game controls"
    >
        <div></div>
        <button
            class="flex aspect-square items-center justify-center rounded-lg bg-slate-700 text-xl text-slate-100 active:bg-slate-600"
            aria-label="Move up"
            @click="$emit('move', 0, -1)"
        >
            ▲
        </button>
        <div></div>

        <button
            class="flex aspect-square items-center justify-center rounded-lg bg-slate-700 text-xl text-slate-100 active:bg-slate-600"
            aria-label="Move left"
            @click="$emit('move', -1, 0)"
        >
            ◀
        </button>
        <button
            class="flex aspect-square items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-slate-50 active:bg-emerald-500"
            aria-label="Eat word"
            @click="$emit('eat')"
        >
            EAT
        </button>
        <button
            class="flex aspect-square items-center justify-center rounded-lg bg-slate-700 text-xl text-slate-100 active:bg-slate-600"
            aria-label="Move right"
            @click="$emit('move', 1, 0)"
        >
            ▶
        </button>

        <div></div>
        <button
            class="flex aspect-square items-center justify-center rounded-lg bg-slate-700 text-xl text-slate-100 active:bg-slate-600"
            aria-label="Move down"
            @click="$emit('move', 0, 1)"
        >
            ▼
        </button>
        <div></div>
    </div>
</template>

<script setup>
defineEmits(['move', 'eat'])
</script>
