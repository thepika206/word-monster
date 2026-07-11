<template>
    <div
        class="pointer-events-none absolute flex items-center justify-center text-2xl transition-all duration-300 ease-linear sm:text-3xl"
        :style="style"
    >
        👻
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    cols: { type: Number, required: true },
    rows: { type: Number, required: true },
})

const style = computed(() => ({
    left: `${(props.x / props.cols) * 100}%`,
    top: `${(props.y / props.rows) * 100}%`,
    width: `${(1 / props.cols) * 100}%`,
    height: `${(1 / props.rows) * 100}%`,
}))
</script>
