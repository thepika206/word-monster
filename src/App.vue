<template>
    <div class="flex min-h-svh w-full flex-col items-center gap-4 bg-slate-900 px-4 py-6">
        <h1 class="text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl">
            🧟 Word Monster
        </h1>

        <ScoreBar :score="score" :round="round" :lives-left="lives" />
        <PromptBanner :prompt-text="promptText" :message="message" @restart="restart" />

        <div class="relative w-full max-w-xl">
            <GameGrid
                :tiles="tiles"
                :monster="monster"
                :enemies="enemies"
                :cols="COLS"
                :rows="ROWS"
                :status="status"
            />
            <StartScreen v-if="status === 'start'" :mode="challengeMode" @start="startGame" />
            <RoundCompleteOverlay
                v-if="status === 'round-complete'"
                :round="round"
                :score="score"
                @continue="continueRound"
            />
        </div>

        <TouchControls @move="moveMonster" @eat="eatTile" />
        <p class="hidden text-sm text-slate-400 sm:block">
            Use arrow keys or WASD to move, space to eat
        </p>
    </div>
</template>

<script setup>
import ScoreBar from './components/ScoreBar.vue'
import PromptBanner from './components/PromptBanner.vue'
import GameGrid from './components/GameGrid.vue'
import TouchControls from './components/TouchControls.vue'
import RoundCompleteOverlay from './components/RoundCompleteOverlay.vue'
import StartScreen from './components/StartScreen.vue'
import { useGameState } from './composables/useGameState.js'
import { useKeyboardControls } from './composables/useKeyboardControls.js'

const {
    COLS,
    ROWS,
    score,
    lives,
    round,
    status,
    message,
    promptText,
    challengeMode,
    tiles,
    monster,
    enemies,
    moveMonster,
    eatTile,
    restart,
    continueRound,
    startGame,
} = useGameState()

useKeyboardControls(moveMonster, eatTile)
</script>
