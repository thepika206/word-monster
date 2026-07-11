<template>
    <div class="pointer-events-none absolute transition-all duration-150 ease-out" :style="style">
        <div class="flex h-full w-full items-center justify-center text-2xl sm:text-3xl">🐲</div>
        <span
            v-if="word"
            class="absolute inset-x-0 bottom-0 truncate rounded bg-slate-900/80 px-0.5 text-center text-[0.55rem] font-bold uppercase leading-tight text-amber-200 sm:text-[0.65rem]"
        >
            {{ word }}
        </span>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    cols: { type: Number, required: true },
    rows: { type: Number, required: true },
    word: { type: String, default: '' },
})

const style = computed(() => ({
    left: `${(props.x / props.cols) * 100}%`,
    top: `${(props.y / props.rows) * 100}%`,
    width: `${(1 / props.cols) * 100}%`,
    height: `${(1 / props.rows) * 100}%`,
}))
</script>
