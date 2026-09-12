<template>
    <div class="relative mx-auto aspect-square w-full max-w-xl select-none">
        <div
            class="grid h-full w-full gap-1"
            :style="{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }"
        >
            <WordTile
                v-for="tile in tiles"
                :key="tile.id"
                :tile="tile"
                :reveal-correct="status === 'lost'"
            />
        </div>
        <PlayerMonster
            :x="monster.x"
            :y="monster.y"
            :cols="cols"
            :rows="rows"
            :word="monsterWord"
            :hit="monster.hit"
        />
        <GameEnemy
            v-for="enemy in enemies"
            :key="enemy.id"
            :x="enemy.x"
            :y="enemy.y"
            :cols="cols"
            :rows="rows"
        />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import WordTile from './WordTile.vue'
import PlayerMonster from './PlayerMonster.vue'
import GameEnemy from './GameEnemy.vue'

const props = defineProps({
    tiles: { type: Array, required: true },
    monster: { type: Object, required: true },
    enemies: { type: Array, required: true },
    cols: { type: Number, required: true },
    rows: { type: Number, required: true },
    status: { type: String, default: 'playing' },
})

const monsterWord = computed(() => {
    const tile = props.tiles[props.monster.y * props.cols + props.monster.x]
    return tile && !tile.eaten ? tile.word : ''
})
</script>
