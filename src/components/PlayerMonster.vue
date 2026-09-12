<template>
    <div class="pointer-events-none absolute transition-all duration-150 ease-out" :style="style">
        <div class="flex h-full w-full items-center justify-center text-2xl sm:text-3xl">🐲</div>
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
    hit: { type: Boolean, default: false },
})

const style = computed(() => ({
    left: `${(props.x / props.cols) * 100}%`,
    top: `${(props.y / props.rows) * 100}%`,
    width: `${100 / props.cols}%`,
    height: `${100 / props.rows}%`,
}))
</script>
