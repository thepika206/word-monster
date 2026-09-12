<template>
    <div
        class="mx-auto w-full max-w-xl rounded-lg bg-slate-800 px-4 py-3 text-center text-slate-50"
    >
        <p class="text-base font-bold uppercase tracking-wide sm:text-lg">{{ promptText }}</p>
        <p class="mt-1 h-5 text-sm font-medium sm:h-6" :class="messageClass">
            {{ message || ' ' }}
        </p>
        <button
            v-if="promptText === 'Game Over'"
            type="button"
            class="mt-3 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            @click="$emit('restart')"
        >
            Play Again
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    promptText: { type: String, default: '' },
    message: { type: String, default: '' },
})

const emit = defineEmits(['restart'])

const messageClass = computed(() => {
    if (!props.message) return 'text-transparent'
    return props.message === 'Nice!' ? 'text-emerald-400' : 'text-rose-400'
})
</script>
