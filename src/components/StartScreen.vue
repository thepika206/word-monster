<template>
    <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-slate-950/90 p-6 text-center text-slate-50 sm:p-8"
        @keydown="handleKeydown"
    >
        <p class="text-lg font-semibold">
            Choose a game mode and help your monster eat the right words!
        </p>
        <div class="flex gap-3">
            <button
                ref="spellingButton"
                type="button"
                class="rounded-lg px-4 py-2 font-semibold transition"
                :class="
                    selectedMode === 'spelling'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700 text-slate-200'
                "
                @click="selectedMode = 'spelling'"
            >
                Spelling
            </button>
            <button
                ref="synonymButton"
                type="button"
                class="rounded-lg px-4 py-2 font-semibold transition"
                :class="
                    selectedMode === 'synonyms'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700 text-slate-200'
                "
                @click="selectedMode = 'synonyms'"
            >
                Synonyms
            </button>
        </div>
        <button
            ref="startButton"
            type="button"
            class="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            @click="$emit('start', selectedMode)"
        >
            Start
        </button>
        <ul class="space-y-1 text-left text-sm text-slate-300">
            <li>🍴 Eat correct tiles to score points and clear the round.</li>
            <li>⚠️ Eating a wrong tile or touching an enemy costs a life.</li>
            <li>📱 Move with arrow keys/WASD or the on-screen controls.</li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
    mode: { type: String, default: 'spelling' },
})

const startButton = ref(null)
const spellingButton = ref(null)
const synonymButton = ref(null)
const selectedMode = ref(props.mode)

const emit = defineEmits(['start'])

function focusModeButton(mode) {
    if (mode === 'spelling') {
        spellingButton.value?.focus()
        return
    }

    synonymButton.value?.focus()
}

function handleKeydown(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        selectedMode.value = 'spelling'
        focusModeButton(selectedMode.value)
        event.preventDefault()
        return
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        selectedMode.value = 'synonyms'
        focusModeButton(selectedMode.value)
        event.preventDefault()
        return
    }

    if (event.key === 'Enter' || event.key === ' ') {
        emit('start', selectedMode.value)
        event.preventDefault()
    }
}

watch(
    () => props.mode,
    (newMode) => {
        selectedMode.value = newMode
    },
)

onMounted(() => {
    startButton.value?.focus()
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})
</script>
