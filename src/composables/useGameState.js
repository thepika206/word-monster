import { onUnmounted, reactive, ref } from 'vue'
import { challenges } from '../data/spellingChallenges.js'
import { synonymChallenges } from '../data/synonymChallenges.js'

export const COLS = 5
export const ROWS = 5
const WORDS_PER_ROUND = 5
const ENEMY_COUNT = 1
const ENEMY_MOVE_MS = 3600
const STARTING_LIVES = 3
const HIT_PAUSE_MS = 500
const PROMPT_TEXT = 'Eat the correctly spelled words'
const SYNONYM_PROMPT_TEXT = 'Eat words that mean the same as'

function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function shuffle(list) {
    const copy = [...list]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

export function useGameState() {
    const score = ref(0)
    const lives = ref(STARTING_LIVES)
    const round = ref(1)
    const status = ref('start') // 'start' | 'playing' | 'hit' | 'round-complete' | 'lost'
    const message = ref('')
    const promptText = ref('')
    const challengeMode = ref('spelling')
    const tiles = ref([])
    const correctRemaining = ref(0)
    const monster = reactive({ x: Math.floor(COLS / 2), y: ROWS - 1, hit: false })
    const enemies = reactive([])

    let enemyTimer = null
    let hitTimer = null
    let enemyMoveCount = 0

    function tileIndex(x, y) {
        return y * COLS + x
    }

    function emptyCells(excluding = []) {
        const taken = new Set(excluding.map(({ x, y }) => tileIndex(x, y)))
        const cells = []
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (!taken.has(tileIndex(x, y))) cells.push({ x, y })
            }
        }
        return cells
    }

    function pickRoundWords() {
        const activeChallenges = challengeMode.value === 'synonyms' ? synonymChallenges : challenges
        return shuffle(activeChallenges).slice(
            0,
            Math.min(WORDS_PER_ROUND, activeChallenges.length),
        )
    }

    function buildTiles(roundWords) {
        const total = COLS * ROWS
        const entries = roundWords.map((word) => ({
            word: randomItem(word.correct),
            correct: true,
        }))
        const incorrectPool = roundWords.flatMap((word) => word.incorrect)
        for (let i = entries.length; i < total; i++) {
            entries.push({ word: randomItem(incorrectPool), correct: false })
        }
        const shuffled = shuffle(entries)
        return shuffled.map((entry, i) => ({
            id: `${round.value}-${i}-${entry.word}`,
            x: i % COLS,
            y: Math.floor(i / COLS),
            word: entry.word,
            correct: entry.correct,
            eaten: false,
        }))
    }

    function buildSynonymTiles(challenge) {
        const target = challenge.target
        const correctWords = shuffle([
            ...new Set(challenge.correct.filter((word) => word !== target)),
        ])
        const distractors = shuffle([...new Set(challenge.incorrect)])
        const total = COLS * ROWS
        const distractorCount = Math.max(0, total - correctWords.length)
        const entries = [...correctWords, ...distractors.slice(0, distractorCount)]

        const placedEntries = shuffle(entries).map((word) => ({
            word,
            correct: correctWords.includes(word),
        }))

        return {
            target,
            tileData: placedEntries.map((entry, i) => ({
                id: `${round.value}-${i}-${entry.word}`,
                x: i % COLS,
                y: Math.floor(i / COLS),
                word: entry.word,
                correct: entry.correct,
                eaten: false,
            })),
        }
    }

    function spawnEnemies() {
        enemies.splice(0, enemies.length)
        const spots = emptyCells([{ x: monster.x, y: monster.y }]).filter((c) => c.y === 0)
        for (let i = 0; i < ENEMY_COUNT && spots.length > 0; i++) {
            const idx = Math.floor(Math.random() * spots.length)
            const [spot] = spots.splice(idx, 1)
            enemies.push({ id: `enemy-${round.value}-${i}`, x: spot.x, y: spot.y })
        }
    }

    function startRound() {
        if (hitTimer) {
            clearTimeout(hitTimer)
            hitTimer = null
        }
        enemyMoveCount = 0

        if (challengeMode.value === 'synonyms') {
            const synonymGroup = randomItem(synonymChallenges)
            const { target, tileData } = buildSynonymTiles(synonymGroup)
            promptText.value = `${SYNONYM_PROMPT_TEXT} ${target.toUpperCase()}`
            tiles.value = tileData
            correctRemaining.value = tiles.value.filter((t) => t.correct).length
            monster.x = Math.floor(COLS / 2)
            monster.y = ROWS - 1
            monster.hit = false
            spawnEnemies()
            message.value = ''
            status.value = 'playing'
            return
        }

        promptText.value = PROMPT_TEXT
        tiles.value = buildTiles(pickRoundWords())
        correctRemaining.value = tiles.value.filter((t) => t.correct).length
        monster.x = Math.floor(COLS / 2)
        monster.y = ROWS - 1
        monster.hit = false
        spawnEnemies()
        message.value = ''
        status.value = 'playing'
    }

    function loseLife() {
        lives.value -= 1
        if (lives.value <= 0) {
            status.value = 'lost'
            promptText.value = 'Game Over'
            message.value = 'Game Over'
            if (enemyTimer) clearInterval(enemyTimer)
        }
    }

    function checkEnemyCollision() {
        const hit = enemies.some((e) => e.x === monster.x && e.y === monster.y)
        if (!hit || status.value !== 'playing') return
        message.value = 'Ouch!'
        status.value = 'hit'
        monster.hit = true
        loseLife()
        if (status.value === 'lost') return
        hitTimer = setTimeout(() => {
            monster.hit = false
            monster.x = Math.floor(COLS / 2)
            monster.y = ROWS - 1
            spawnEnemies()
            message.value = ''
            status.value = 'playing'
        }, HIT_PAUSE_MS)
    }

    function moveMonster(dx, dy) {
        if (status.value !== 'playing') return
        const nx = Math.min(COLS - 1, Math.max(0, monster.x + dx))
        const ny = Math.min(ROWS - 1, Math.max(0, monster.y + dy))
        if (nx === monster.x && ny === monster.y) return
        monster.x = nx
        monster.y = ny
        message.value = ''
        checkEnemyCollision()
    }

    function eatTile() {
        if (status.value !== 'playing') return
        const tile = tiles.value[tileIndex(monster.x, monster.y)]
        if (!tile || tile.eaten) return
        tile.eaten = true
        if (tile.correct) {
            score.value += 10
            correctRemaining.value -= 1
            message.value = 'Nice!'
            if (correctRemaining.value <= 0) {
                status.value = 'round-complete'
            }
        } else {
            message.value = 'Oops!'
            loseLife()
        }
    }

    function moveEnemiesOnce() {
        if (status.value !== 'playing') return
        enemyMoveCount += 1
        const randomStep = enemyMoveCount % 5 === 0
        const dirs = [
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
        ]
        for (const enemy of enemies) {
            let options = dirs
                .map(({ dx, dy }) => ({ x: enemy.x + dx, y: enemy.y + dy }))
                .filter((p) => p.x >= 0 && p.x < COLS && p.y >= 0 && p.y < ROWS)

            if (!randomStep) {
                const dxToPlayer = Math.sign(monster.x - enemy.x)
                const dyToPlayer = Math.sign(monster.y - enemy.y)
                const chaseDirs = []

                if (dxToPlayer !== 0) chaseDirs.push({ dx: dxToPlayer, dy: 0 })
                if (dyToPlayer !== 0) chaseDirs.push({ dx: 0, dy: dyToPlayer })

                options = [...chaseDirs, ...dirs]
                    .map(({ dx, dy }) => ({ x: enemy.x + dx, y: enemy.y + dy }))
                    .filter((p) => p.x >= 0 && p.x < COLS && p.y >= 0 && p.y < ROWS)
            }

            if (options.length > 0) {
                const next = randomStep ? randomItem(options) : options[0]
                enemy.x = next.x
                enemy.y = next.y
            }
        }
        checkEnemyCollision()
    }

    function continueRound() {
        round.value += 1
        startRound()
    }

    function restart() {
        if (enemyTimer) clearInterval(enemyTimer)
        enemyTimer = null
        score.value = 0
        lives.value = STARTING_LIVES
        round.value = 1
        message.value = ''
        promptText.value = ''
        tiles.value = []
        enemies.splice(0, enemies.length)
        monster.x = Math.floor(COLS / 2)
        monster.y = ROWS - 1
        monster.hit = false
        status.value = 'start'
    }

    function startGame(mode = challengeMode.value) {
        challengeMode.value = mode
        if (enemyTimer) clearInterval(enemyTimer)
        enemyTimer = null
        startRound()
        enemyTimer = setInterval(moveEnemiesOnce, ENEMY_MOVE_MS)
    }

    onUnmounted(() => {
        if (enemyTimer) clearInterval(enemyTimer)
        if (hitTimer) clearTimeout(hitTimer)
    })

    return {
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
        continueRound,
        moveMonster,
        eatTile,
        restart,
        startGame,
    }
}
