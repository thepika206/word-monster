<template>
    <div
        class="aspect-square flex min-w-0 items-center justify-center overflow-hidden rounded-md px-1 text-center text-[0.65rem] font-semibold uppercase leading-tight transition-opacity duration-200 sm:text-sm"
        :class="
            tile.eaten
                ? 'opacity-0'
                : 'border border-emerald-600/50 bg-emerald-800/40 text-emerald-50'
        "
    >
        <span v-if="!tile.eaten">{{ tile.word }}</span>
    </div>
</template>

<script setup>
defineProps({
    tile: { type: Object, required: true },
})
</script>
