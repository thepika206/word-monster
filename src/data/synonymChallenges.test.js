import { effectScope } from 'vue'
import { describe, expect, it } from 'vitest'
import { useGameState, COLS, ROWS } from '../composables/useGameState.js'
import { synonymChallenges } from './synonymChallenges.js'

describe('synonym challenges', () => {
    it('keeps each challenge at 25 total words and excludes the target from the correct set', () => {
        for (const challenge of synonymChallenges) {
            const target = challenge.target.toLowerCase()

            expect(challenge.correct).not.toContain(target)
            expect(challenge.correct.length + challenge.incorrect.length).toBe(25)
            expect(new Set([...challenge.correct, ...challenge.incorrect]).size).toBe(25)
        }
    })
})

describe('board generation', () => {
    it('fills all 25 spelling-mode board spaces', () => {
        const scope = effectScope()
        const state = scope.run(() => useGameState())

        state.startGame('spelling')

        expect(COLS * ROWS).toBe(25)
        expect(state.tiles.value.length).toBe(25)

        state.restart()
        scope.stop()
    })
})
