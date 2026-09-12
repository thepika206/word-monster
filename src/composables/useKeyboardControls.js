import { onMounted, onUnmounted } from 'vue'

const KEY_DIRECTIONS = {
    ArrowUp: { dx: 0, dy: -1 },
    ArrowDown: { dx: 0, dy: 1 },
    ArrowLeft: { dx: -1, dy: 0 },
    ArrowRight: { dx: 1, dy: 0 },
    w: { dx: 0, dy: -1 },
    s: { dx: 0, dy: 1 },
    a: { dx: -1, dy: 0 },
    d: { dx: 1, dy: 0 },
}

const MOVE_COOLDOWN_MS = 120

export function useKeyboardControls(moveMonster, eatTile, status = { value: 'playing' }) {
    let lastMoveAt = 0

    function handleKeydown(event) {
        if (status.value === 'start') return

        const activeElement = document.activeElement
        const isInteractiveElementFocused =
            activeElement instanceof HTMLElement &&
            ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(activeElement.tagName)

        if (isInteractiveElementFocused) {
            return
        }

        if (event.code === 'Space' || event.key === 'Enter') {
            event.preventDefault()
            eatTile()
            return
        }

        const direction = KEY_DIRECTIONS[event.key] ?? KEY_DIRECTIONS[event.key.toLowerCase()]
        if (!direction) return
        event.preventDefault()

        const now = performance.now()
        if (now - lastMoveAt < MOVE_COOLDOWN_MS) return
        lastMoveAt = now

        moveMonster(direction.dx, direction.dy)
    }

    onMounted(() => window.addEventListener('keydown', handleKeydown))
    onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
}
