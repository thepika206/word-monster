<template>
    <div
        class="mx-auto w-full max-w-xl rounded-lg bg-slate-800 px-4 py-3 text-center text-slate-50"
    >
        <p class="text-base font-bold uppercase tracking-wide sm:text-lg">{{ promptText }}</p>
        <p class="mt-1 h-5 text-sm font-medium sm:h-6" :class="messageClass">
            {{ message || ' ' }}
        </p>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    promptText: { type: String, default: '' },
    message: { type: String, default: '' },
})

const messageClass = computed(() => {
    if (!props.message) return 'text-transparent'
    return props.message === 'Nice!' ? 'text-emerald-400' : 'text-rose-400'
})
</script>
